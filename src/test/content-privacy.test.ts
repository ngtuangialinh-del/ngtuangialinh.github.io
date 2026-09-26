import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * BR-8: release-blocking content-validation gate. Scans the public content
 * data modules and (when present) the built dist/ output for restricted
 * value patterns, raw CV path fragments, and the two excluded video files.
 */
const RESTRICTED_PATTERNS: RegExp[] = [
  /assets\/CV/i,
  /\.mp4/i,
  /2aOboQrhDKQ083x4JJfzSp3afqzMdYrW70Bm2UUq/i,
  /2aOboQrhDLSSu0zuJTjrOJ4gTjd0NFu6qGtz8Nf6/i,
  /\bIELTS\b.*(scan|report form)/i,
  /candidate number/i,
  /(?:passport|national id|identity card)\s*(?:number|no\.?|:)/i,
  /(?:date of birth|birth date|\bDOB\b)\s*:/i,
  /(?:home|residential|postal) address\s*:\s*[\w\d]/i,
  /(?:phone|mobile|telephone|tel\.?)\s*:\s*\+?\d[\d\s().-]{6}/i,
  /(?:bank|account)\s*(?:number|no\.?)?\s*:\s*\d{6}/i,
  /identification photo/i,
  /0118239280/,
];

const repoRoot = join(__dirname, "..", "..");
const dataDir = join(repoRoot, "src", "data");
const distDir = join(repoRoot, "dist");
const publicDocumentsDir = join(repoRoot, "src", "assets", "documents");
const documentPreviewDir = join(repoRoot, "public", "documents");
const illustrationDir = join(repoRoot, "public", "illustrations");
const profileDir = join(repoRoot, "public", "profile");

function collectFiles(dir: string, extensions: string[]): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir).flatMap((entry: string) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return collectFiles(fullPath, extensions);
    }

    return extensions.some((extension) => entry.endsWith(extension))
      ? [fullPath]
      : [];
  });
}

function assertNoRestrictedPatterns(files: string[]) {
  for (const file of files) {
    const content = readFileSync(file, "utf-8");

    for (const pattern of RESTRICTED_PATTERNS) {
      expect(
        pattern.test(content),
        `${file} matched restricted pattern ${pattern}`,
      ).toBe(false);
    }
  }
}

describe("content privacy gate (BR-8)", () => {
  it("finds no restricted patterns in src/data/*.ts", () => {
    const files = collectFiles(dataDir, [".ts", ".tsx"]);

    expect(files.length).toBeGreaterThan(0);
    assertNoRestrictedPatterns(files);
  });

  it("finds no restricted patterns in the built dist/ output (post-build)", () => {
    const files = collectFiles(distDir, [".js", ".html", ".css"]);

    expect(
      files.length,
      "dist/ must exist before the release privacy gate runs",
    ).toBeGreaterThan(0);
    assertNoRestrictedPatterns(files);
  });

  it("keeps every gallery image src within the curated public asset directory", async () => {
    const { galleryImages } = await import("../data/gallery");
    const { communityStories } = await import("../data/communityCare");
    const storyIds = new Set(communityStories.map((story) => story.id));

    for (const image of galleryImages) {
      expect(image.src.startsWith("/gallery/")).toBe(true);
      expect(storyIds.has(image.initiativeId)).toBe(true);
    }
  });

  it("keeps documentary, editorial, and evidence media in separate typed collections", async () => {
    const { evidenceDocuments } = await import("../data/evidence");
    const { editorialIllustrations } = await import("../data/illustrations");
    const { galleryImages } = await import("../data/gallery");

    for (const image of galleryImages) {
      expect(image.src.startsWith("/gallery/")).toBe(true);
      expect(image.src.includes("illustrations")).toBe(false);
    }

    for (const illustration of Object.values(editorialIllustrations)) {
      expect(illustration.src.startsWith("/illustrations/")).toBe(true);
    }
    expect(JSON.stringify(editorialIllustrations)).not.toMatch(/AI-generated/i);

    for (const document of evidenceDocuments) {
      expect(document.pages).toHaveLength(document.pageCount);
      for (const page of document.pages) {
        expect(page.imageUrl.startsWith("/documents/pages/")).toBe(true);
        expect(page.imageUrl.includes("assets/CV")).toBe(false);
      }
    }
  });

  it("publishes stripped gallery derivatives within the image budget", () => {
    const galleryDir = join(repoRoot, "public", "gallery");
    const files = collectFiles(galleryDir, [".jpg", ".jpeg", ".png", ".webp"]);

    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const bytes = readFileSync(file);
      expect(
        bytes.byteLength,
        `${file} exceeds the 300KB budget`,
      ).toBeLessThanOrEqual(300 * 1024);
      expect(
        bytes.includes(Buffer.from("Exif\0\0")),
        `${file} still contains EXIF metadata`,
      ).toBe(false);
    }
  });

  it("publishes only the two approved PDFs without active-content markers", () => {
    const files = collectFiles(publicDocumentsDir, [".pdf"]);
    const activeContentPatterns = [
      /\/JavaScript/i,
      /\/OpenAction/i,
      /\/EmbeddedFile/i,
      /\/Launch/i,
      /\/URI\s*[<(]/i,
    ];

    expect(files.map((file) => file.split("/").at(-1)).sort()).toEqual([
      "hematology-volunteering-acknowledgement.pdf",
      "nguyen-tuan-gia-linh-cv.pdf",
    ]);

    for (const file of files) {
      const content = readFileSync(file).toString("latin1");
      for (const pattern of activeContentPatterns) {
        expect(
          pattern.test(content),
          `${file} matched active marker ${pattern}`,
        ).toBe(false);
      }
    }
  });

  it("publishes only budgeted document page and summary previews", () => {
    const files = collectFiles(documentPreviewDir, [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".svg",
    ]);

    expect(files.length).toBe(14);

    for (const file of files) {
      const bytes = readFileSync(file);
      expect(
        bytes.byteLength,
        `${file} exceeds the 300KB budget`,
      ).toBeLessThanOrEqual(300 * 1024);
      expect(
        bytes.includes(Buffer.from("Exif\0\0")),
        `${file} still contains EXIF metadata`,
      ).toBe(false);
    }
  });

  it("publishes five internally documented editorial anchors within budget", async () => {
    const files = collectFiles(illustrationDir, [".webp"]);
    const { editorialIllustrations } = await import("../data/illustrations");

    expect(files).toHaveLength(5);
    expect(Object.values(editorialIllustrations)).toHaveLength(5);
    for (const file of files) {
      const bytes = readFileSync(file);
      expect(
        bytes.byteLength,
        `${file} exceeds the 300KB budget`,
      ).toBeLessThanOrEqual(300 * 1024);
      expect(
        bytes.includes(Buffer.from("Exif\0\0")),
        `${file} still contains EXIF metadata`,
      ).toBe(false);
    }
  });

  it("publishes one neutral metadata-free profile image within budget", async () => {
    const files = collectFiles(profileDir, [".jpg", ".jpeg", ".png", ".webp"]);
    const { identity } = await import("../data/identity");

    expect(files.map((file) => file.split("/").at(-1))).toEqual([
      "gia-linh-profile.jpg",
    ]);
    expect(identity.profileImage.src).toBe("/profile/gia-linh-profile.jpg");
    const bytes = readFileSync(files[0]);
    expect(bytes.byteLength).toBeLessThanOrEqual(300 * 1024);
    expect(bytes.includes(Buffer.from("Exif\0\0"))).toBe(false);
  });
});
