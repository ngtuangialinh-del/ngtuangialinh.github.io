import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("document metadata (MSP-FR-18)", () => {
  it("identifies the medical student portfolio, not the starter template", () => {
    const html = readFileSync(join(__dirname, "..", "index.html"), "utf-8");

    expect(html).toMatch(/Nguyễn Tuấn Gia Linh/);
    expect(html).toMatch(/Medical Student Portfolio/i);
    expect(html).not.toMatch(/my-portfolio/);
    expect(html).toMatch(/medical-mark\.svg/);
    expect(html).toMatch(/property="og:title"/);
    expect(html).not.toMatch(/vite\.svg/);
  });
});
