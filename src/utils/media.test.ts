import { describe, expect, it } from "vitest";

import { withBasePath } from "./media";

describe("withBasePath", () => {
  it("keeps media inside root and project-site base paths", () => {
    expect(withBasePath("/gallery/example.jpg", "/")).toBe(
      "/gallery/example.jpg",
    );
    expect(withBasePath("/gallery/example.jpg", "/student-portfolio/")).toBe(
      "/student-portfolio/gallery/example.jpg",
    );
    expect(withBasePath("gallery/example.jpg", "/student-portfolio")).toBe(
      "/student-portfolio/gallery/example.jpg",
    );
  });

  it("does not rewrite remote or data URLs", () => {
    expect(withBasePath("https://example.com/photo.jpg", "/portfolio/")).toBe(
      "https://example.com/photo.jpg",
    );
    expect(withBasePath("data:image/svg+xml,test", "/portfolio/")).toBe(
      "data:image/svg+xml,test",
    );
  });

  it("resolves the profile portrait inside a GitHub Pages project base", () => {
    expect(
      withBasePath(
        "/profile/gia-linh-profile.jpg",
        "/ngtuangialinh.github.io/",
      ),
    ).toBe("/ngtuangialinh.github.io/profile/gia-linh-profile.jpg");
  });
});
