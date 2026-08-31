# SEO Map

One primary transactional/intent keyword per page. Local modifiers (Metro
Detroit and the seven county names) are woven into copy naturally, not stuffed.

## Page → keyword

| Page | Primary keyword intent |
|---|---|
| `/` | property cleanout + demolition, Metro Detroit |
| `/services` | cleanout and demolition services Metro Detroit |
| `/services/full-property-cleanouts` | full property cleanout |
| `/services/demolition` | demolition contractor Metro Detroit |
| `/service-areas` | property cleanout Metro Detroit |
| `/service-areas/oakland-county-mi` | property cleanout Oakland County MI |
| `/service-areas/macomb-county-mi` | property cleanout Macomb County MI |
| `/service-areas/wayne-county-mi` | property cleanout Wayne County MI |
| `/service-areas/st-clair-county-mi` | property cleanout St. Clair County MI |
| `/service-areas/livingston-county-mi` | property cleanout Livingston County MI |
| `/service-areas/washtenaw-county-mi` | property cleanout Washtenaw County MI |
| `/service-areas/monroe-county-mi` | property cleanout Monroe County MI |
| `/service-areas/<county>/<city>` | property cleanout + that city, e.g. "property cleanout Troy MI" |
| `/projects` | cleanout before and after photos (previous work) |
| `/how-it-works` | how property cleanout pricing and quoting works |
| `/resources/estate-cleanout-checklist` | estate cleanout checklist (informational) |
| `/resources/preparing-for-a-property-cleanout` | property cleanout preparation (informational) |
| `/resources/how-property-cleanout-pricing-works` | property cleanout pricing (informational) |

### Keywords carried by on-page sections, not separate pages

The cleanout types each have an anchored `<h3>` section on
`/services/full-property-cleanouts`, with the section `id` matching the slug of
the standalone page it replaced:

| Anchor | Keyword intent |
|---|---|
| `#estate-cleanouts` | estate cleanout / inherited property cleanout |
| `#foreclosure-cleanouts` | foreclosure cleanout / distressed property cleanout |
| `#commercial-cleanouts` | commercial property cleanout |
| `#hoarding-cleanouts` | hoarding cleanout / severe clutter cleanout |
| `#move-out-cleanouts` | move-out cleanout |
| `#residential-junk-removal` | residential junk removal |

## Permanent redirects (301)

Defined in `next.config.mjs` as `legacyRedirects`. These carry the ranking
signal from the URLs retired in the two-pillar restructure — **do not remove
them**, and do not downgrade them to temporary.

| From | To |
|---|---|
| `/services/estate-cleanouts` | `/services/full-property-cleanouts#estate-cleanouts` |
| `/services/commercial-cleanouts` | `/services/full-property-cleanouts#commercial-cleanouts` |
| `/services/foreclosure-cleanouts` | `/services/full-property-cleanouts#foreclosure-cleanouts` |
| `/services/hoarding-cleanouts` | `/services/full-property-cleanouts#hoarding-cleanouts` |
| `/services/move-out-cleanouts` | `/services/full-property-cleanouts#move-out-cleanouts` |
| `/services/residential-junk-removal` | `/services/full-property-cleanouts#residential-junk-removal` |
| `/services/light-demolition` | `/services/demolition` |
| `/service-areas/rochester-mi` | `/service-areas/oakland-county-mi` |
| `/service-areas/rochester-hills-mi` | `/service-areas/oakland-county-mi` |
| `/who-we-serve` and all six children | the matching cleanouts page or anchor |

A redirect test in `tests/e2e/request-walkthrough.spec.ts` fails if any of the
first three stop resolving.

## Structured data by page

- **Every page**: `WebPage` + `BreadcrumbList` (except home, which uses
  `WebPage` at the root)
- **Root layout**: `LocalBusiness` (address omitted while
  `publicAddressEnabled` is false — see `src/lib/structuredData.ts`) with
  `areaServed` as seven `AdministrativeArea` county nodes, and `WebSite`
- **Service pages**: + `Service` (same county `areaServed`), `FAQPage`
- **Service area pages**: + `FAQPage`
- **Resource pages**: + `Article`
- **`/faq`**: `FAQPage` covering the full list
- **No aggregate rating / review schema anywhere** — no authentic first-party
  rating data exists yet (see `CONTENT_APPROVALS.md`).

## City pages

City landing pages live at `/service-areas/<county-slug>/<city-slug>`, nested
under their county so the hierarchy and breadcrumbs match the geography. One
file per city in `src/content/cities/`, aggregated by
`tools/build-city-index.mjs`.

They are the main local-search surface: "cleanout company in Sterling Heights"
is how this work is actually searched for. They are deliberately **not** in the
navigation — the menu stays at five items; the pages are reached from their
county page, from each other via `nearbySlugs`, and from search.

**The standard, which is not negotiable.** A set of near-identical pages with
the city name swapped is a doorway-page pattern; Google demotes it and it drags
the rest of the domain down. Every city page has to carry local specifics a
resident would recognise — housing stock, real neighbourhoods and corridors,
and how the built environment changes the physical work. The test: swap in a
different city's name and the text should read obviously wrong.

Never state, on a city page, an ordinance, permit rule or fee, a named disposal
site or charity, a job Redemption has done there, or any statistic. See
`CONTENT_APPROVALS.md`.

## Deliberately NOT built

- A page for every municipality in seven counties. Coverage is published at
  county level, with city pages only where there is enough genuine local
  substance to justify one.
- A separate page per cleanout type. Those are anchored sections on the
  cleanouts pillar; re-splitting them means updating `legacyRedirects`,
  `navigation.ts`, and the sitemap together.
- Any doorway page, fake office claim, or invented review/rating.

## Ongoing SEO tasks (not code — operational)

- Submit the sitemap in Google Search Console after launch, and use the URL
  inspection tool on the retired URLs so the 301s are picked up quickly.
- Update the Google Business Profile service area to all seven counties, and
  add "Demolition" as a service. The profile and the site must agree.
- Do not claim an address the site itself doesn't publish.
- Build citations and the review-generation flow referenced in the brand
  guide's "Five Marketing Engines" (outside this codebase's scope).
