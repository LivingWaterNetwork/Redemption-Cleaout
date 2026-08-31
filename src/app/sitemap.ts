import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/business";
import { services } from "@/content/services";
import { approvedServiceAreas } from "@/content/serviceAreas";
import { resources } from "@/content/resources";

const staticRoutes = [
  "",
  "/services",
  "/service-areas",
  "/how-it-works",
  "/about",
  "/projects",
  "/reviews",
  "/resources",
  "/faq",
  "/request-walkthrough",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  for (const service of services) {
    entries.push({ url: `${siteUrl}/services/${service.slug}`, lastModified: now });
  }
  for (const area of approvedServiceAreas) {
    entries.push({ url: `${siteUrl}/service-areas/${area.slug}`, lastModified: now });
  }
  for (const resource of resources) {
    entries.push({ url: `${siteUrl}/resources/${resource.slug}`, lastModified: now });
  }

  return entries;
}
