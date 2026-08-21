import { describe, expect, it } from "vitest";
import { FALLBACK_SITE_URL, resolveSiteUrl } from "@/lib/validation";

/**
 * Regression cover for a Vercel build failure: NEXT_PUBLIC_SITE_URL was
 * declared-but-blank, `??` passed "" through, and `new URL("")` in the root
 * layout's metadataBase threw ERR_INVALID_URL, failing the whole build.
 */
describe("resolveSiteUrl", () => {
  it("falls back when the variable is unset", () => {
    expect(resolveSiteUrl(undefined)).toBe(FALLBACK_SITE_URL);
  });

  it("falls back when the variable is declared but blank", () => {
    expect(resolveSiteUrl("")).toBe(FALLBACK_SITE_URL);
  });

  it("falls back when the variable is only whitespace", () => {
    expect(resolveSiteUrl("   ")).toBe(FALLBACK_SITE_URL);
  });

  it("falls back rather than throwing on a value that is not a URL", () => {
    expect(resolveSiteUrl("redemptioncleanoutservices.com")).toBe(FALLBACK_SITE_URL);
  });

  it("keeps a valid configured origin", () => {
    expect(resolveSiteUrl("https://preview.example.com")).toBe("https://preview.example.com");
  });

  it("strips trailing slashes so canonical URLs never double up", () => {
    expect(resolveSiteUrl("https://example.com/")).toBe("https://example.com");
  });

  it("always returns something new URL() accepts", () => {
    for (const input of [undefined, "", "  ", "nonsense", "https://ok.example.com"]) {
      expect(() => new URL(resolveSiteUrl(input))).not.toThrow();
    }
  });
});
