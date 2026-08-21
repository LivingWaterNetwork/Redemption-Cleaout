import type { ServiceAreaDefinition } from "@/types/content";

/**
 * Only entries with approved: true are routed and linked from navigation/
 * sitemap. Do not add new cities here without explicit approval — see
 * CONTENT_APPROVALS.md ("Exact service area"). Adding an entry does not by
 * itself create a page; see src/app/service-areas/[slug]/page.tsx, which
 * only generates static params for approved areas.
 */
export const serviceAreas: ServiceAreaDefinition[] = [
  {
    slug: "rochester-mi",
    cityName: "Rochester",
    stateAbbr: "MI",
    heroHeadline: "Property Cleanouts in Rochester, Michigan",
    metaDescription:
      "Full-property, estate, and commercial cleanouts in Rochester, Michigan — on-site walkthroughs and a crew that understands local real estate timelines.",
    localIntroduction:
      "Rochester's mix of established single-family neighborhoods, downtown commercial buildings, and nearby historic homes means cleanout jobs here range from a single estate property to a downtown storefront turnover. Redemption is based in Rochester and works throughout the city.",
    propertyContext:
      "Many Rochester properties are long-held family homes changing hands through inheritance, downsizing, or sale — which is why an on-site walkthrough, not a photo-based guess, drives every quote here.",
    relevantServiceSlugs: [
      "full-property-cleanouts",
      "estate-cleanouts",
      "residential-junk-removal",
      "move-out-cleanouts",
    ],
    faqs: [
      {
        question: "Does Redemption serve all of Rochester?",
        answer:
          "Yes, we work throughout Rochester. Tell us the property's location when you request a walkthrough and we'll confirm scheduling.",
      },
      {
        question: "Is there a Redemption office I can visit in Rochester?",
        answer:
          "Redemption is based in Rochester, Michigan. We work primarily through on-site walkthroughs at your property rather than an in-office visit — call or text to set one up.",
      },
    ],
    approved: true,
  },
  {
    slug: "rochester-hills-mi",
    cityName: "Rochester Hills",
    stateAbbr: "MI",
    heroHeadline: "Property Cleanouts in Rochester Hills, Michigan",
    metaDescription:
      "Full-property, estate, and commercial cleanouts in Rochester Hills, Michigan — on-site walkthroughs and dependable scheduling for homeowners and professionals.",
    localIntroduction:
      "Rochester Hills' larger single-family homes and growing commercial corridors mean cleanout needs here often involve full-property jobs, garage and basement clearing, and office or retail turnovers. Redemption serves Rochester Hills as part of its core Oakland County service area.",
    propertyContext:
      "Larger lot sizes and multi-level homes are common in Rochester Hills, which is part of why we scope every job on-site — access, stairs, and square footage all affect the real timeline.",
    relevantServiceSlugs: [
      "full-property-cleanouts",
      "estate-cleanouts",
      "commercial-cleanouts",
      "residential-junk-removal",
    ],
    faqs: [
      {
        question: "Do you serve all of Rochester Hills?",
        answer:
          "Yes, Rochester Hills is part of our core Oakland County service area. Request a walkthrough and we'll confirm scheduling for your property.",
      },
    ],
    approved: true,
  },
];

export function getServiceAreaBySlug(slug: string): ServiceAreaDefinition | undefined {
  return serviceAreas.find((a) => a.slug === slug && a.approved);
}

export const approvedServiceAreas = serviceAreas.filter((a) => a.approved);
