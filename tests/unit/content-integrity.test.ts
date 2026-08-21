import { describe, expect, it } from "vitest";
import { services, getServiceBySlug } from "@/content/services";
import { audiences } from "@/content/audiences";
import { serviceAreas, approvedServiceAreas } from "@/content/serviceAreas";
import { testimonials } from "@/content/testimonials";
import { projects } from "@/content/projects";

describe("services content", () => {
  it("defines all 8 required services with unique slugs", () => {
    expect(services).toHaveLength(8);
    const slugs = new Set(services.map((s) => s.slug));
    expect(slugs.size).toBe(8);
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

describe("audiences content", () => {
  it("defines all 6 required audiences with unique slugs", () => {
    expect(audiences).toHaveLength(6);
    const slugs = new Set(audiences.map((a) => a.slug));
    expect(slugs.size).toBe(6);
  });
});

describe("service areas content", () => {
  it("only routes approved service areas", () => {
    expect(approvedServiceAreas.length).toBeLessThanOrEqual(serviceAreas.length);
    expect(approvedServiceAreas.every((a) => a.approved)).toBe(true);
  });

  it("limits initial launch to Rochester and Rochester Hills", () => {
    const slugs = approvedServiceAreas.map((a) => a.slug);
    expect(slugs).toEqual(["rochester-mi", "rochester-hills-mi"]);
  });
});

describe("placeholder policy", () => {
  it("keeps testimonials empty until authentic reviews are supplied", () => {
    expect(testimonials).toEqual([]);
  });

  it("keeps projects empty until authentic photography is supplied", () => {
    expect(projects).toEqual([]);
  });
});
