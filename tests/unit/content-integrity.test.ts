import { describe, expect, it } from "vitest";
import { services, getServiceBySlug } from "@/content/services";
import { serviceAreas, approvedServiceAreas } from "@/content/serviceAreas";
import { testimonials } from "@/content/testimonials";
import { galleryPhotos } from "@/content/gallery";

describe("services content", () => {
  it("defines exactly the two pillar services", () => {
    expect(services.map((s) => s.slug)).toEqual(["full-property-cleanouts", "demolition"]);
  });

  it("keeps every cleanout category anchor unique, since redirects target them", () => {
    const ids = services.flatMap((s) => (s.categories ?? []).map((c) => c.id));
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves every relatedServiceSlug to a real service", () => {
    for (const service of services) {
      for (const slug of service.relatedServiceSlugs) {
        expect(getServiceBySlug(slug), `${service.slug} references missing ${slug}`).toBeDefined();
      }
    }
  });

  it("gives every service at least one FAQ", () => {
    for (const service of services) {
      expect(service.faqs.length).toBeGreaterThan(0);
    }
  });
});

describe("service areas content", () => {
  it("only routes approved service areas", () => {
    expect(approvedServiceAreas.length).toBeLessThanOrEqual(serviceAreas.length);
    expect(approvedServiceAreas.every((a) => a.approved)).toBe(true);
  });

  it("covers all seven Metro Detroit counties", () => {
    expect(approvedServiceAreas.map((a) => a.countyName).sort()).toEqual([
      "Livingston",
      "Macomb",
      "Monroe",
      "Oakland",
      "St. Clair",
      "Washtenaw",
      "Wayne",
    ]);
  });

  it("names real communities on every county page", () => {
    for (const area of serviceAreas) {
      expect(area.cities.length, `${area.slug} lists no cities`).toBeGreaterThanOrEqual(5);
    }
  });
});

describe("placeholder policy", () => {
  it("keeps testimonials empty until authentic reviews are supplied", () => {
    expect(testimonials).toEqual([]);
  });

  it("requires real alt text on every gallery photograph", () => {
    for (const photo of galleryPhotos) {
      expect(photo.alt.length, `${photo.src} has no usable alt text`).toBeGreaterThan(20);
      expect(photo.caption.length).toBeGreaterThan(0);
    }
  });

  it("never lists the same photograph twice", () => {
    const sources = galleryPhotos.map((p) => p.src);
    expect(new Set(sources).size).toBe(sources.length);
  });
});
