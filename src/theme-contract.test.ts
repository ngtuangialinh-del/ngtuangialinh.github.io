import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("clinical editorial theme contract", () => {
  const indexCss = readFileSync(join(__dirname, "index.css"), "utf-8");
  const appCss = readFileSync(join(__dirname, "App.css"), "utf-8");

  it("defines light and dark tokens from one semantic vocabulary", () => {
    for (const token of ["--page-bg", "--surface", "--text-strong", "--text-muted", "--brand-600", "--focus"]) expect(indexCss).toContain(token);
    expect(indexCss).toContain(".light");
  });

  it("hides the skip link until focus and respects reduced motion", () => {
    expect(appCss).toMatch(/\.medical-skip-link\s*\{[^}]*translateY\(-180%\)/s);
    expect(appCss).toMatch(/\.medical-skip-link:focus\s*\{[^}]*translateY\(0\)/s);
    expect(`${indexCss}\n${appCss}`).toContain("prefers-reduced-motion: reduce");
  });

  it("uses a horizontal header offset instead of a permanent content rail", () => {
    expect(indexCss).toContain("--header-offset");
    expect(appCss).not.toMatch(/margin-left\s*:\s*232px/i);
  });

  it("keeps approved semantic text pairs at WCAG AA contrast", () => {
    const channel = (value: number) => {
      const normalized = value / 255;
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (hex: string) => {
      const channels = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((part) => channel(Number.parseInt(part, 16)));
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const contrast = (foreground: string, background: string) => {
      const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };

    for (const [foreground, background] of [
      ["#15312e", "#fbfaf5"], ["#52635f", "#fbfaf5"], ["#176b62", "#fbfaf5"],
      ["#f4f3ed", "#0b1f1d"], ["#b8c9c5", "#0b1f1d"], ["#9ed8ce", "#0b1f1d"],
      ["#ffffff", "#176b62"], ["#ffffff", "#10544d"],
    ]) expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
