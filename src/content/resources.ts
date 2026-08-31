import type { ResourceDefinition } from "@/types/content";

export const resources: ResourceDefinition[] = [
  {
    slug: "estate-cleanout-checklist",
    title: "Estate Cleanout Checklist: What to Handle, and in What Order",
    seoTitle: "Estate Cleanout Checklist",
    metaDescription:
      "A practical checklist for families and executors handling an estate cleanout in Michigan — from securing the property to a final clearing.",
    summary:
      "A general guide to the order of operations for an estate cleanout, from the first steps after a loss to preparing the property for sale.",
    publishedAt: "2026-01-01",
    sections: [
      {
        heading: "Before anything is removed",
        body: [
          "Secure the property — locks, mail hold, and utilities as needed.",
          "Locate key documents: the will, deed, insurance policies, and any list of specific bequests.",
          "Identify anyone with a legal or family claim to review specific items before they're removed.",
        ],
      },
      {
        heading: "Sorting the property's contents",
        body: [
          "Separate items into keep, donate, sell (often through an estate-sale company), and remove.",
          "If an estate sale is planned, that typically happens before a full cleanout of what remains.",
          "Flag anything sentimental or uncertain for a family decision rather than a quick call on-site.",
        ],
      },
      {
        heading: "The cleanout itself",
        body: [
          "Photos get you a ballpark estimate over the phone; the on-site walkthrough is what turns that into a final quote and a real timeline.",
          "Confirm access details in advance: keys, stairs, parking, and whether anyone needs to be present.",
          "Ask what happens to items being removed — donation and recycling versus disposal — if that matters to your family.",
        ],
      },
      {
        heading: "After the cleanout",
        body: [
          "A final walkthrough confirms the property matches what was scoped and agreed.",
          "If the property is being sold, this is typically the point where it's ready for staging, repairs, or listing photos.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-a-property-cleanout",
    title: "Preparing for a Property Cleanout: What to Know Before the Walkthrough",
    seoTitle: "Preparing for a Property Cleanout",
    metaDescription:
      "What to expect before, during, and after a property cleanout walkthrough — access, timelines, and how quotes are scoped.",
    summary:
      "A short guide to what actually happens during a property cleanout, so there are no surprises between your first call and the final walkthrough.",
    publishedAt: "2026-01-01",
    sections: [
      {
        heading: "How quoting works: photos first, then on site",
        body: [
          "Send photos and you'll get a ballpark estimate over the phone, usually the same day — enough to decide whether to go ahead, at no cost or obligation.",
          "Photos can't show hidden storage, stair and doorway widths, or where a truck can actually park, and those are what move a price. The on-site walkthrough is where the final quote is given.",
        ],
      },
      {
        heading: "What to have ready",
        body: [
          "A general sense of what's staying versus going, even if it's not finalized.",
          "Any access details: keys, gate codes, parking restrictions, or stairs.",
          "Your target completion date, if you have one — a closing, a move, or a listing date.",
        ],
      },
      {
        heading: "What happens after the walkthrough",
        body: [
          "You'll receive a clear scope and timeline before any work is scheduled.",
          "Scheduling is confirmed around your date, not a generic queue.",
          "A final walkthrough at completion confirms the work matches what was agreed.",
        ],
      },
    ],
  },
  {
    slug: "how-property-cleanout-pricing-works",
    title: "How Property Cleanout Pricing Actually Works",
    seoTitle: "How Property Cleanout Pricing Works",
    metaDescription:
      "The real factors that affect property cleanout pricing — volume, access, materials, and timeline — and why on-site quotes matter.",
    summary:
      "Cleanout pricing isn't one flat number — here's what actually drives cost, and why an on-site quote is more accurate than an estimate from photos.",
    publishedAt: "2026-01-01",
    sections: [
      {
        heading: "What actually affects the price",
        body: [
          "Volume — how much needs to be removed, not just square footage.",
          "Access — stairs, elevators, parking distance, and how far items have to travel to a truck.",
          "Material type — furniture and general household goods, versus construction debris or appliances.",
          "Timeline — a standard schedule versus an urgent, fast-turnaround job.",
        ],
      },
      {
        heading: "Why the photo estimate is a range and the on-site quote is a number",
        body: [
          "Photos compress depth and hide what's behind a door or under a staircase, so a photo-based figure is honest as a range and misleading as a final price.",
          "Walking the property lets us give you one number that holds, instead of a figure that changes once the crew arrives.",
        ],
      },
      {
        heading: "What's not included in this guide",
        body: [
          "Specific rates and pricing tiers are confirmed operationally and are not published here — every property is different enough that a general price list would be misleading. Send photos for a ballpark estimate, and we'll give you the final quote at the property.",
        ],
      },
    ],
  },
];

export function getResourceBySlug(slug: string): ResourceDefinition | undefined {
  return resources.find((r) => r.slug === slug);
}
