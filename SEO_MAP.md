# SEO Map

One primary transactional/intent keyword per page, mapped from the brief's
keyword families. Local modifiers (Rochester MI, Rochester Hills MI,
Oakland County, Southeast Michigan) are woven into copy naturally, not
stuffed.

| Page | Primary keyword intent |
|---|---|
| `/` | full property cleanout + Rochester MI |
| `/services/full-property-cleanouts` | full property cleanout |
| `/services/estate-cleanouts` | estate cleanout / inherited property cleanout |
| `/services/commercial-cleanouts` | commercial property cleanout |
| `/services/foreclosure-cleanouts` | foreclosure cleanout / distressed property cleanout |
| `/services/hoarding-cleanouts` | hoarding cleanout / severe clutter cleanout |
| `/services/residential-junk-removal` | residential junk removal |
| `/services/move-out-cleanouts` | move-out cleanout |
| `/services/light-demolition` | light demolition |
| `/who-we-serve/realtors` | realtor cleanout service |
| `/who-we-serve/estate-professionals` | probate property cleanout |
| `/who-we-serve/property-managers` | landlord cleanout service |
| `/who-we-serve/investors` | investor property cleanout |
| `/who-we-serve/commercial` | commercial property cleanout partner |
| `/service-areas/rochester-mi` | property cleanout Rochester MI |
| `/service-areas/rochester-hills-mi` | property cleanout Rochester Hills MI |
| `/resources/estate-cleanout-checklist` | estate cleanout checklist (informational) |
| `/resources/preparing-for-a-property-cleanout` | property cleanout preparation (informational) |
| `/resources/how-property-cleanout-pricing-works` | property cleanout pricing (informational) |

## Structured data by page

- **Every page**: `WebPage` + `BreadcrumbList` (except home, which uses
  `WebPage` at the root)
- **Root layout**: `LocalBusiness` (address omitted while
  `publicAddressEnabled` is false — see `src/lib/structuredData.ts`) and
  `WebSite`
- **Service pages**: + `Service`, `FAQPage`
- **Who-we-serve pages**: + `FAQPage`
- **Service area pages**: + `FAQPage`
- **Resource pages**: + `Article`
- **`/faq`**: `FAQPage` covering the full list
- **No aggregate rating / review schema anywhere** — no authentic first-party
  rating data exists yet (see `CONTENT_APPROVALS.md`).

## Deliberately NOT built

- Location pages for cities beyond Rochester and Rochester Hills. Adding
  one requires: (1) approval in `CONTENT_APPROVALS.md`, (2) a genuinely
  unique local introduction and property context (not a template with the
  city name swapped), and (3) an entry in
  `src/content/serviceAreas.ts` with `approved: true` — only then does
  `generateStaticParams` in `src/app/service-areas/[slug]/page.tsx` route it
  and `sitemap.ts` include it.
- Any doorway page, fake office claim, or invented review/rating.

## Ongoing SEO tasks (not code — operational)

- Submit the sitemap in Google Search Console after launch.
- Set up and verify the Google Business Profile; do not claim an address
  the site itself doesn't publish.
- Build citations and the review-generation flow referenced in the brand
  guide's "Five Marketing Engines" (outside this codebase's scope).
