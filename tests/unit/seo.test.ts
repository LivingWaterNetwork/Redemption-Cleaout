import { describe, expect, it } from "vitest";
import { pageMetadata } from "@/lib/seo";
import { resources } from "@/content/resources";
import { services } from "@/content/services";
import { audiences } from "@/content/audiences";

/**
 * The title template appended by the root layout. Counted here rather than
 * hardcoded as a number so the budget assertions below stay correct if the
 * brand name ever changes.
 */
const TITLE_SUFFIX = " | Redemption Cleanout Services";

/**
 * Roughly what a Google SERP renders before truncating. Pixel-based in
 * reality, so this is a guide rather than a hard rule — the assertions below
 * use a tolerance rather than treating it as exact.
 */
const SERP_TITLE_BUDGET = 60;

describe("pageMetadata Open Graph image", () => {
  const meta = pageMetadata({
    title: "Test Page",
    description: "A description.",
    path: "/test",
  });

  it("declares width, height and alt on the Open Graph image", () => {
    const images = meta.openGraph?.images;
    expect(Array.isArray(images)).toBe(true);
    const image = (images as Array<Record<string, unknown>>)[0];
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(630);
    expect(image?.alt).toEqual(expect.stringContaining("Redemption Cleanout Services"));
  });

  it("uses an absolute URL for the Open Graph image", () => {
    const images = meta.openGraph?.images as Array<Record<string, unknown>>;
    expect(() => new URL(String(images[0]?.url))).not.toThrow();
  });

  it("carries the same dimensioned image on the Twitter card", () => {
    const images = meta.twitter?.images as Array<Record<string, unknown>>;
    expect(images[0]?.width).toBe(1200);
    expect(images[0]?.height).toBe(630);
  });

  it("sets a canonical URL", () => {
    expect(meta.alternates?.canonical).toBe("https://redemptioncleanoutservices.com/test");
  });
});

describe("title length budget", () => {
  /**
   * Resource headlines are editorial and deliberately long, so each one
   * supplies a shorter `seoTitle` for the <title> tag. Without it the brand
   * suffix pushes the tag past 90 characters and the keyword truncates away.
   */
  it("keeps every resource's effective SEO title within a reasonable budget", () => {
    for (const resource of resources) {
      const effective = (resource.seoTitle ?? resource.title) + TITLE_SUFFIX;
      expect(
        effective.length,
        `${resource.slug} renders a ${effective.length}-character <title>: "${effective}"`,
      ).toBeLessThanOrEqual(SERP_TITLE_BUDGET + 8);
    }
  });

  it("front-loads the keyword, so a resource seoTitle is never longer than its headline", () => {
    for (const resource of resources) {
      if (!resource.seoTitle) continue;
      expect(resource.seoTitle.length).toBeLessThan(resource.title.length);
    }
  });

  it("keeps service and audience titles within budget without needing an override", () => {
    for (const entry of [...services, ...audiences]) {
      const effective = entry.name + TITLE_SUFFIX;
      expect(
        effective.length,
        `${entry.slug} renders a ${effective.length}-character <title>`,
      ).toBeLessThanOrEqual(SERP_TITLE_BUDGET + 20);
    }
  });
});
