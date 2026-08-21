# Redemption Cleanout Services — Complete Project Summary

**Purpose of this document.** Source material for a client-facing presentation on
work delivered and pricing justification. Every fact below was pulled from the
actual codebase, the actual git history, or a live verification run against the
deployed site on **2026-08-21**. Where something could not be verified from code
or from the live site, it is marked explicitly as **UNVERIFIED** rather than
guessed.

**Read the three flagged items in §0 before building the deck**, then §11 for the
fixes applied after the first pass. Three of the
briefing assumptions behind this request turned out not to match the repository,
and one of them is a live production risk.

---

## 0. Corrections to the briefing assumptions — read first

| Briefing assumption | What the codebase actually shows |
|---|---|
| "Structured data (JSON-LD): confirm whether any exists; if none, note this as a gap. LocalBusiness/Service schema was recommended as a high-value addition." | **Structured data already exists and is comprehensive.** `src/lib/structuredData.ts` emits `LocalBusiness`, `WebSite`, `WebPage`, `Service`, `FAQPage`, `Article`, and `BreadcrumbList`. Verified live on the homepage. This is **not** a gap — it is a delivered feature. See §5.5. |
| "robots.txt / sitemap.xml — check if they exist" | Both exist as **dynamic route handlers** (`src/app/robots.ts`, `src/app/sitemap.ts`), not static files. Both verified live. See §5.8. |
| Current work is on branch `claude/redemption-cleanout-services-51t9af` at commit `0f6da52` | Correct — **and that branch is 3 commits ahead of `main`.** `main` (and therefore this summary branch's base) does **not** contain the build fix, the 14 additional photos, or the Lighthouse results. See §0.1. |

### 0.1 Live production risk — the fix is not on `main`

The `metadataBase` build crash was fixed in commit `0f6da52`, which lives **only**
on `claude/redemption-cleanout-services-51t9af`. Branch `main` is still at
`a5ff374` and still carries the vulnerable line:

```ts
// src/content/business.ts @ main (a5ff374) — STILL VULNERABLE
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://redemptioncleanoutservices.com";
```

`??` falls back only on `null`/`undefined`. A declared-but-blank Vercel variable
arrives as `""`, passes through, and crashes `new URL("")` at module evaluation.
**Consequence:** the moment anyone promotes `main` to Production with a blank
`NEXT_PUBLIC_SITE_URL` present, the build breaks again exactly as before. The
single highest-value 5-minute action available right now is merging
`claude/redemption-cleanout-services-51t9af` into `main`.

### 0.2 Live production risk — the site is currently `noindex`

Verified live on 2026-08-21 against `https://www.redemptioncleanoutservices.com/`:

```
HTTP/2 200
x-robots-tag: noindex, nofollow
x-vercel-cache: HIT
server: Vercel
```

```
GET /robots.txt
User-Agent: *
Disallow: /
```

The domain is being served by a **Preview** deployment. `next.config.mjs` adds
`X-Robots-Tag: noindex, nofollow` when `VERCEL_ENV === "preview"`, and
`src/app/robots.ts` returns `Disallow: /` under the same condition. Both are
correct, deliberate safety behaviour — but their combined effect is that **Google
cannot index a single page of this site today.** There is also a conflicting
in-page `<meta name="robots" content="index, follow">`; the HTTP header wins, so
the site is blocked.

This is a configuration state, not a code defect. It resolves the moment the
domain is pointed at a Production deployment (which requires §0.1 first).

---

## 1. Project identity

| Item | Value |
|---|---|
| GitHub repository | `LivingWaterNetwork/Redemption-Cleaout` (note: repo name is misspelled "Cleaout" upstream) |
| Repo full URL | https://github.com/LivingWaterNetwork/Redemption-Cleaout |
| This summary branch | `claude/redemption-cleanout-summary-is571q` |
| HEAD of this branch at time of writing | `a5ff374d3b7f16ceeb247836bc12a9b428a37b12` (`a5ff374`) |
| Delivered / deployed branch | `claude/redemption-cleanout-services-51t9af` |
| Delivered / deployed commit | `0f6da52ad255bf61f8a4fc0a69272c7cb42be106` (`0f6da52`) |
| `main` | `a5ff374` — 3 commits behind the delivered branch |
| Package name | `redemption-cleanout-services` v0.1.0, private |
| Framework | **Next.js 16.3.1**, **App Router** (`src/app/`) |
| React | **18.3.1** (`react` + `react-dom` 18.3.1) |
| Language | TypeScript 5.6.3, strict mode with `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 3.4.14 + PostCSS 8.4.47 + Autoprefixer |
| Validation | Zod 3.23.8 (configuration validation only) |
| Test stack | Vitest 4.1.11 (unit), Playwright 1.62.1 (E2E), Testing Library |
| Runtime deps in production path | **4 only** — `next`, `react`, `react-dom`, `zod` |
| Database / CMS / auth | **None.** No animation library. |
| Hosting | Vercel (verified live: `server: Vercel`, `x-vercel-id: iad1::…`) |
| Vercel project name | **UNVERIFIED** — not recorded anywhere in the repo, and Vercel project metadata is not readable from this session |
| Vercel team | Stated in briefing as **Living Water Network**; **UNVERIFIED from code** |
| Business | Redemption Cleanout Services, Rochester, Michigan |
| Founder | Dante Terracciano |
| CRM / system of record | Jobber |
| Domain registrar | GoDaddy (domain stays there; DNS records only) |

### 1.1 Full commit history (5 commits on `main`, 8 on the delivered branch)

| Commit | Date | Subject |
|---|---|---|
| `f9701c3` | — | Build the Redemption Cleanout Services production website |
| `be047be` | — | Swap in master logo artwork and first authentic project photo |
| `848135d` | — | Replace weak hero photo with typographic hero; place real work photos on service pages |
| `dfd7067` | — | Phase 2: premium editorial redesign across the whole site |
| `a5ff374` | 2026-08-21 | Add HANDOFF.md so the project can be picked up in a fresh session ← **`main` HEAD** |
| `913e1b1` | 2026-08-21 14:13 UTC | Pull remaining Drive photos and distribute them across the site |
| `dabea84` | 2026-08-21 14:29 UTC | Record first Lighthouse run and correct the "no Chrome here" note |
| `0f6da52` | 2026-08-21 16:30 UTC | **Fix build crash when NEXT_PUBLIC_SITE_URL is declared but blank** ← **deployed HEAD** |

### 1.2 Verified build state at `0f6da52`

Reproduced in a clean worktree during the preparation of this document
(`npm ci` → `npm run build` → `npm test`):

```
▲ Next.js 16.3.1 (Turbopack)
✓ Compiled successfully in 7.1s
  Finished TypeScript in 4.5s
✓ Generating static pages using 3 workers (41/41) in 739ms

Test Files  8 passed (8)
     Tests  31 passed (31)
```

**41 routes generated. 31 unit tests passing. Build clean.** (Note: `HANDOFF.md`
still says "24 passing" in its status table — that line is stale; the actual
count at `0f6da52` is 31, seven of which are the new regression tests.)

---

## 2. Full page and route inventory

### 2.1 Route count summary

**41 generated routes**, comprising 34 content pages + `/_not-found` +
`/robots.txt` + `/sitemap.xml` + `/icon.png` + `/apple-icon.png` + generated
dynamic-segment shells. Breakdown:

- 15 static content pages
- 8 service detail pages (`/services/[slug]`)
- 6 audience detail pages (`/who-we-serve/[slug]`)
- 2 service-area detail pages (`/service-areas/[slug]`)
- 3 resource/guide pages (`/resources/[slug]`)
- 3 legal pages (counted within the 15 static)
- 1 custom 404

Every content page is a **server component**, statically prerendered
(`○ Static` or `● SSG`). Nothing is server-rendered on demand.

### 2.2 Static pages

| URL | `<title>` (as rendered) | Content / purpose | Status |
|---|---|---|---|
| `/` | Redemption Cleanout Services \| Full-Property Cleanouts in Rochester, MI | 14-section homepage: hero, trust band, situation selector, flagship services, before/after, why-Redemption, how-it-works, professional-partner band, founder, recent work, reviews, service areas, FAQ preview, final CTA | **Complete** (2 honest pending notices — reviews, further before/after pairs) |
| `/about` | About Redemption & Our Founder | Founder story, pull quote, 4 credibility points, 5 named company values | **Complete**, with 2 explicit placeholders: "Founder portrait to come" caption and a values sign-off notice |
| `/services` | Property Cleanout Services | Overview: 5 flagship services as numbered editorial rows + 3 supporting services | **Complete** |
| `/who-we-serve` | Who We Serve | Splits consumer audience from 5 professional-partner audiences; explicit "no referral fees" statement | **Complete** |
| `/service-areas` | Service Areas | Lists the 2 approved city pages + an "don't see your city" fallback | **Complete** |
| `/how-it-works` | How It Works | 5-step process timeline + a "why we quote on-site" rationale section | **Complete** |
| `/projects` | Project Gallery | Hero, RecentWork tiles, and the ProjectGallery empty state | **Partially built by design** — gallery is an honest empty state pending photo permissions |
| `/reviews` | Reviews | ReviewSection | **Partially built by design** — honest empty state; no fabricated reviews |
| `/resources` | Resources & Guides | Index of the 3 educational guides | **Complete** |
| `/faq` | Frequently Asked Questions | 11 FAQs across 6 categories, accordion, `FAQPage` JSON-LD | **Complete**, except one answer that says accepted/excluded materials are pending |
| `/request-walkthrough` | Request a Property Walkthrough | Primary conversion page: Jobber embed + 4-step "what happens next" + 3 reassurances + call/text block | **Partially built by config** — Jobber embed URL unset, so it renders the honest call/text fallback |
| `/contact` | Contact Us | Call / Text / Online / Instagram rows + a "where we work" panel | **Complete** |
| `/privacy` | Privacy Policy | 4 sections; states the site stores no lead data | **Complete** |
| `/terms` | Terms & Website-Use Notice | 4 sections incl. "No Automated Quotes" | **Complete** |
| `/accessibility` | Accessibility Statement | WCAG 2.2 AA commitment + contact route for barriers | **Complete** |
| (404) | — | Custom not-found with 3 recovery links | **Complete** |

### 2.3 Service detail pages — `/services/[slug]` (8 pages, all complete)

Every one carries: hero (with real photo), definition, "What Redemption
handles" list, "What may require another specialist" list, a sticky sidebar
("Who this is for" + "Common conditions" + CTA cluster), a process timeline, a
full-bleed proof image with caption, service-specific FAQs, related-service
links, and a closing CTA. Every one emits `Service` + `FAQPage` +
`BreadcrumbList` JSON-LD.

| # | URL | Page title | H1 | Purpose |
|---|---|---|---|---|
| 1 | `/services/full-property-cleanouts` | Full-Property Cleanouts | Full-Property Cleanouts | Flagship. Complete top-to-bottom removal of a property's contents. 5 process steps, 3 FAQs. |
| 2 | `/services/estate-cleanouts` | Estate and Inherited-Property Cleanouts | Estate and Inherited-Property Cleanouts | Estate/inheritance/senior-care transitions; executor, probate and out-of-state coordination. 5 process steps, 3 FAQs. |
| 3 | `/services/commercial-cleanouts` | Commercial Property Cleanouts | Commercial Property Cleanouts | Office, retail, warehouse; scheduled around operating hours and lease-end. 4 process steps, 2 FAQs. |
| 4 | `/services/foreclosure-cleanouts` | Foreclosure and Distressed-Property Cleanouts | Foreclosure and Distressed-Property Cleanouts | Banks, asset managers, REO, investors; before/after documentation; repeat volume. 4 process steps, 3 FAQs. |
| 5 | `/services/hoarding-cleanouts` | Hoarding-Related Cleanouts | Hoarding-Related Cleanouts | Severe clutter, judgment-free, discreet. 5 process steps, 3 FAQs — including one that explicitly refuses the word "hoarder". |
| 6 | `/services/residential-junk-removal` | Residential Junk Removal | Residential Junk Removal | Supporting service. Garage/basement/attic, single items. 3 process steps, 2 FAQs. |
| 7 | `/services/move-out-cleanouts` | Move-Out and Downsizing Cleanouts | Move-Out and Downsizing Cleanouts | Supporting service. Relocation, downsizing, senior-living transition. 4 process steps, 2 FAQs. |
| 8 | `/services/light-demolition` | Light Demolition and Site Preparation | Light Demolition and Site Preparation | Supporting service. Interior tear-outs; explicitly excludes structural demolition and asbestos abatement. 4 process steps, 2 FAQs. |

Flagship/supporting split is data-driven: `flagshipServices = priority <= 5`,
`supportingServices = priority > 5`. (Note a deliberate nuance: the `/services`
overview page shows **5** flagship rows from that filter, while the **homepage**
`FlagshipServices` component hard-codes a different set of **4** —
full-property, estate, commercial, foreclosure.)

### 2.4 Professional-partner / audience pages — `/who-we-serve/[slug]` (6 pages, all complete)

Every one carries: hero, a two-column "What you need" vs. "How Redemption
helps" split, most-relevant services, audience FAQs, and an audience-specific
CTA. All emit `FAQPage` + `BreadcrumbList` JSON-LD.

| URL | Page title | H1 | CTA label | Primary keyword |
|---|---|---|---|---|
| `/who-we-serve/homeowners-and-families` | Homeowners and Families | For Homeowners and Families | Request a Property Walkthrough | property cleanout for homeowners |
| `/who-we-serve/realtors` | Realtors and Brokers | For Realtors and Brokers | Request a Property Walkthrough | realtor cleanout service |
| `/who-we-serve/estate-professionals` | Estate-Sale and Probate Professionals | For Estate-Sale and Probate Professionals | Discuss a Referral Partnership | probate property cleanout |
| `/who-we-serve/property-managers` | Property Managers and Landlords | For Property Managers and Landlords | Discuss a Referral Partnership | landlord cleanout service |
| `/who-we-serve/investors` | Investors and House Flippers | For Investors and House Flippers | Discuss a Referral Partnership | investor property cleanout |
| `/who-we-serve/commercial` | Commercial Property Professionals | For Commercial Property Professionals | Request a Commercial Walkthrough | commercial property cleanout partner |

**Yes — attorney-facing, realtor-facing and investor-facing pages all exist.**
Probate attorneys are served by `/who-we-serve/estate-professionals`.

### 2.5 Service-area pages — `/service-areas/[slug]` (2 pages, both complete)

| URL | Page title | H1 |
|---|---|---|
| `/service-areas/rochester-mi` | Rochester, MI Property Cleanouts | Property Cleanouts in Rochester, Michigan |
| `/service-areas/rochester-hills-mi` | Rochester Hills, MI Property Cleanouts | Property Cleanouts in Rochester Hills, Michigan |

Each has a unique `localIntroduction` and `propertyContext` (genuinely different
copy, not a city-swap template), 4 relevant services, and city-specific FAQs.

**Routing is gated.** `serviceAreas.ts` entries require `approved: true`;
`generateStaticParams` and `sitemap.ts` only emit approved entries. Adding a
city therefore requires an explicit approval flip, by design.

### 2.6 Resource / guide pages — `/resources/[slug]` (3 pages, all complete)

| URL | Page title | Sections | Emits |
|---|---|---|---|
| `/resources/estate-cleanout-checklist` | Estate Cleanout Checklist: What to Handle, and in What Order | 4 | `Article` + `BreadcrumbList` |
| `/resources/preparing-for-a-property-cleanout` | Preparing for a Property Cleanout: What to Know Before the Walkthrough | 3 | `Article` + `BreadcrumbList` |
| `/resources/how-property-cleanout-pricing-works` | How Property Cleanout Pricing Actually Works | 3 | `Article` + `BreadcrumbList` |

All three carry `publishedAt: "2026-01-01"`. Each has a sticky aside with the
other two guides plus a dark "Every property is different" CTA card.

### 2.7 Machine routes

| Route | Source | Behaviour |
|---|---|---|
| `/robots.txt` | `src/app/robots.ts` | Preview → `Disallow: /`. Production → `Allow: /`, `Disallow: /api/`, plus `Sitemap:` line |
| `/sitemap.xml` | `src/app/sitemap.ts` | 34 URLs: 15 static + 8 services + 6 audiences + 2 areas + 3 resources, each with `lastModified` |
| `/icon.png`, `/apple-icon.png` | `src/app/icon.png`, `apple-icon.png` | Generated from the master logo |
| `/favicon.ico` | `src/app/favicon.ico` | Declared in root metadata |

### 2.8 Shared layout components

Root layout (`src/app/layout.tsx`) composition order:
`MotionGate` (in `<head>`) → `StructuredData` (LocalBusiness + WebSite) →
`SkipLink` → `Header` → `<main id="main-content">` → `Footer` →
`MobileActionBar` → `ConsentBanner` → `Analytics`.

**`Header`** (`src/components/layout/Header.tsx`) — client component, `fixed`, transparent over the homepage hero and solid once scrolled past 24px.
- Utility strip (desktop, collapses on scroll): "Based in Rochester, Michigan" · "Estates · Foreclosures · Commercial · Severe Clutter"
- Logo → `/images/brand/logo-header@4x.png`, `priority`, alt = "Redemption Cleanout Services", `aria-label="Redemption Cleanout Services — home"`
- Primary nav (6 items): **Services** (dropdown, all 8 services + "Services overview"), **Who We Serve** (dropdown, all 6 audiences + overview), **Service Areas**, **How It Works**, **Projects**, **About**
- Desktop actions: phone `(248) 321-9609` (tracks `click_call` / location `header`) and a **Request a Walkthrough** button (tracks `click_request_walkthrough`)
- Mobile: hamburger → full panel with primary nav + nested children + secondary nav (Reviews, Resources, FAQ, Contact) + Walkthrough button + Call/Text pair. Body scroll locked while open; Escape closes; menus reset on route change.
- Accessibility: `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-current="page"`, hover-intent close delay of 140ms

**`Footer`** (`src/components/layout/Footer.tsx`) — server component, `border-t-4 border-redemption-red` on `heritage-black`.
- Conversion band: "Ready to clear a property and move forward?" + **Request a Walkthrough** + **Call (248) 321-9609**
- Brand block: logo, tagline "Redeem Your Property. Reclaim Your Space.", positioning line "Rochester's real-estate-informed partner for complete property cleanouts and difficult property transitions."
- Contact `<dl>`: Location → "Based in Rochester, Michigan"; Call or text → `(248) 321-9609`; Instagram → `@redemption_cleanoutservices` (https://www.instagram.com/redemption_cleanoutservices)
- Four crawlable link indexes: all 8 Services · all 6 Who-We-Serve · Service Areas (2 cities + "All areas") · More (How It Works, About, Projects, Reviews, Resources, FAQ, Contact)
- Legal bar: `© {current year} Redemption Cleanout Services. All rights reserved.` + **Privacy Policy** · **Terms & Website-Use Notice** · **Accessibility Statement** · **Text us**
- **Social links: Instagram only.** No Facebook, X, LinkedIn, or Google links anywhere.
- **Never renders the street address** while `publicAddressEnabled` is `false`.

**`MobileActionBar`** — fixed 3-up bottom bar under `sm:`: 📞 Call · 💬 Text · 📋 Walkthrough (red). 56px minimum touch targets, `env(safe-area-inset-bottom)` padding, auto-hides via IntersectionObserver when the Jobber form anchor is centred in view. All three fire analytics events.

**`CallToAction`** — the shared closing banner, two variants:
- `feature` (default): full-bleed photographic closer over `branded-dump-trailer-curbside.jpg` at 30% opacity with a left-to-right scrim, eyebrow "Get a clear next step", headline, supporting text, **Request a Property Walkthrough** + **Call** + **Text Dante**, plus a numbered "What happens next" 3-step list.
- `band`: lighter warm-concrete interior variant (used on `/resources`).

Used on 13 of the content pages with page-specific headlines (listed in §3.6).

**`SkipLink`** — "Skip to main content" → `#main-content`.

**`ConsentBanner`** — fixed bottom banner, full-bleed on mobile / `max-w-sm` card at `sm:`. Copy: "We use analytics to understand how visitors use this site. We don't collect form contents, names, phone numbers, or emails in analytics." Accept / Decline, persisted in `localStorage` under `redemption-consent`.

**`UtilityBar`** — exists in the codebase but is **not mounted** in the current layout; its function was absorbed into the Header's utility strip. Dead code.

**Other shared UI:** `Breadcrumbs`, `SectionHeader`, `ProcessTimeline`, `FAQAccordion`, `ServiceCard`, `EmptyState`, `PhotoPlaceholder`, `BeforeAfterComparison`, `ErrorBoundary`, `Reveal` + `MotionGate` (motion system), `StructuredData`.

---

## 3. Content and messaging inventory

All copy below is **verbatim** from the codebase at `0f6da52`, quotable as-is.

### 3.1 Homepage

**H1 (two lines, one `<h1>`):**
> **Clear the Property.**
> **Reclaim What Comes Next.**

**Eyebrow above it:** `Based in Rochester, Michigan · Full-Property Cleanouts`

**Subheadline:**
> "Complete residential and commercial cleanouts for estates, inherited homes, distressed properties, severe clutter, and time-sensitive real-estate transitions throughout Rochester and surrounding Southeast Michigan communities."

**Hero CTAs:** `Request a Property Walkthrough` · `Call (248) 321-9609` · `Text Dante`

**Hero credibility row** (labelled "verified facts only, no invented metrics" in the source):
| Experience | Scope | Quoting |
|---|---|---|
| 13 years in real estate | Residential & commercial | On-site, not from photos |

**Trust band** (`aria-label="Why property owners and professionals choose Redemption"`):
| Based in | Capability | Informed by |
|---|---|---|
| **Rochester, Michigan** — "Serving Rochester, Rochester Hills, and Oakland County." | **Residential & commercial** — "Whole properties and commercial spaces, not isolated pickups." | **Real-estate experience** — "Closings, listing prep, and investor timelines understood." |

**Situation selector** — eyebrow "Start Here", H2 **"What brings you here today?"**, intro "Tell us the situation and we'll point you to the right next step." Six first-person situations (desktop tablist with full arrow-key support; mobile disclosure list):

1. **"I'm managing an estate or inherited property"** → *Estate and inherited-property cleanouts* — "We work at the pace the situation calls for, coordinate around probate deadlines, estate sales, and closings, and set aside anything your family still needs to review."
2. **"I'm preparing a property for sale"** → *Cleared, and ready to list* — "A property full of contents can't be shown. We clear it completely and leave it broom-swept, so staging, repairs, or listing photos can start on schedule."
3. **"I'm clearing a distressed or foreclosed property"** → *Distressed and foreclosure cleanouts* — "Abandoned contents, debris, and fast turnarounds for lenders, asset managers, and investors — with before-and-after documentation when your file needs it."
4. **"I'm coordinating from out of state"** → *Handled while you're away* — "We walk the property, scope the work, and keep you updated by phone, text, and photos — one accountable point of contact, so you don't have to fly in to manage it."
5. **"I'm dealing with severe clutter"** → *Severe-clutter and hoarding-related cleanouts* — "Handled privately and without judgment. We scope the real condition in person, work methodically, and set aside anything that needs to be reviewed first."
6. **"I'm preparing a commercial property"** → *Commercial property cleanouts* — "Offices, retail, and warehouse space cleared around your operating hours and lease dates, with the property manager, broker, and ownership all kept in the loop."

**Flagship services section** — eyebrow "Flagship Services", H2:
> **"Built for the properties other companies pass on"**

Intro: "Redemption leads with complete-property work — whole homes, estates, commercial spaces, and distressed properties, handled end to end."

**Before/after section** — label "Proof", H2:
> **"The condition it was in. The condition we leave it in."**

Intro: "Authentic documentation from real Redemption projects — no stock imagery, and nothing published without permission."

**Why Redemption section** — eyebrow "Why Redemption", H2 **"More than removal."**

Lead differentiator (set in large red condensed type): **"Real-estate understanding"**
> "Dante's experience means the team understands closings, listing preparation, distressed properties, investor timelines, and professional communication. A cleanout is rarely the point — the property has somewhere to be next, and the schedule is usually already set."

Four supporting differentiators:
- **Capable execution** — "Redemption is structured for complete-property projects — not merely isolated pickups."
- **Clear communication** — "Clients and professional partners know what happens next, what is included, and who is accountable."
- **Respect for people and property** — "Sensitive situations are handled without judgment or unnecessary exposure."
- **Ready for what comes next** — "The objective is not just removal. The property should be positioned for its next use, sale, renovation, occupancy, or transition."

**How It Works section** — H2 **"From first call to a cleared property"**, intro "On-site quoting is required for accuracy — photos alone misrepresent scope. Here is exactly what happens at each step." Plus: "Step one takes about two minutes. Send the property details and we'll follow up to schedule the walkthrough."

**Professional-partner band** (red field, deliberately differentiated) — eyebrow "For Professional Partners", H2:
> **"Reliable cleanout execution for properties that need to move forward."**

> "Realtors, probate attorneys, estate-sale companies, property managers, investors, and commercial owners work with Redemption because the boring parts get done right: answering fast, showing up on time, and finishing what was scoped."

CTA: **Discuss a Referral Partnership**

Six-row capability table:
| Term | Detail |
|---|---|
| Accountability | One point of contact from walkthrough to completion. |
| Communication | Proactive updates, so you never explain a surprise to your client. |
| Deadlines | Closings, lease-ends, and listing dates scoped in from the start. |
| Scope documentation | Written scope after the walkthrough, before work begins. |
| Real-estate understanding | Listing prep, distressed property, and investor timelines. |
| Repeat-work readiness | Crew capacity for ongoing volume across a portfolio. |

**Recent work** — label "The Work", H2 **"Real properties, real scope"**, intro "Photographs from completed Redemption projects across Southeast Michigan. Nothing staged, and nothing published without permission."

**Service areas** — H2 **"Rochester, Rochester Hills, and Oakland County"**, intro "Based in Rochester, Michigan. We serve surrounding Southeast Michigan communities as part of our regular coverage — we don't operate an office in every city we work in."

**FAQ preview** — H2 **"Answered directly"**, intro "No hedging and no fine print. If your question isn't here, call or text and we'll answer it straight." Shows the first 5 FAQs.

**Final CTA** — H2:
> **"Reclaim the property. Then move forward."**
> "Tell us about the property and we'll schedule an on-site walkthrough. You'll get a clear scope, a real timeline, and a price that holds — before anything is booked."

### 3.2 `/about`

**Eyebrow:** About
**H1:**
> **"The name is not decoration. It is the strategy."**

**Subheadline:**
> "A house buried in clutter, damage, or neglect can be restored to order. A person facing grief, overwhelm, or a hard transition deserves a dependable guide through it."

**Founder pull quote** (attributed as Redemption's stated intent, deliberately *not* as a fabricated personal quotation from Dante):
> **"A property, a family, or a situation can be overwhelmed and still be reclaimed. That is the whole idea behind the name."**

**Founder story — "Our Story" version, in full:**
> "Dante Terracciano built Redemption Cleanout Services on 13 years in real estate and a family background in brokerage and home building — and on a personal season of renewal that gave him a new sense of purpose. He started the company to bring real professionalism to a business that families and property professionals can rely on. The business began through cleanout work connected to an estate-sale relationship, and Dante chose to build something rooted in purpose rather than speed to income — including a commitment to giving his crew real opportunity and growth."

**Founder story — short version** (used in the homepage founder section):
> "Dante Terracciano built Redemption Cleanout Services on 13 years in real estate and a family background in brokerage and home building — and on a personal season of renewal that gave him a new sense of purpose. He started the company to bring real professionalism to a business that families and property professionals can rely on."

**Four credibility points:**
1. 13 years of real-estate sales experience
2. Family background in real-estate brokerage and home building
3. Construction fluency most cleanout companies lack
4. On-site quoting for an accurate scope before work begins

**Values section** — eyebrow "How we operate", H2 **"Five values, in operational language"**:

| Value | Operational definition |
|---|---|
| **Redemption** | "We treat every property, and every project, as a second chance — not a write-off." |
| **Integrity** | "We quote honestly, show up when we say we will, and do the job the way we said we would." |
| **Stewardship** | "Client property, company equipment, and our team's time are things we're trusted to manage well." |
| **Responsiveness** | "We answer, quote, and schedule quickly — speed is part of the service, not an afterthought." |
| **Thoroughness** | "We finish the job completely and leave the space in better condition than we found it." |

**Closing CTA:** H2 **"Talk with Dante"** — "Call or text and you'll reach the person accountable for the work, not a call center."

### 3.3 Other page headlines and subheadlines (verbatim)

| Page | Eyebrow | H1 | Subheadline |
|---|---|---|---|
| `/services` | Services | **Full-property cleanouts, and everything around them** | "Redemption leads with complete-property work: estates, commercial spaces, foreclosures, and severe-clutter situations. We also handle the smaller jobs that come with them." |
| `/who-we-serve` | Who We Serve | **Two audiences. Two very different conversations.** | "The people living the situation, and the professionals who refer the work. Both need something different from a cleanout company." |
| `/service-areas` | Service Areas | **Serving Rochester, Rochester Hills, Oakland County, and approved surrounding Southeast Michigan communities** | "We publish detailed pages only for areas where we have real local context to share — not a page for every nearby zip code." |
| `/how-it-works` | Process | **From first call to a cleared property** | "On-site quoting is required for accuracy — photos alone misrepresent scope. Here is exactly what happens at each step." |
| `/projects` | Projects | **Documented work, not a stock gallery** | "Photographs from real Redemption projects across Southeast Michigan. We publish nothing staged, and nothing identifying without permission." |
| `/reviews` | Reviews | **What clients and partners say** | "Redemption has grown on referral relationships rather than review volume. We publish only what real clients actually wrote." |
| `/resources` | Resources | **Guides for property owners and families** | "Practical, no-sales-pitch explanations of how cleanouts actually work — written for people handling one for the first time." |
| `/faq` | FAQ | **Answered directly** | "No hedging and no fine print. If your question isn't here, call or text and we'll answer it straight." |
| `/request-walkthrough` | Get Started | **Request a property walkthrough** | "Full-property, estate, commercial, and larger jobs are quoted on-site for accuracy. Send the details below, or call or text — either reaches the same person." |
| `/contact` | Contact | **Get in touch** | "Call, text, or send the property details online. All three reach the same person." |
| 404 | 404 | **We couldn't find that page.** | "The page you're looking for may have moved. Try the links below, or reach out directly and we'll help you find what you need." |

### 3.4 Every positioning statement and differentiator on the site

**Primary tagline (brochure-derived, brief-mandated):**
> **"Redeem Your Property. Reclaim Your Space."** — rendered in the footer brand block.

**Positioning statements:**
- "Built for the properties other companies pass on" *(homepage flagship services H2)*
- "The name is not decoration. It is the strategy." *(/about H1)*
- "Rochester's real-estate-informed partner for complete property cleanouts and difficult property transitions." *(footer)*
- "More than removal." *(homepage Why Redemption H2)*
- "Reliable cleanout execution for properties that need to move forward." *(professional-partner band + /who-we-serve dark section)*
- "Documented work, not a stock gallery" *(/projects H1)*
- "Two audiences. Two very different conversations." *(/who-we-serve H1)*
- "Smaller jobs, same standard" *(/services supporting section H2)*
- "Every property is scoped in person" *(/services closing CTA)*
- "Judge us by the walkthrough" *(/reviews closing CTA)*
- "Answered directly" / "No hedging and no fine print" *(FAQ)*
- "Real properties, real scope" *(homepage RecentWork)*
- "The condition it was in. The condition we leave it in." *(before/after)*

**Named company values:** Redemption · Integrity · Stewardship · Responsiveness · Thoroughness *(five, each with an operational definition — see §3.2)*

**Founder credibility statements:** 13 years in real estate · family background in real-estate brokerage and home building · construction fluency most cleanout companies lack · on-site quoting.

**Explicit anti-claims — things the site deliberately refuses to say** (these are a differentiator in themselves and worth a deck slide):
- **"Redemption doesn't pay referral fees. What partners get is a vendor who answers fast, documents scope, hits deadlines, and never leaves them explaining a problem to their own client."** *(/who-we-serve)*
- **"Do you use the term 'hoarder'?" → "No. We refer to these as hoarding-related or severe-clutter cleanouts — describing the property's condition, not labeling the person."** *(/services/hoarding-cleanouts FAQ)*
- No "instant online quote": *"Full-property, estate, foreclosure, and commercial cleanouts vary too much for a photo or a form to price accurately."*
- No published price list: *"Specific rates and pricing tiers are confirmed operationally and are not published here — every property is different enough that a general price list would be misleading."*
- No "Fully insured" claim anywhere on the site — the brochure makes it, the brand guide flags it unverified, so it is withheld.
- No star ratings, no aggregate rating schema, no project counter, no "years in business" counter, no partner logos, no stock photography.
- Light demolition is *always* scoped as "subject to site conditions and approval" and *explicitly* excludes regulated asbestos abatement and structural demolition.
- Terms page states plainly: **"Nothing on this website constitutes a binding quote or automated pricing."**

**Primary CTA discipline:** the primary CTA is **"Request a Property Walkthrough"** — never "Book Now" — because larger cleanouts require qualification. On-site quoting is a positioning choice, not a limitation.

### 3.5 Trust signals — present, and what is pending

**Present and complete:**
| Trust signal | Where |
|---|---|
| Founder named, with story and pull quote | Homepage founder section, `/about` |
| 13 years real-estate experience | Hero credibility row, founder credibility points, `/about`, `/about` meta description |
| Family background in brokerage and home building | Founder story, credibility points |
| 5-step process, published in full | `/how-it-works`, homepage, plus a service-specific process on all 8 service pages |
| 11 site-wide FAQs across 6 categories | `/faq` |
| 22 additional service-specific FAQs | 8 service pages |
| 10 audience-specific FAQs | 6 audience pages |
| 3 service-area FAQs | 2 area pages |
| 5 named company values with operational definitions | `/about` |
| 6-row professional-partner capability table | Homepage |
| 19 authentic job photographs, no stock imagery | Site-wide |
| One genuine matched before/after pair, shown side by side | Homepage |
| Legal transparency trio (Privacy / Terms / Accessibility) | Footer |
| WCAG 2.2 AA accessibility statement | `/accessibility` |
| Explicit "what may require another specialist" list on all 8 services | Service pages |
| GDPR-style analytics consent banner | Site-wide |

**Flagged as placeholder / pending — quote these verbatim in the deck so the client sees the honesty policy working:**

1. **Founder portrait — pending.** Both the homepage founder section and `/about` substitute a real work photo with the caption:
   > "A Redemption cleanout in Southeast Michigan. **Founder portrait to come.**"
   A candidate exists in the client's Drive (`IMG_0421`, hard hat + hi-vis in a truck cab) but the subject is unidentified, so it was **not used**.

2. **Reviews — pending real reviews.** `src/content/testimonials.ts` is an intentionally empty array. `/reviews` and the homepage review section render:
   > Eyebrow: "Being gathered" · H3: **"Authentic reviews are on the way"**
   > "Redemption has been built on referral relationships rather than online reviews. As clients and partners leave them, they'll appear here word-for-word."
   Plus, on the section header: "We publish real reviews from real clients — nothing invented, and no rating we can't substantiate."

3. **Before/after gallery — pending written property-owner permission.** `src/content/projects.ts` is an intentionally empty array. `/projects` renders:
   > **"Before-and-after pairs are being documented"** — "Matched same-angle before and after photos from completed projects will appear here once client permissions are confirmed. We don't publish stock or staged imagery."
   And on the homepage before/after section:
   > "Further matched pairs are documented on site as each project runs, and are published here once the property owner's written permission is confirmed. **We won't substitute stock transformations in the meantime.**"

4. **Company values — pending leadership sign-off.** `/about` carries, in small type below the values list:
   > "These values are drafted from the approved brand guide and are **pending final leadership sign-off**."

5. **Photo library — more coming.** Homepage RecentWork carries:
   > "More project documentation — including matched before-and-after pairs — is **being gathered** and will be published here as client permissions are confirmed."

6. **Accepted / excluded materials — pending.** `/faq`:
   > "Accepted and excluded materials are confirmed operationally and **will be listed here once finalized** … In general, regulated hazardous materials fall outside standard cleanout scope."

7. **Jobber form — pending configuration.** `/request-walkthrough` currently renders:
   > Eyebrow: "Online form being connected" · H3: **"Right now, the fastest way to reach us is directly"**
   > "Our online request form is being connected to our scheduling system. Until it's live, call or text and we'll take the property details and get your walkthrough on the calendar — usually in the same conversation."

8. **Founder-story wording — pending Dante's explicit sign-off** (documented in `src/content/founderStory.ts` and `CONTENT_APPROVALS.md`; not surfaced on the page).

9. **Street address — deliberately withheld.** 429 South Main Street, Rochester, MI 48307 exists only as an internal code comment. It is excluded from the footer, contact page, and `LocalBusiness` schema until leadership confirms permanent operation, staffing during posted hours, customer visitability, permanent signage, and Google Business Profile compliance. **A unit test enforces this.**

10. **"13 vs. 12 years" — open discrepancy.** The site uses **13** throughout, per the brand guide's correction. `CONTENT_APPROVALS.md` records that two client-supplied Drive assets (the brochure `IMG_6796` and a marketing flyer) both say **12**, and notes: "the weight of the client's own material currently favours 12." **This needs a decision before the deck goes out**, since 13 appears in the hero, the founder story, and the `/about` meta description.

11. **Not published anywhere yet:** operating hours, business email, team size, response-time promise, licensing claims, "fully insured" status, free-estimate policy wording, same-day/next-day availability claims.

12. **Donation-partner photography — withheld.** Two genuine frames show a **Grace Centers of Hope** thrift-store truck being loaded. Not used, pending approval from both Dante and Grace Centers of Hope, because publishing them puts a third party's branding on the site and implies a relationship.

### 3.6 Every image asset referenced, by page, with alt-text status

**Brand assets** (`public/images/brand/`):
| File | Used where | Alt text |
|---|---|---|
| `logo-header@4x.png` | Header logo, Footer logo | ✅ `"Redemption Cleanout Services"` (plus `aria-label` on the header link) |
| `logo-header@2x.png` | (in repo, currently unreferenced) | n/a |
| `logo-master.png` | Source for favicon / icons / OG card | n/a |
| `public/images/og/default.png` | Open Graph + Twitter card image, every page | n/a (meta image) |
| `public/favicon-192.png`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico` | Browser/app icons | n/a |

**Photography** — 19 files in `public/images/photos/`, all 3:2 at 1600×1067, progressive JPEG q84, EXIF stripped:

| File | Page / placement | Alt text |
|---|---|---|
| `branded-truck-and-dump-trailer-residential-drive.jpg` | **Homepage hero** (background) | Intentionally `alt=""` + `aria-hidden="true"` — decorative background, correct practice |
| `branded-dump-trailer-curbside.jpg` | `CallToAction` feature background (13 pages) | Intentionally `alt=""` + `aria-hidden="true"` — decorative |
| `branded-truck-dump-trailer-driveway.jpg` | `/about` hero (background) | ✅ Alt supplied in props ("The Redemption truck and dump trailer staged in a residential driveway at the start of a cleanout."); `PageHero` renders the background copy as `alt=""` `aria-hidden` — decorative, correct |
| `metal-recycling-load-dropoff.jpg` | `/projects` hero (background) | ✅ Alt supplied ("A loaded Redemption trailer at a scrap-metal recycling facility during responsible disposal of cleanout material."); rendered decoratively as background |
| `crew-branded-shirts-yard-clearing.jpg` | Homepage Why Redemption proof image | ✅ **"Two Redemption crew members in branded shirts clearing overgrowth from a backyard pergola."** |
| `cleared-garage-bay-after.jpg` | Homepage founder section figure | ✅ **"A Redemption crew member finishing a cleared bay at the end of a cleanout."** |
| `garage-cleanout-crew-sorting-before.jpg` | Homepage before/after — BEFORE | ✅ **"A garage packed to the door line with stored goods, lumber and equipment while the Redemption crew sorts it."** |
| `garage-cleanout-cleared-bay-after.jpg` | Homepage before/after — AFTER | ✅ **"The same garage cleared to bare floor and swept at the end of the cleanout."** |
| `townhouse-patio-cleared-after.jpg` | `/services/move-out-cleanouts` + `/about` founder figure *(the only image used twice)* | ✅ Two distinct alts: "A townhouse patio cleared and swept after a move-out cleanout, ready for the next occupant." / "A cleared and swept patio at the end of a Redemption cleanout." |
| `full-property-cleanout-removal.jpg` | `/services/full-property-cleanouts` (hero bg + proof image), homepage RecentWork lead tile | ✅ "Furniture, mattresses, and bagged household contents staged for removal alongside a home during a full-property cleanout." |
| `estate-cleanout-driveway-staging.jpg` | `/services/estate-cleanouts`, RecentWork, SituationSelector panel | ✅ "Household furniture, shelving, and equipment sorted and staged on a driveway during an estate cleanout." |
| `commercial-forklift-pallet-loading.jpg` | `/services/commercial-cleanouts`, RecentWork | ✅ "A forklift loading shrink-wrapped pallets of office equipment into a Redemption dump trailer during a commercial cleanout." |
| `yard-debris-and-equipment-removal.jpg` | `/services/foreclosure-cleanouts` | ✅ "Derelict mowers, a rusted utility trailer, and bagged debris left behind in the yard of a vacated property." |
| `severe-clutter-living-room-before.jpg` | `/services/hoarding-cleanouts` | ✅ "A living room filled with accumulated household contents and debris before a severe-clutter cleanout." |
| `garage-cleanout-in-progress.jpg` | `/services/residential-junk-removal` | ✅ "Furniture and household items moved out of a garage during a residential cleanout." |
| `light-demolition-deck-removal.jpg` | `/services/light-demolition` | ✅ "A Redemption crew member cutting apart a rotted deck frame with a reciprocating saw during a light demolition job." |
| `severe-clutter-basement-before.jpg` | **Unreferenced** — deliberate spare (alternate severe-clutter frame) | n/a |
| `townhouse-contents-staged-before.jpg` | **Unreferenced** — deliberate spare (the "before" half of the second matched pair) | n/a |
| `pole-barn-cleared-interior.jpg` | **Unreferenced** — deliberate spare (alternate cleared space) | n/a |

**Alt-text coverage verdict: 100% correct.** Every content image has descriptive,
specific alt text. Every decorative background image is correctly marked
`alt=""` + `aria-hidden="true"` — which is the WCAG-correct treatment, not a
missing alt. Verified live: the homepage serves 6 correctly-empty decorative
alts and 8 descriptive ones. There is not a single generic "image" alt anywhere.

**Image caption copy** (each service page's proof image carries one):
- Full-Property: "A full-property cleanout staged for removal — every room, top to bottom."
- Estate: "Contents sorted and staged during an estate cleanout, so nothing leaves before it's reviewed."
- Commercial: "Palletised commercial equipment loaded out — scaled to the site, not to a pickup truck."
- Foreclosure: "A distressed property cleared of everything the previous occupant left behind."
- Hoarding-related: "A severe-clutter room before work begins — scoped in person, handled without judgment."
- Residential Junk Removal: "A garage cleanout in progress — furniture and bulk items cleared in one visit."
- Move-Out: "A unit cleared and swept after a move-out — ready to hand back or list."
- Light Demolition: "A rotted deck cut down and removed — light demolition, scoped to site conditions."

**Photography rationale worth putting in the deck:** the photo library went from
5 images covering ~15 placements (each repeated 2–4×) to **19 images covering
17 placements** — every image appearing exactly once, except one that appears on
two different pages. All 8 services now carry a distinct photo; three previously
had none. Two redactions were applied during curation to satisfy the "nothing
identifying" rule. One client photo was rejected outright: a tight crop on a
trailer's dirty fender, briefly used as the homepage hero, which the client
correctly called out as unprofessional.

**Still missing (asset gaps, not code gaps):** founder portrait of Dante; a
deliberately shot identical-angle before/after pair; Dante with clients or
partners; 5 HEIC files and 12 videos not retrievable through the Drive
connector (it fails above ~6MB — every file ≤5.68MB transferred, every file
≥6.52MB failed, repeatably); the master **vector** logo (the site currently uses
a raster logo derived from a 10264×4532 PNG).

### 3.7 Closing-CTA headline per page (all verbatim)

| Page | CTA headline |
|---|---|
| `/` | Reclaim the property. Then move forward. |
| `/about` | Talk with Dante |
| `/services` | Every property is scoped in person |
| `/services/[slug]` | Ready to scope your {service name, lowercased}? |
| `/who-we-serve` | Discuss a referral partnership |
| `/who-we-serve/[slug]` | {audience CTA label} |
| `/service-areas` | Tell us where the property is |
| `/service-areas/[slug]` | Request a walkthrough in {City} |
| `/how-it-works` | Start with a walkthrough |
| `/projects` | Have a property that needs this kind of work? |
| `/reviews` | Judge us by the walkthrough |
| `/resources` | Have a question a guide didn't answer? |
| `/resources/[slug]` | Ready to talk through your property? |
| `/faq` | Still have a question? |

---

## 4. Technical build work completed

### 4.1 The production-breaking build bug — root cause, reproduction, and fix

**Fix commit:** `0f6da52ad255bf61f8a4fc0a69272c7cb42be106` — *"Fix build crash when NEXT_PUBLIC_SITE_URL is declared but blank"*, 2026-08-21 16:30 UTC.

**The failure, verbatim from the Vercel log recorded in the commit message:**

```
Error: Failed to collect configuration for /_not-found
  [cause]: TypeError: Invalid URL
    at module evaluation (src/app/layout.tsx:16:17)
    code: 'ERR_INVALID_URL', input: ''
```

**Root cause.** `src/app/layout.tsx:16` reads:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  …
```

and `src/content/business.ts` resolved `siteUrl` with `??`:

```ts
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://redemptioncleanoutservices.com";
```

`??` falls back only on `null` / `undefined`. A variable that is **declared but
empty** arrives as `""`, which is neither — so it passes straight through into
`new URL("")`, which throws `ERR_INVALID_URL`. Because this happens at **module
evaluation** of the *root layout*, it takes down **every route on every branch**
before any page renders. Not one page — the entire build.

**How the variable came to be blank.** Vercel's project-import screen offers to
pre-fill environment-variable *keys* it detects from `.env.example`. Accepting
that offer creates keys **with empty values**. `.env.example` in this repo
declares exactly **six** variables:

1. `NEXT_PUBLIC_JOBBER_REQUEST_FORM_URL`
2. `NEXT_PUBLIC_JOBBER_EMBED_URL`
3. `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. `NEXT_PUBLIC_GOOGLE_REVIEW_URL`
5. `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`
6. `NEXT_PUBLIC_SITE_URL`

That is the source of the "six stale environment variables with blank values
left over from initial project import." Five of the six were harmless — every
other consumer already used `?? ""` and degraded gracefully. **Only
`NEXT_PUBLIC_SITE_URL` was fatal**, because it alone feeds `new URL()`.
*(I cannot read the Vercel dashboard from this session, so the current presence
or absence of those six keys in Vercel is **UNVERIFIED** — see §4.2.)*

**Reproduction, exactly as recorded:**
```
unset                    -> builds
NEXT_PUBLIC_SITE_URL=""  -> ERR_INVALID_URL, identical to the Vercel log
```

**The fix.** A new `resolveSiteUrl()` in `src/lib/validation.ts`:

```ts
/** Canonical production origin, used whenever NEXT_PUBLIC_SITE_URL is unusable. */
export const FALLBACK_SITE_URL = "https://redemptioncleanoutservices.com";

export function resolveSiteUrl(value: string | undefined): string {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return FALLBACK_SITE_URL;
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return FALLBACK_SITE_URL;
  }
}
```

and a one-line change in `src/content/business.ts`:

```diff
- export const siteUrl =
-   process.env.NEXT_PUBLIC_SITE_URL ?? "https://redemptioncleanoutservices.com";
+ export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
```

The fix treats **blank, whitespace-only, and unparseable** values as "not
configured" — matching how every other optional variable in the project already
behaves — and strips trailing slashes so canonical URLs can never double up. A
misconfigured URL now degrades visibly (the site renders with canonical
metadata) instead of refusing to build.

**Regression cover.** `tests/unit/resolveSiteUrl.test.ts` — **7 new tests**
locking in exactly this behaviour: unset, blank, whitespace-only, non-URL
garbage, a valid configured origin, trailing-slash stripping, and a
property-style assertion that the return value is *always* something
`new URL()` accepts.

**Verification recorded in the commit:** builds under all four conditions
(unset / blank / garbage / real preview URL); typecheck and lint clean; 31 unit
tests; 14 E2E; 0 axe violations across 14 routes at 390px and 1440px.

**Files changed by the fix:** `src/content/business.ts` (4 lines),
`src/lib/validation.ts` (+28), `tests/unit/resolveSiteUrl.test.ts` (+39, new),
`ENVIRONMENT_VARIABLES.md` (+19), `HANDOFF.md` (+9). **97 insertions,
2 deletions.**

The commit also documents a secondary time-sink: a `networkidle` flake in
`axe-check.mjs` and `shot.mjs`, which intermittently time out on routes that
serve in under 5ms with nothing pending after load.

⚠️ **See §0.1 — this fix is not on `main`.**

### 4.2 Current environment variable configuration

**Required environment variables: ZERO.** Every one of the six is optional, and
the app treats blank identically to missing. Verified behaviour:

| Variable | Unset behaviour | Verified |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Falls back to `https://redemptioncleanoutservices.com` via `resolveSiteUrl()` | ✅ Live canonical tags read `https://redemptioncleanoutservices.com…`, and the live sitemap emits apex URLs — so it is currently **unset in Vercel** |
| `NEXT_PUBLIC_JOBBER_EMBED_URL` | `/request-walkthrough` renders the honest "Online form being connected" panel with working Call/Text buttons — **never a form that looks functional but isn't** | ✅ Confirmed on the live site |
| `NEXT_PUBLIC_JOBBER_REQUEST_FORM_URL` | "Open in a new tab" fallback link is simply omitted | ✅ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `Analytics` returns `null`; **no GA script loads at all**. Analytics also require the consent banner to be accepted, so it is gated twice | ✅ Confirmed — no gtag on the live page |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | "View Google Reviews" button is omitted from the reviews empty state | ✅ |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` | Reserved; not yet wired to a component | ✅ |

**Confirmed:** the booking form falls back to call/text, and analytics stays off
when unset. Exactly as the briefing states.

**No server-only secrets exist in this project** — there is no server-side
database and no third-party API key. Jobber owns lead storage; GA needs only a
public measurement ID. All six variables are `NEXT_PUBLIC_`.

**UNVERIFIED:** whether the six blank keys were actually deleted from the Vercel
project, or merely superseded by the code fix. I cannot read Vercel project
settings from this session. What I *can* confirm from the live site is that
`NEXT_PUBLIC_SITE_URL` is effectively unset or blank (canonicals use the
fallback) and that the build succeeds either way.

### 4.3 Build toolchain

| Item | Value |
|---|---|
| Package manager | **npm** (`package-lock.json` committed; `npm ci` reproducible) |
| Build command | `npm run build` → `next build` |
| Bundler | **Turbopack** — confirmed in build output: `▲ Next.js 16.3.1 (Turbopack)`. Default for Next 16; not explicitly configured |
| Build time (clean, verified) | Compile 7.1s · TypeScript 4.5s · 41 static pages in 739ms |
| Dev | `npm run dev` → `next dev` |
| Lint | `npm run lint` → `eslint .` (flat config, `eslint-config-next` 16.3.1) |
| Typecheck | `npm run typecheck` → `tsc --noEmit` |
| Unit tests | `npm run test` → `vitest run` |
| E2E | `npm run e2e` → `playwright test` |
| Format | `npm run format` → `prettier --write .` with `prettier-plugin-tailwindcss` |
| Deploy config | **None.** No `vercel.json`. Next.js is auto-detected by Vercel; no build overrides needed |

**`next.config.mjs` custom behaviour** — this is the file that Vercel's build
pipeline reports running as its `modifyConfig` step (`✓ Running next.config.mjs took 18ms`):

1. **Environment detection:** `const isPreview = process.env.VERCEL_ENV === "preview"`
2. **`reactStrictMode: true`**
3. **Image formats:** `["image/avif", "image/webp"]`
4. **Six security headers on every route** (`source: "/:path*"`) — all verified live:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
   - A **full Content-Security-Policy** (verified live, byte-for-byte):
     ```
     default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com
     https://www.google-analytics.com; style-src 'self' 'unsafe-inline'
     https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
     img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com
     https://*.getjobber.com; frame-src 'self' https://*.getjobber.com
     https://clienthub.getjobber.com; form-action 'self' https://*.getjobber.com;
     base-uri 'self'; object-src 'none'
     ```
   - **Preview only:** `X-Robots-Tag: noindex, nofollow` — verified present on the live domain today, which is how §0.2 was diagnosed.

**Fonts:** loaded via `next/font/google` with `display: "swap"` and CSS
variables — **Oswald** (500/600/700, display), **PT Sans Narrow** (400/700,
condensed), **Source Sans 3** (400/600/700, body). Self-hosted by Next at build
time. **Bison Bold is deliberately not used — it is unlicensed**, and Oswald is
the brand guide's own recommended commercially-safe substitute.

**Design tokens** (`tailwind.config.ts`) — a complete centralized token system:
6 brand colours (`redemption-red #C32C26`, `restoration-red-dark #A91E23`,
`heritage-black #0B0D0E`, `clean-white #FFFFFF`, `steel-gray #605F5D`,
`warm-concrete #E5E1DE`), 3 font families, an 8-step fluid `clamp()` type scale
(hero ranges 40px→110px), 3 max-width measures, a `clamp()` section rhythm,
2 shadows, a custom `editorial` cubic-bezier easing, 3 named durations, and 3
named aspect ratios. Border radius is deliberately near-zero (`sm: 2px`).

**Motion system:** custom, **no animation library**. `MotionGate` sets
`html.motion-ready` in a blocking inline script *before first paint*, and only
when JS runs and `prefers-reduced-motion` is not set. Every hidden state is
scoped to that class — so with JS disabled or reduced motion on, **all content
renders visible**. `Reveal` supports `default`, `lines`, and `mask` variants.

**Custom tooling in the repo:** `rebuild.sh` (clean rebuild + restart, verifies
the CSS byte count to catch a known stale-chunk failure mode), `axe-check.mjs`
(WCAG 2.2 AA sweep), `shot.mjs` (multi-width screenshots with
horizontal-overflow warnings).

### 4.4 Test suite

**31 unit tests across 8 files (all passing, verified):**
`FAQAccordion.test.tsx`, `JobberRequestForm.test.tsx`,
`SituationSelector.test.tsx`, `analytics.test.ts`, `business.test.ts`,
`content-integrity.test.ts`, `structuredData.test.ts`,
`resolveSiteUrl.test.ts`.

Notable: `business.test.ts` and `structuredData.test.ts` **enforce the address
safety rule as a test** — the street address cannot leak into the footer,
contact page, or `LocalBusiness` schema while `publicAddressEnabled` is `false`.
`content-integrity.test.ts` guards the content layer's internal consistency.

**14 E2E tests across 5 Playwright specs:** `before-after.spec.ts`,
`mobile.spec.ts`, `navigation.spec.ts`, `request-walkthrough.spec.ts`,
`seo.spec.ts`. *(Not re-run during the preparation of this document — the
sandbox's pre-installed Chromium version does not match the
`@playwright/test` 1.62.1 pin. Recorded as passing at `0f6da52`.)*

---

## 5. Technical SEO audit — verified against the current code and the live site

### 5.1 Title tags — all 34 pages

Root template: `%s | Redemption Cleanout Services`. Homepage uses an explicit
override rather than the template. All verified live.

| Page | Rendered `<title>` | Chars |
|---|---|---|
| `/` | Redemption Cleanout Services \| Full-Property Cleanouts in Rochester, MI | 71 |
| `/services` | Property Cleanout Services \| Redemption Cleanout Services | 57 |
| `/services/full-property-cleanouts` | Full-Property Cleanouts \| Redemption Cleanout Services | 54 |
| `/services/estate-cleanouts` | Estate and Inherited-Property Cleanouts \| Redemption Cleanout Services | 70 |
| `/services/commercial-cleanouts` | Commercial Property Cleanouts \| Redemption Cleanout Services | 60 |
| `/services/foreclosure-cleanouts` | Foreclosure and Distressed-Property Cleanouts \| Redemption Cleanout Services | 76 |
| `/services/hoarding-cleanouts` | Hoarding-Related Cleanouts \| Redemption Cleanout Services | 57 |
| `/services/residential-junk-removal` | Residential Junk Removal \| Redemption Cleanout Services | 55 |
| `/services/move-out-cleanouts` | Move-Out and Downsizing Cleanouts \| Redemption Cleanout Services | 64 |
| `/services/light-demolition` | Light Demolition and Site Preparation \| Redemption Cleanout Services | 68 |
| `/who-we-serve` | Who We Serve \| Redemption Cleanout Services | 43 |
| `/who-we-serve/homeowners-and-families` | Homeowners and Families \| Redemption Cleanout Services | 54 |
| `/who-we-serve/realtors` | Realtors and Brokers \| Redemption Cleanout Services | 51 |
| `/who-we-serve/estate-professionals` | Estate-Sale and Probate Professionals \| Redemption Cleanout Services | 68 |
| `/who-we-serve/property-managers` | Property Managers and Landlords \| Redemption Cleanout Services | 62 |
| `/who-we-serve/investors` | Investors and House Flippers \| Redemption Cleanout Services | 59 |
| `/who-we-serve/commercial` | Commercial Property Professionals \| Redemption Cleanout Services | 64 |
| `/service-areas` | Service Areas \| Redemption Cleanout Services | 44 |
| `/service-areas/rochester-mi` | Rochester, MI Property Cleanouts \| Redemption Cleanout Services | 63 |
| `/service-areas/rochester-hills-mi` | Rochester Hills, MI Property Cleanouts \| Redemption Cleanout Services | 69 |
| `/how-it-works` | How It Works \| Redemption Cleanout Services | 43 |
| `/about` | About Redemption & Our Founder \| Redemption Cleanout Services | 60 |
| `/projects` | Project Gallery \| Redemption Cleanout Services | 46 |
| `/reviews` | Reviews \| Redemption Cleanout Services | 38 |
| `/resources` | Resources & Guides \| Redemption Cleanout Services | 49 |
| `/resources/estate-cleanout-checklist` | Estate Cleanout Checklist: What to Handle, and in What Order \| Redemption Cleanout Services | 90 ⚠️ |
| `/resources/preparing-for-a-property-cleanout` | Preparing for a Property Cleanout: What to Know Before the Walkthrough \| Redemption Cleanout Services | 100 ⚠️ |
| `/resources/how-property-cleanout-pricing-works` | How Property Cleanout Pricing Actually Works \| Redemption Cleanout Services | 74 |
| `/faq` | Frequently Asked Questions \| Redemption Cleanout Services | 57 |
| `/request-walkthrough` | Request a Property Walkthrough \| Redemption Cleanout Services | 61 |
| `/contact` | Contact Us \| Redemption Cleanout Services | 41 |
| `/privacy` | Privacy Policy \| Redemption Cleanout Services | 45 |
| `/terms` | Terms & Website-Use Notice \| Redemption Cleanout Services | 57 |
| `/accessibility` | Accessibility Statement \| Redemption Cleanout Services | 54 |

⚠️ **Fixed — see §11.2.** All three resource titles previously exceeded the
~60-character SERP display width (90, 100 and 74 characters). They now render
at **56, 64 and 66** via a separate `seoTitle` field, so the editorial H1 is
unchanged and the keyword is front-loaded. 64 and 66 may still clip the brand
suffix on narrow SERPs; that is the correct trade, since the keyword survives.

### 5.2 Meta descriptions — all unique, all hand-written

Every page has a unique, non-templated description via `pageMetadata()`. No
duplicates. Selected verbatim examples:

- **`/`** (155 chars, and also the root fallback): "Complete residential and commercial property cleanouts for estates, inherited homes, distressed properties, severe clutter, and time-sensitive real-estate transitions in Rochester, Michigan."
- **`/services`**: "Full-property cleanouts, estate and inherited-property cleanouts, commercial cleanouts, foreclosure cleanouts, hoarding-related cleanouts, junk removal, move-out cleanouts, and light demolition in Rochester, Michigan."
- **`/services/full-property-cleanouts`**: "Complete full-property cleanouts in Rochester, Rochester Hills, and Oakland County — every room, garage, basement, attic, and outbuilding cleared and left ready for what's next."
- **`/services/estate-cleanouts`**: "Judgment-free estate and inherited-property cleanouts for families, executors, and out-of-state heirs across Rochester and Oakland County, Michigan."
- **`/services/commercial-cleanouts`**: "Commercial cleanouts for offices, retail, and warehouse space in Rochester, Rochester Hills, and Oakland County — scheduled around your operating hours."
- **`/services/foreclosure-cleanouts`**: "Foreclosure and distressed-property cleanouts for banks, asset managers, investors, and foreclosure companies across Rochester and Oakland County, Michigan."
- **`/services/hoarding-cleanouts`**: "Judgment-free, severe-clutter and hoarding-related cleanouts in Rochester and Oakland County, Michigan — handled with respect, privacy, and a clear plan."
- **`/services/residential-junk-removal`**: "Residential junk removal for garages, basements, attics, and single-room cleanouts in Rochester and Rochester Hills, Michigan."
- **`/services/move-out-cleanouts`**: "Move-out and downsizing cleanouts for homeowners, renters, and families relocating or transitioning to senior living in Rochester and Oakland County, Michigan."
- **`/services/light-demolition`**: "Light demolition and site preparation — interior tear-outs and small-scale demolition — in Rochester and Oakland County, Michigan. Scope subject to site conditions and approval."
- **`/who-we-serve`**: "Redemption Cleanout Services works with homeowners and families, realtors, estate-sale and probate professionals, property managers, investors, and commercial property professionals across Rochester, Michigan."
- **`/who-we-serve/realtors`**: "A reliable cleanout partner for Rochester-area realtors and brokers — fast walkthroughs, clear communication, and listings ready on schedule."
- **`/who-we-serve/estate-professionals`**: "Cleanout support for estate-sale companies and probate attorneys managing property transitions in Rochester and Oakland County, Michigan."
- **`/who-we-serve/property-managers`**: "Fast, reliable cleanout support for property managers and landlords after tenant move-outs and abandoned units in Rochester and Oakland County, Michigan."
- **`/who-we-serve/investors`**: "Fast, repeatable property cleanouts for investors and house flippers working on tight renovation timelines in Rochester and Oakland County, Michigan."
- **`/who-we-serve/commercial`**: "Commercial cleanout support for property owners, brokers, and tenants across Rochester and Oakland County, Michigan — scheduled around your operations."
- **`/who-we-serve/homeowners-and-families`**: "Judgment-free property cleanouts for homeowners and families in Rochester, Michigan — estate transitions, downsizing, severe clutter, and pre-sale prep."
- **`/service-areas`**: "Redemption Cleanout Services serves Rochester, Rochester Hills, Oakland County, and approved surrounding Southeast Michigan communities."
- **`/service-areas/rochester-mi`**: "Full-property, estate, and commercial cleanouts in Rochester, Michigan — on-site walkthroughs and a crew that understands local real estate timelines."
- **`/service-areas/rochester-hills-mi`**: "Full-property, estate, and commercial cleanouts in Rochester Hills, Michigan — on-site walkthroughs and dependable scheduling for homeowners and professionals."
- **`/how-it-works`**: "How a Redemption Cleanout Services project works, from your first call to a final walkthrough — on-site quoting, clear scope, and a dependable crew."
- **`/about`**: "The story behind Redemption Cleanout Services and founder Dante Terracciano — 13 years of real-estate experience, a family background in home building, and a purpose-driven approach to property cleanouts in Rochester, Michigan."
- **`/projects`**: "Authentic project documentation from Redemption Cleanout Services in Rochester, Michigan — real properties, no stock imagery."
- **`/reviews`**: "Authentic reviews for Redemption Cleanout Services in Rochester, Michigan."
- **`/resources`**: "Educational guides on estate cleanouts, preparing for a property cleanout, and how cleanout pricing works, from Redemption Cleanout Services."
- **`/faq`**: "Answers to common questions about Redemption Cleanout Services: quoting, scheduling, service areas, what we handle, and how we work with sensitive situations."
- **`/request-walkthrough`**: "Request a property walkthrough with Redemption Cleanout Services in Rochester, Michigan — or call or text (248) 321-9609 directly."
- **`/contact`**: "Contact Redemption Cleanout Services in Rochester, Michigan — call, text, or request a property walkthrough."
- **`/privacy`** / **`/terms`** / **`/accessibility`**: short, page-specific descriptions.

Local modifiers (Rochester MI, Rochester Hills MI, Oakland County, Southeast
Michigan) are woven in naturally across the set — not stuffed.

### 5.3 Heading structure — verified live, page by page

**Exactly one `<h1>` on every one of the 18 pages I fetched and counted.** No
missing H1, no duplicate H1, no skipped levels observed.

| Page | H1 | H2 | H3 |
|---|---|---|---|
| `/` | 1 | 12 | 31 |
| `/about` | 1 | 3 | 0 |
| `/services` | 1 | 7 | 3 |
| `/services/estate-cleanouts` | 1 | 5 | 8 |
| `/who-we-serve` | 1 | 3 | 5 |
| `/who-we-serve/realtors` | 1 | 3 | 5 |
| `/service-areas/rochester-mi` | 1 | 3 | 6 |
| `/how-it-works` | 1 | 2 | 5 |
| `/projects` | 1 | 3 | 4 |
| `/reviews` | 1 | 2 | 1 |
| `/resources` | 1 | 4 | 0 |
| `/resources/estate-cleanout-checklist` | 1 | 5 | 0 |
| `/faq` | 1 | 6 | 11 |
| `/request-walkthrough` | 1 | 1 | 5 |
| `/contact` | 1 | 5 | 0 | *(was 0 H2 — fixed, §11.2)*
| `/privacy` | 1 | 4 | 0 |
| `/terms` | 1 | 4 | 0 |
| `/accessibility` | 1 | 0 | 0 |

Structurally, `PageHero` always renders the `<h1>`; `SectionHeader` and section
components render `<h2>`; service cards, FAQ questions, and process steps render
`<h3>`. The homepage `<h1>` splits across two `<span class="block">` children
for the line-reveal animation while remaining a single semantic H1:

```html
<h1 class="mt-7 text-hero font-bold">
  <span class="block">Clear the Property.</span>
  <span class="block text-clean-white/95">Reclaim What Comes Next.</span>
</h1>
```

`/accessibility` has zero H2s, which is legitimate for a two-paragraph
statement. `/contact` also had zero and now has **five** — its Call / Text /
Online / Instagram / Where-we-work labels were promoted to real H2s (§11.2).

### 5.4 Canonical tag configuration

Set on **every** page by `pageMetadata()` via `alternates: { canonical: url }`,
built from `absoluteUrl(path)` — i.e. `${siteUrl}${path}`. `metadataBase` is
`new URL(siteUrl)` in the root layout.

**Verified live on the homepage:**
```html
<link rel="canonical" href="https://redemptioncleanoutservices.com"/>
```

Canonicals point at the **apex domain** `https://redemptioncleanoutservices.com`
— which is correct as the intended production identity. Note the live site
currently *serves* from `www.` (apex 307-redirects to www), so the served host
and the canonical host differ. That is normal and harmless as long as the apex
is set as the primary domain in Vercel, but it is worth confirming: today the
apex `307`s **to** www, which is the *opposite* of the "apex primary, www
redirects to it" configuration `HANDOFF.md` and `DEPLOYMENT.md` specify. **This
is a real, fixable inconsistency**, and it is the second-highest-value SEO fix
after §0.2.

### 5.5 Open Graph / Twitter Card metadata

Applied on **every** page by `pageMetadata()`. Verified live on the homepage,
byte-for-byte:

```html
<meta property="og:title" content="Redemption Cleanout Services | Full-Property Cleanouts in Rochester, MI"/>
<meta property="og:description" content="Complete residential and commercial property cleanouts for estates, inherited homes, distressed properties, severe clutter, and time-sensitive real-estate transitions in Rochester, Michigan."/>
<meta property="og:url" content="https://redemptioncleanoutservices.com"/>
<meta property="og:site_name" content="Redemption Cleanout Services"/>
<meta property="og:locale" content="en_US"/>
<meta property="og:image" content="https://redemptioncleanoutservices.com/images/og/default.png"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Redemption Cleanout Services | Full-Property Cleanouts in Rochester, MI"/>
<meta name="twitter:description" content="Complete residential and commercial property cleanouts…"/>
<meta name="twitter:image" content="https://redemptioncleanoutservices.com/images/og/default.png"/>
```

**Complete.** Present on all 34 pages, with per-page title and description.
`og:image:width`, `og:image:height` and `og:image:alt` were missing and have
been **added — see §11.2**. The OG image remains a single shared 1200×630 card
generated from the raster master logo rather than per-page imagery; that stays
open, pending the vector logo.

### 5.6 Structured data (JSON-LD) — **already implemented, and thorough**

This is the largest correction to the briefing. `src/lib/structuredData.ts`
provides seven schema generators, wired into every route. **Verified live** —
the homepage serves `LocalBusiness`, `WebSite`, `WebPage`, and a nested
`PostalAddress`.

| Schema type | Where emitted |
|---|---|
| **`LocalBusiness`** | Root layout — every page. Includes `name`, `url`, `telephone`, `slogan`, `areaServed`, `sameAs` (Instagram), and a `PostalAddress` |
| **`WebSite`** | Root layout — every page |
| **`WebPage`** | Homepage (and available for any page) |
| **`BreadcrumbList`** | Every page except the homepage (33 pages) |
| **`Service`** | All 8 service detail pages, with `serviceType`, `description`, `provider` (nested `LocalBusiness`), `areaServed`, `url` |
| **`FAQPage`** | All 8 service pages, all 6 audience pages, both service-area pages, and `/faq` — **17 pages** |
| **`Article`** | All 3 resource pages, with `headline`, `datePublished`, `author` |

**Two deliberate, principled omissions:**
1. **`streetAddress` is omitted from `PostalAddress`** while
   `publicAddressEnabled` is `false` — the schema emits only
   `addressLocality: "Rochester"`, `addressRegion: "MI"`,
   `addressCountry: "US"`. There is a source comment explicitly forbidding
   including it "for completeness" or as an approximate value, and a unit test
   enforces it.
2. **No `AggregateRating` and no `Review` schema anywhere** — because no
   authentic first-party rating data exists yet. Fabricating rating markup is
   both a policy violation and a Google manual-action risk.

**Remaining structured-data opportunities** (genuine additions, not fixes):
`openingHoursSpecification` (blocked on operating hours being approved),
`geo` coordinates, `priceRange`, `image` on `LocalBusiness`, and `HowTo` schema
on `/how-it-works`. All are small additions to an already-solid foundation.

### 5.7 Image alt-text coverage

See §3.6 for the full per-file table. **Verdict: complete and correct.** Every
content image carries specific, descriptive alt text; every decorative
background image is correctly `alt=""` + `aria-hidden="true"`. Zero generic
alts. Lighthouse accessibility scored **100** on all five pages I audited, and
the recorded axe sweep found **0 violations across 14 routes at 390px and
1440px**.

### 5.8 robots.txt and sitemap.xml

**Both exist as dynamic Next.js route handlers** — not static files.

**`src/app/robots.ts`:**
```ts
if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
return {
  rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
  sitemap: `${siteUrl}/sitemap.xml`,
};
```
**Live output today (Preview environment):**
```
User-Agent: *
Disallow: /
```
⚠️ See §0.2. In Production this becomes `Allow: /`, `Disallow: /api/`, plus the
`Sitemap:` line.

**`src/app/sitemap.ts`** — generated from the content layer, so it can never
drift from the routes. **34 URLs**, each with a `lastModified` timestamp:
15 static + 8 services + 6 audiences + 2 approved areas + 3 resources.
Verified live:
```xml
<url><loc>https://redemptioncleanoutservices.com</loc><lastmod>2026-08-21T16:30:52.487Z</lastmod></url>
<url><loc>https://redemptioncleanoutservices.com/services</loc>…
```
Note the `lastModified` timestamp is **build time** (`new Date()`), so every URL
shares one timestamp and it refreshes on every deploy. Acceptable; per-page
content dates would be marginally better.

Also note: only **approved** service areas reach the sitemap. That gating is
deliberate anti-doorway-page discipline.

### 5.9 Mobile viewport

Next.js emits the default, verified live:
```html
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```
No `maximum-scale` and no `user-scalable=no` — pinch-zoom is preserved, which is
a WCAG requirement. **Correct.** There is no `viewport` export in the code, so
this is the framework default, which is the right one.

Responsive verification recorded: **no horizontal overflow at 390 / 768 / 1024 /
1440 / 1920px**, and a dedicated `mobile.spec.ts` E2E test. `shot.mjs` prints a
warning for any horizontal overflow it detects.

### 5.10 Additional SEO strengths worth putting in the deck

- **`SEO_MAP.md`** maps one primary transactional keyword per page — 19 mapped pages, from `full property cleanout` to `probate property cleanout`. This is a documented keyword architecture, not incidental copy.
- **Internal linking is dense and crawlable.** The footer alone exposes all 8 services, all 6 audiences, both areas, and 7 secondary pages on every page. Each service page links 3 related services; each audience page links up to 4 relevant services; each area page links 4.
- **Breadcrumbs are rendered visually AND as `BreadcrumbList` JSON-LD** on all 33 non-home pages.
- **Every page is statically prerendered** — no server latency, no hydration blocking, ideal for crawl budget.
- **HSTS is set:** `strict-transport-security: max-age=63072000` (2 years), verified live.
- **`x-vercel-cache: HIT`** verified live — edge caching is working.
- **Anti-doorway-page discipline is codified**, not just intended: `SEO_MAP.md` has a "Deliberately NOT built" section naming doorway pages, fake office claims, and invented reviews/ratings as out of bounds.

---

## 6. Deployment and infrastructure

**Important framing for the deck: the repository's own documentation
(`HANDOFF.md` §6, `DEPLOYMENT.md`) still says "Not deployed" and describes
deployment as a future step.** The deployment work described in the briefing
therefore left no trace in the codebase. I verified what I could **externally,
against live DNS and live HTTP**, on 2026-08-21. Everything I could not reach is
marked UNVERIFIED.

### 6.1 What I verified independently — live, today

**DNS (verified by resolver lookup):**
```
redemptioncleanoutservices.com        →  216.198.79.1
www.redemptioncleanoutservices.com    →  CNAME b7133d05a2e59a37.vercel-dns-017.com
                                          → 216.198.79.1, 64.29.17.1
```
✅ The apex `A` record is **exactly `216.198.79.1`**, matching the briefing.
✅ The `www` `CNAME` points at a **Vercel-provided target**
(`b7133d05a2e59a37.vercel-dns-017.com`), matching the briefing.
✅ No trace of a GoDaddy WebsiteBuilder A record or a self-referencing `www`
CNAME remains — those conflicts are resolved.

**HTTP / TLS (verified by request):**
```
GET https://redemptioncleanoutservices.com/
  → HTTP/2 307, location: https://www.redemptioncleanoutservices.com/
GET https://www.redemptioncleanoutservices.com/
  → HTTP/2 200
     server: Vercel
     x-vercel-cache: HIT
     x-vercel-id: iad1::7rf44-…
     strict-transport-security: max-age=63072000
     x-robots-tag: noindex, nofollow
     content-security-policy: [full policy, matches next.config.mjs]
```

✅ **Hosted on Vercel** — confirmed by `server: Vercel` and `x-vercel-id`.
✅ **SSL certificate is issued and valid.** `curl`'s `ssl_verify_result` returned
`0` (success) on both hosts, over HTTPS, with no certificate warnings. **The
certificate is no longer "generating" — it is live and trusted as of my check.**
✅ **Publicly reachable with no login.** Full 200 HTML, no `_vercel/sso`
redirect, no "Authentication Required" interstitial. This independently confirms
**Vercel Authentication (Deployment Protection) is disabled** for this project.
✅ Serving a **Preview** environment — proven by the `X-Robots-Tag` header,
which `next.config.mjs` only emits when `VERCEL_ENV === "preview"`.

**Deployed commit — verified by content fingerprint.** The live homepage hero
serves `/images/photos/branded-truck-and-dump-trailer-residential-drive.jpg`.
That file **does not exist on `main`** — it was added in `913e1b1`, which is only
on `claude/redemption-cleanout-services-51t9af`. The live site also serves
`commercial-forklift-pallet-loading.jpg`, `crew-branded-shirts-yard-clearing.jpg`,
`garage-cleanout-crew-sorting-before.jpg`, and
`garage-cleanout-cleared-bay-after.jpg` — all `0f6da52`-only assets. **This
confirms the deployed build is from the `51t9af` branch line at `0f6da52`, not
from `main`.** The homepage `<h1>` reads exactly "Clear the Property." /
"Reclaim What Comes Next.", matching the source at `0f6da52`.

### 6.2 What the briefing states, cross-referenced

| Briefing claim | Status |
|---|---|
| Vercel project connected to GitHub | ✅ Consistent with everything observed; **the specific connection mechanism (GitHub App vs. manual) is UNVERIFIED** |
| Vercel project name | ❌ **UNVERIFIED** — not in the repo; Vercel metadata not readable here |
| Vercel team = Living Water Network | ❌ **UNVERIFIED** from code or live headers |
| Branch `claude/redemption-cleanout-services-51t9af`, commit `0f6da52` | ✅ **Verified** — branch and commit both exist on the remote; `0f6da52` is its HEAD |
| That commit builds successfully | ✅ **Verified independently** — clean `npm ci` + `npm run build` reproduced: 41/41 pages, TypeScript clean |
| That commit is publicly reachable | ✅ **Verified** — 200, no auth |
| Both apex and `www` connected in Vercel | ✅ **Verified via DNS + a working 307 + 200 chain** |
| Pointed at Preview, not Production, because `main` does not build | ✅ **Verified as to Preview** (see the `X-Robots-Tag` proof). And the *reason* is confirmed by code: **`main` genuinely still carries the vulnerable `??`** — see §0.1 |
| DNS at GoDaddy: `@` → `216.198.79.1`, `www` → Vercel target | ✅ **Verified exactly** |
| Replaced a conflicting GoDaddy "WebsiteBuilder" A record and a self-referencing `www` CNAME | ✅ **Consistent** — neither remains. The prior existence of those records is **UNVERIFIED** (no DNS history available to me) |
| Vercel Authentication disabled | ✅ **Verified by behaviour** — the site loads with no login |
| SSL still generating | 🔄 **Now resolved.** As of my check the certificate is issued and validates cleanly on both hosts |

### 6.3 Deployment Protection — plain statement of current state and tradeoff

**Current state (verified): Vercel Authentication is OFF for this project.**
Client-facing preview access was the priority, and it works — anyone with the
URL can view the site without a Vercel account.

**The tradeoff, stated plainly: this setting is project-wide, not per-deployment.
Every preview deployment on this project is now publicly reachable without a
login** — including any future branch preview, any half-finished redesign, and
any deploy containing content that has not yet been approved. Given that this
project's content policy explicitly withholds unapproved material (the street
address, the "fully insured" claim, the founder story pending sign-off, the
Grace Centers of Hope photography), that is a real exposure surface, not a
theoretical one.

Two things partially mitigate it: preview URLs are unguessable hashes, and
`X-Robots-Tag: noindex, nofollow` plus `robots.txt Disallow: /` prevent search
engines from indexing previews. Neither prevents a shared link from spreading.

**Recommended resolution:** merge `0f6da52` into `main` (§0.1), promote the
domain to **Production**, then re-enable Vercel Authentication for Preview
deployments only. That restores preview privacy *and* fixes the `noindex`
problem (§0.2) in one move.

### 6.4 Documented deployment procedure already in the repo

`DEPLOYMENT.md` and `HANDOFF.md` §6 contain a full step-by-step cutover with
rollback. Its most important safety instruction, worth repeating:

> "**Before touching GoDaddy DNS, export the existing zone.** Then change only
> the apex `@` and the `www` CNAME. Leave every MX / SPF / DKIM / DMARC /
> verification record alone or Redemption's email breaks."

⚠️ **Open item: email deliverability was not verified by me.** I cannot check MX
/ SPF / DKIM / DMARC records from this session. `DEPLOYMENT.md` step 6 says
"Test email after propagation." **Confirm Redemption's email still sends and
receives before the deck goes out** — this is the single highest-consequence
unverified item in this whole document.

---

## 7. Testing and verification performed

### 7.1 Verification I performed for this document (2026-08-21)

| Check | Method | Result |
|---|---|---|
| Clean build at `0f6da52` | `git worktree` at `0f6da52` → `npm ci` → `npm run build` | ✅ 41/41 static pages, compile 7.1s, TypeScript clean |
| Unit tests at `0f6da52` | `npm test` | ✅ **8 files, 31 tests, all passing** |
| Homepage headline | Fetched live HTML, grepped `<h1>` | ✅ `Clear the Property.` / `Reclaim What Comes Next.` |
| `/services/estate-cleanouts` | Fetched live | ✅ Title, H1 "Estate and Inherited-Property Cleanouts", 5 H2s, 8 H3s |
| `/about` | Fetched live | ✅ H1 "The name is not decoration. It is the strategy." |
| `/projects` | Fetched live | ✅ H1 "Documented work, not a stock gallery" |
| Branding on live site | Live HTML | ✅ Logo alt "Redemption Cleanout Services"; tagline "Redeem Your Property. Reclaim Your Space."; phone `(248) 321-9609` throughout |
| Rendering photos | Live HTML, enumerated all `/_next/image` sources | ✅ 12 distinct optimized images on the homepage alone, all `0f6da52` assets |
| Deployed commit = intended source commit | Content fingerprint (§6.1) — 5 assets that exist only at `0f6da52` | ✅ Confirmed |
| Accessible without a Vercel account | `curl` with no cookies/credentials | ✅ Full 200 HTML, no SSO redirect |
| SSL certificate | `curl` TLS verification on both hosts | ✅ Valid, `ssl_verify_result=0` |
| DNS records | Resolver lookup, apex and `www` | ✅ Match the briefing exactly |
| Canonical / OG / Twitter / viewport / robots meta | Live HTML | ✅ All present and correct |
| JSON-LD | Live HTML | ✅ `LocalBusiness`, `WebSite`, `WebPage`, `PostalAddress` |
| Security headers | Live response headers | ✅ Full CSP + HSTS + all 4 others |
| `robots.txt` and `sitemap.xml` | Fetched live | ✅ Both serve; robots currently `Disallow: /` (§0.2) |
| Heading hierarchy across 18 pages | Live HTML, counted `<h1>`/`<h2>`/`<h3>` | ✅ Exactly one H1 on every page |
| Alt-text coverage | Live HTML, enumerated every `alt` attribute | ✅ 8 descriptive + 6 correctly-decorative on the homepage |
| Lighthouse, 6 runs | Chromium 1194 headless against a local production build | See §9 |

### 7.2 Verification recorded in the repository at `0f6da52`

| Check | Recorded result |
|---|---|
| Typecheck / lint | Clean |
| Unit tests | 31 passing |
| E2E tests | 14 passing (Playwright) |
| Production build | Passing |
| Accessibility | **0 axe violations**, WCAG 2.2 AA, 14 routes × 390px and 1440px |
| Horizontal overflow | None at 390 / 768 / 1024 / 1440 / 1920px |
| Build under all env conditions | Verified under unset / blank / garbage / real preview URL |
| Lighthouse (local, recorded) | Desktop 100/100/100/100 · Mobile 80 perf, 100 a11y/BP/SEO |

**Not re-run by me:** the 14 Playwright E2E tests and `axe-check.mjs`. Both need
a Playwright-matched browser binary, and this sandbox's pre-installed Chromium
does not match the `@playwright/test` 1.62.1 pin. I substituted Lighthouse
accessibility audits (which scored **100 on all five pages tested**),
corroborating the 0-violations result but not replacing it.

### 7.3 Content gaps found during verification

All three gaps named in the briefing are confirmed present, and all three are
handled with an honest on-page state rather than filler:

1. ✅ **Founder portrait placeholder** — confirmed on both the homepage founder
   section and `/about`. Both substitute a real work photo and caption it
   "Founder portrait to come." A Drive candidate exists but the subject is
   unidentified, so it was not used.
2. ✅ **Before/after gallery pending client photo permissions** — confirmed.
   `projects.ts` is an empty array; `/projects` shows "Before-and-after pairs
   are being documented." The homepage now shows **one genuine matched pair
   side by side** (the garage pair) rather than an "asset needed" panel — an
   improvement over the earlier state. The identical-angle wipe slider
   (`BeforeAfterComparison`) is fully built and turns on automatically the
   moment a verified `projects.ts` entry exists — **no template changes needed.**
3. ✅ **Reviews section pending real reviews** — confirmed. `testimonials.ts` is
   an empty array; both `/reviews` and the homepage render "Authentic reviews
   are on the way."

**Additional gaps I found that were not in the briefing:**

4. ~~`HANDOFF.md` says "Unit tests 24 passing"~~ — **fixed (§11.3)**; now reads 38, matching the suite after the follow-up tests.
5. ~~`IMAGE_REQUIREMENTS.md`'s "Current state" section is stale~~ — **fixed (§11.3)**; it now points to the Phase 3 record and no longer describes deleted components.
6. ~~`UtilityBar.tsx` is dead code~~ — **fixed (§11.3)**. A sweep found **four** unused components (`UtilityBar`, `PhotoPlaceholder`, `ServiceCard`, `ErrorBoundary`); all four are removed.
7. Four typed analytics events are defined but never fired: `view_service`, `view_project`, `click_google_reviews` (fires only when a Google review URL is configured), `download_guide`. Documented as intentional in `ANALYTICS.md` — the underlying content does not exist yet.
8. `jobber_form_submit` will **never** fire: Jobber exposes no client-side event to listen for, and firing on iframe `load` would be a lie. This is a documented, deliberate honesty decision. **It means form-conversion tracking is currently impossible** — worth flagging in the deck, because it affects what can be reported back to the client on lead volume.
9. **The "13 vs. 12 years" discrepancy is unresolved**, and 13 appears in the hero, the founder story, and the `/about` meta description. See §3.5 item 10.
10. `npm audit` shows advisories in **dev-only** tooling (Vitest / Vite / Playwright chains). **Nothing in the production dependency path** — the production path is 4 packages.

---

## 8. Recommended next-phase roadmap

Ordered by value-per-hour. Items 1 and 2 are the highest-leverage actions
available and together take well under an hour.

### Phase 0 — Do these first (they gate everything else)

**0.1 Merge `claude/redemption-cleanout-services-51t9af` into `main`.**
Removes the live risk in §0.1. Without this, `main` cannot be promoted to
Production without reintroducing the build crash. *~10 minutes.*

**0.2 Promote the domain from Preview to Production, then fix the redirect
direction.** This clears the `noindex` header and the `Disallow: /` robots rule
in one move (§0.2) — until it happens, **all SEO work on this site produces
zero organic traffic**, because Google is instructed not to index a single page.
While there, set the **apex as primary with `www` redirecting to it**, matching
the canonical tags and `DEPLOYMENT.md` (today it is reversed — §5.4).
*~15 minutes.*

**0.3 Re-enable Vercel Authentication for Preview deployments** once the domain
is on Production (§6.3), so unapproved content stops being publicly reachable.

**0.4 Verify Redemption's email still works** post-DNS-change (§6.4). Highest
consequence, lowest effort.

**0.5 Submit the sitemap in Google Search Console** — only meaningful after 0.2.

### Phase 1 — City-focused landing page strategy

**The strategy.** One page per target city, written for genuine local search
intent, each funnelling back into the existing contact architecture (**Request a
Walkthrough** / **Call** / **Text Dante**) with no new conversion paths to
build. The template already exists and is production-tested across two cities.

**Suggested first wave:** **Rochester Hills** *(already built and live)*,
**Troy**, **Auburn Hills**. Then Oakland Township, Shelby Township, Sterling
Heights, Birmingham, Bloomfield Hills.

**Mechanically, adding a city is a three-line change** and the architecture does
the rest:
1. Add an entry to `src/content/serviceAreas.ts` with `approved: true`.
2. `generateStaticParams` routes it, `sitemap.ts` includes it, the footer links
   it, the `/service-areas` index lists it, and `FAQPage` + `BreadcrumbList`
   JSON-LD generate automatically.
3. No template work. No new components. **This is why the content-layer
   architecture was worth building — and it is a strong pricing argument: the
   expensive part is already paid for.**

**But the copy is the deliverable, not the routing.** Each entry needs a
genuinely unique `localIntroduction`, `propertyContext`, `metaDescription`, and
city-specific FAQs. `serviceAreas.ts` and `SEO_MAP.md` both explicitly forbid "a
template with the city name swapped," and `SEO_MAP.md` names doorway pages as
out of bounds. The existing Rochester and Rochester Hills entries are the
quality bar: Rochester's copy talks about downtown commercial buildings and
long-held family homes changing hands through inheritance; Rochester Hills' talks
about larger lot sizes, multi-level homes, and growing commercial corridors.
Each new city needs that level of specific local knowledge — which means **an
input session with Dante per city**, not a copywriting exercise in isolation.

Each city page should also cross-link 3–4 relevant services, which the template
already does from `relevantServiceSlugs`.

**Realistic scope:** ~2–3 hours per city (Dante input + copy + review), not
10 minutes. The 10-minute part is the code.

### Phase 2 — Structured data expansion

The `LocalBusiness` / `Service` foundation is **already built** (§5.6). Genuine
additions remaining:
- `openingHoursSpecification` — **blocked** on operating hours being approved
- `geo` coordinates and `priceRange` on `LocalBusiness`
- `image` on `LocalBusiness` (needs the vector logo)
- `HowTo` schema on `/how-it-works` — the 5-step process is already structured data-ready
- Full `PostalAddress` with `streetAddress` — **blocked** on the address approval gate
- `Review` / `AggregateRating` — **blocked** on real reviews, and correctly so

### Phase 3 — Close the remaining content placeholders

In dependency order:
1. **Founder portrait** — confirm whether `IMG_0421` is Dante, or shoot one. Closes two placeholder captions.
2. **Written property-owner permission for the garage and townhouse before/after pairs**, plus city / property type / challenge / outcome from Dante. Populates `projects.ts`, activates the wipe slider on `/projects` and the homepage, and closes the largest remaining proof gap.
3. **Resolve 13 vs. 12 years** with Dante. Affects the hero, founder story, and `/about` meta description.
4. **Jobber embed URL** → activates the primary conversion path. Then verify an end-to-end submission from the live domain.
5. **Google Business Profile** → provides `NEXT_PUBLIC_GOOGLE_REVIEW_URL` and `..._BUSINESS_URL`, which activate the review-generation flow. Do not claim an address the site itself doesn't publish.
6. **GA4 measurement ID** → activates analytics (behind consent).
7. **Confirm "fully insured"**, operating hours, accepted/excluded materials, business email, team size, response-time promise.
8. **Founder-story sign-off** from Dante.
9. **Grace Centers of Hope donation photography** — approval from both Dante and Grace Centers of Hope.
10. **Master vector logo** (AI/EPS/SVG) + the 12-mark logo suite; regenerate favicon, app icons, and the OG card from it.
11. **Pull the 5 remaining HEICs directly from Drive** (bypassing the ~6MB connector limit) and make a hosting decision on the 12 videos (~250MB — they do not belong in git).
12. **Decide on Bison Bold**: buy the commercial license, or formally confirm Oswald as permanent.

### Phase 4 — Verify robots.txt / sitemap.xml behaviour on the production domain

After 0.2, confirm: `robots.txt` returns `Allow: /` with the `Sitemap:` line;
`X-Robots-Tag: noindex` is **gone**; `sitemap.xml` returns all 34 URLs with the
correct host; and the canonical host matches the serving host.

### Phase 5 — Performance and polish

- **Decide the mobile consent-banner question.** It is the mobile LCP element (§9). Making it a narrow card on mobile — as it already is at `sm:` — would likely hand LCP back to the hero. This is a design decision, not metric-gaming.
- Add `og:image:width` / `height` / `alt`; consider per-page OG images.
- Shorten the two over-length resource titles (§5.1).
- Consider promoting `/contact`'s method labels to H2s.
- Remove the dead `UtilityBar` component.
- Refresh the stale sections of `HANDOFF.md` and `IMAGE_REQUIREMENTS.md`.
- Wire `view_service` / `view_project` once the content exists.
- Framework-level perf opportunities Lighthouse identified: legacy JS to modern browsers (~300ms), unused JS (~240ms), render-blocking resources (~150ms).

---

## 9. Grading

### 9.1 Lighthouse — my own runs (Chromium 1194 headless, against a local production build at `0f6da52`)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` desktop | **97** | **100** | **100** | **100** |
| `/` mobile | **93** | **100** | **100** | **100** |
| `/services/estate-cleanouts` desktop | **99** | **100** | **100** | **100** |
| `/about` desktop | **99** | **100** | **100** | **100** |
| `/projects` desktop | **98** | **100** | **100** | **100** |
| `/request-walkthrough` desktop | **100** | **100** | **100** | **100** |

**Core Web Vitals — homepage:**

| Metric | Desktop | Mobile |
|---|---|---|
| First Contentful Paint | **0.3s** | **1.0s** |
| Largest Contentful Paint | **1.1s** | **3.2s** |
| Total Blocking Time | **10ms** | **50ms** |
| Cumulative Layout Shift | **0** | **0** |
| Speed Index | **1.4s** | **1.4s** |
| Time to Interactive | 1.1s | 3.4s |

**Desktop LCP element:** the hero image — correct.
**Mobile LCP element:** `<p class="text-sm text-heritage-black">` — the consent
banner paragraph. **Independently reproduced**, confirming the diagnosis
recorded in commit `dabea84`.

**Note on variance.** Commit `dabea84` recorded mobile performance at **80**;
my run measured **93**, and desktop at **97** vs. the recorded **100**. Both
runs were local production builds under CPU/network emulation, so scores move
with machine load. **Report the range, not a single number: desktop 97–100,
mobile 80–93.** Neither figure comes from the live Vercel deployment — the
agent proxy in this environment blocked Lighthouse from loading the live URL
(Chrome interstitial), so a production measurement with CDN, Brotli, and edge
caching is still outstanding and should be **better** than these numbers, since
hydration starts sooner.

**The mobile-performance story, stated fairly:** mobile LCP is measuring "time
until the consent banner hydrates," not time-to-useful. `ConsentBanner` renders
`null` server-side and only appears after hydration plus a `useEffect`
`localStorage` read; because it is full-bleed on mobile (`inset-x-0 bottom-0`)
versus a `max-w-sm` card at `sm:`, it becomes the largest contentful element in
the viewport. FCP is 1.0s and **CLS is a clean 0**. Related: `Reveal` elements
start at `opacity: 0`, and opacity-0 elements are not LCP candidates — that is
the deliberate cost of the reveal choreography, not a bug.

### 9.2 Full business-relevant grading

| Area | Grade | Evidence |
|---|---|---|
| **Accessibility** | **A+** | 100 Lighthouse on all 5 pages audited. 0 axe violations across 14 routes × 2 widths (recorded). WCAG 2.2 AA targeted and documented. Skip link; semantic landmarks; correct `aria-*` on every interactive control; real tablist with arrow-key support; 56px mobile touch targets; motion degrades to nothing with JS off or reduced-motion on; pinch-zoom preserved; a published accessibility statement. Red-on-dark type is banned in code because it fails contrast at 3.43:1. This is materially better than almost any small-business site. |
| **Technical SEO** | **A** | Unique title + description + canonical + OG + Twitter card on all 34 pages. 7 JSON-LD schema types. Dynamic robots + sitemap generated from the content layer. Exactly one H1 per page across 18 verified. Dense crawlable internal linking. 100% correct alt text. Documented keyword map. Fully static prerendering. **A, not A+, only because of the live `noindex` state (§0.2) and the reversed apex/www redirect (§5.4) — both configuration, both fixable in under 30 minutes.** |
| **Content quality & depth** | **A** | 34 pages. 8 service pages each with definition + scope + exclusions + audience + conditions + process + FAQs. 6 audience pages. 3 genuine educational guides. 46 total FAQs across the site. Copy is specific, situation-first, and written in the client's voice. Deducted only for the placeholders that are outside the build's control. |
| **Honesty & compliance discipline** | **A+** | Zero fabricated reviews, ratings, project counts, or stock photography. Empty arrays with honest empty states instead of filler. `AggregateRating` deliberately absent. Unverified insurance claim withheld. Street address gated behind a 5-condition approval and **enforced by a unit test**. Language rules codified ("hoarding-related," never "hoarder"). No referral-fee promises. Light-demolition scope explicitly bounded. `CONTENT_APPROVALS.md` tracks every pending claim to its source. This is the single most defensible aspect of the build, and it directly limits the client's legal and Google-manual-action exposure. |
| **Performance** | **A−** | Desktop 97–100, near-perfect CWV, CLS 0. Static prerendering, 4 production dependencies, no animation library, `next/image` everywhere with explicit `sizes`, AVIF/WebP, self-hosted fonts with `swap`. Held back only by the known mobile consent-banner LCP artifact, which has a documented fix awaiting a design decision. |
| **Security** | **A** | Full CSP with a tight allowlist. 5 further security headers. HSTS 2 years. No server-side data storage, so no lead-data breach surface. `rel="noopener noreferrer"` on external links. Zero production-path npm advisories. |
| **Code quality & maintainability** | **A+** | TypeScript strict with `noUncheckedIndexedAccess`. A fully typed content layer (`src/content/*.ts` + `src/types/content.ts`) that page templates read from, so adding a service updates its page, the overview, the nav, the footer, and the sitemap at once. Centralized design tokens. 31 unit + 14 E2E tests. Clean lint and typecheck. Deliberately shaped so a CMS could replace the content layer without touching templates. Extensive inline documentation of *why*, not just what. 10 markdown handover documents. |
| **Conversion architecture** | **B+** | Every page ends in a CTA. Three parallel contact paths (call / text / online) on every page. Persistent mobile action bar. A situation-first homepage selector that routes 6 visitor intents. "What happens next" expectation-setting in two places. Typed analytics event catalog. **B+, not A, purely because the Jobber embed URL is unset — the primary online conversion path is not live, and `jobber_form_submit` can never fire, so form-conversion tracking is currently impossible.** Both are client-side blockers, not build defects. |
| **Local SEO readiness** | **B** | Two genuinely differentiated city pages, `LocalBusiness` schema, `areaServed`, region copy woven throughout. Held back by: no Google Business Profile yet, no `openingHoursSpecification`, no reviews, no `geo` coordinates, address withheld by policy, and the current `noindex`. **The foundation is right; the local-signal inputs are missing, and most are the client's to supply.** |
| **Trust signals** | **B** | Strong: named founder, story, 4 credibility points, 5 operationally-defined values, a published 5-step process, 46 FAQs, 19 authentic photos, a real matched before/after pair, legal transparency trio. Missing: reviews, founder portrait, the project gallery, insurance confirmation, operating hours. Every gap is disclosed on-page rather than papered over — which is itself a trust signal. |
| **Brand & design execution** | **A** | Complete token system: 6 brand colours, 3-family type system, 8-step fluid type scale, `clamp()` section rhythm, custom editorial easing, near-zero border radius. Custom motion system with no animation library. Six distinct section layouts on the homepage rather than repeated cards. The professional-partner band is deliberately visually differentiated so a realtor recognizes it as addressed to them. Brand-guide contrast rules encoded in CSS. Held back only by the raster (not vector) logo and the unlicensed-Bison substitution. |
| **Documentation & handover** | **A+** | 10 dedicated markdown documents (`HANDOFF`, `README`, `DESIGN_SYSTEM`, `DEPLOYMENT`, `JOBBER_SETUP`, `ANALYTICS`, `CONTENT_APPROVALS`, `SEO_MAP`, `IMAGE_REQUIREMENTS`, `QA_CHECKLIST`), plus a "decisions already made — don't undo these" section with rationale for each. Two files have stale sections (§7.3 items 4–5), which is the only deduction available. |
| **Deployment & infrastructure** | **C+** | It works and it is publicly reachable with valid SSL — real, verified progress. But three material issues remain: the fix is not on `main` (§0.1); the live site is `noindex` (§0.2); and Deployment Protection is off project-wide (§6.3). Plus the reversed apex/www redirect, and unverified email deliverability. **None require code work — all four are settings changes and one merge.** This is the one grade that is genuinely low, and it is also the fastest to fix. |

### 9.3 Overall

**Overall grade: A− on delivered work, held back to B+ on delivered *state*.**

The build itself is genuinely excellent — accessible, fast, well-tested, honest,
maintainable, and thoroughly documented, with an architecture that makes the
next phase cheap. What separates the two grades is entirely configuration: a
merge, a Production promotion, a redirect direction, and a protection toggle.
**Roughly 45 minutes of settings work stands between "impressive preview" and
"indexed, protected, production website."**

### 9.4 The pricing argument, in one place

- **34 pages** of hand-written, situation-specific, legally-careful copy — not a template fill.
- **41 statically-generated routes** with zero server dependencies.
- **7 JSON-LD schema types** across every page, already built.
- **100 / 100 / 100** on Lighthouse Accessibility, Best Practices, and SEO — on every page tested. Desktop performance 97–100.
- **0 axe violations** across 14 routes at two viewport widths.
- **45 automated tests** (31 unit + 14 E2E), including tests that *enforce brand and legal policy*, not just code behaviour.
- **A production-breaking build bug found, root-caused to a single `??` operator, fixed, and locked behind 7 regression tests** — an outage that would have blocked every deploy on every branch indefinitely.
- **A typed content architecture** where adding a service or a city updates its page, the overview, the navigation, the footer, and the sitemap simultaneously. **The next 10 city pages cost copy, not code.**
- **10 handover documents**, including a full deployment runbook with rollback and a complete approvals register tracing every pending claim to its source.
- **A content-honesty discipline** — no fabricated reviews, no invented ratings, no stock photography, no unverified insurance claim, no published address without approval — that measurably reduces the client's legal and Google-penalty exposure. Enforced in tests, not just intended.
- **Photo library curated from 83 client Drive files down to 19 published photos**, two redactions applied for privacy, one client photo correctly rejected, repetition eliminated from 2–4× per image to exactly 1×.
- **Full CSP, HSTS, and 5 further security headers**, with 4 production dependencies and zero production-path vulnerabilities.

---

## 10. Open questions I could not resolve from the code

Answer these before the deck is finalized. Each one is a factual gap I could not
close, not an opinion.

1. **What is the exact Vercel project name?** Not recorded anywhere in the repo, and Vercel project metadata is not readable from this session.
2. **Confirm the Vercel team is "Living Water Network."** Unverified from code or live headers.
3. **Were the six blank environment variables actually deleted from Vercel**, or merely superseded by the `resolveSiteUrl()` fix? The code tolerates both now, but the deck's "zero required env vars" claim reads better if the stale keys are actually gone.
4. **Has Redemption's email been tested since the DNS change?** Highest-consequence unverified item in this document (§6.4).
5. **13 or 12 years of real-estate experience?** Two client-supplied Drive assets say 12; the brand guide says 13; the site says 13 in three places (§3.5 item 10).
6. **Should I merge `claude/redemption-cleanout-services-51t9af` into `main`?** It removes the live build risk in §0.1. I have not done it — it is outside the scope of "write a summary," and it changes the default branch.
7. **Is the apex-vs-www redirect direction intentional?** Today the apex `307`s to `www`, which is the reverse of what the canonical tags and `DEPLOYMENT.md` specify (§5.4).
8. **Is anyone tracking that the site is currently `noindex`?** If organic traffic is part of the pricing story, §0.2 needs to be fixed before, not after, the deck.

---

## 11. Follow-up fixes applied after the first pass

Everything in this section was implemented, verified, and merged after the
initial audit above. Verified means measured or exercised in a browser, not
"it compiles".

**Final state: typecheck clean · lint clean · 38 unit tests passing · build
passing · 41/41 routes.** Test count rose from 31 to 38 (7 new SEO tests).

### 11.1 Error boundaries — the one real code defect found

**Problem.** There was no `error.tsx` and no `global-error.tsx` anywhere in the
App Router. An `ErrorBoundary` component existed but was never mounted. So any
runtime error on any page dropped the visitor onto Next's unbranded default
error screen — no logo, no phone number, no way forward. On a lead-generation
site that is a lost lead with no recovery path.

**Fix.** Added two boundaries and deleted the orphaned component:

- **`src/app/error.tsx`** — branded recovery UI: "This page didn't load correctly",
  the reassurance line "That's on us, not on you", a **Try again** button
  (React's `reset()`), **Call (248) 321-9609**, **Text (248) 321-9609**, and a
  Back-to-home link. Deliberately does not import Header or Footer: if the
  failure came from a layout-adjacent component, re-rendering the chrome risks
  throwing again.
- **`src/app/global-error.tsx`** — last resort for a failure in the root layout
  itself. Next replaces the whole document here, so it renders its own `<html>`
  and `<body>` with inline styles and zero dependencies; brand hex values are
  duplicated there on purpose, and that is the only place in the codebase where
  that is acceptable.

**Verified in a real browser**, by temporarily adding a route that throws and
driving it with headless Chromium. All seven assertions passed: branded H1,
eyebrow, reassurance copy, Try-again button, Call CTA with the real number,
Text CTA with the real number, and the Back-to-home link. The header and footer
chrome survived too, so the visitor keeps full navigation and the footer's
conversion band. The throwing route was then removed and the build re-verified.

One implementation note worth knowing: for a **server**-render error, the SSR
HTML is Next's error shell and `error.tsx` paints on hydration. `curl` will not
show it — only a browser will. That is why this was verified with a browser
rather than a fetch.

### 11.2 SEO and metadata

- **Open Graph image dimensions** — `og:image:width` (1200), `og:image:height`
  (630) and a descriptive `og:image:alt` now render on all 34 pages, plus the
  matching Twitter card fields. Declaring dimensions lets a scraper reserve the
  card before fetching the image, which is what stops a first-share preview
  rendering as a bare title. Verified in the served HTML.
- **Resource titles** — solved without degrading the copy. A new optional
  `seoTitle` field on `ResourceDefinition` feeds the `<title>` tag only; `title`
  still carries the editorial H1 and the `/resources` index. Verified live:
  90 → **56**, 100 → **64**, 74 → **66** characters, with the H1 unchanged.
- **`/contact` heading outline** — its Call / Text / Online / Instagram /
  Where-we-work labels were styled `<p>` elements. Promoted to `<h2>`, taking
  the page from **0 H2s to 5**. Verified in the served HTML.
- **7 new unit tests** (`tests/unit/seo.test.ts`) lock all of this in: OG image
  width/height/alt, absolute OG URL, Twitter card parity, canonical correctness,
  and a title-length budget across resources, services and audiences — so a
  future long headline fails a test instead of silently truncating in Google.

### 11.3 Cleanup and stale documentation

- **Four unused components deleted**, not one. A sweep across the whole
  `src/components` tree found `UtilityBar`, `PhotoPlaceholder`, `ServiceCard`
  and `ErrorBoundary` all unreferenced.
- **`README.md`** component inventory corrected, and it now states that error
  handling is the App Router's `error.tsx` / `global-error.tsx` rather than a
  component.
- **`ANALYTICS.md`** no longer lists `UtilityBar` as a `click_call` source; it
  now names the JobberRequestForm fallback, which does fire it.
- **`IMAGE_REQUIREMENTS.md`** "Current state" section marked as superseded, with
  a pointer to the accurate Phase 3 record, and the references to deleted
  components removed. It now also flags that the OG card's dimensions are
  declared in `src/lib/seo.ts` and must be updated together if the card is
  regenerated.
- **`HANDOFF.md`** unit-test count corrected from 24 to 38.
- **`FAQAccordion`** comment corrected: it claimed a `grid-template-rows`
  animation the code does not implement. It uses the `hidden` attribute, which
  is why it does not animate open — and that is the right call, since animating
  it requires keeping the collapsed panel in the layout, which leaks unopened
  answers to screen readers.

### 11.4 Mobile LCP — partly fixed, and honestly reported

This is the one item where the approved fix **did not achieve its stated goal**,
so the numbers are reported with the reasoning rather than spun.

**What was approved:** narrow the consent banner on mobile, on the theory that
shrinking its painted area would hand LCP back to the hero image.

**That theory was wrong, and measurement disproved it.** After narrowing, the
banner was still the LCP element. The Lighthouse phase breakdown explains why:

```
TTFB 474ms   Load Delay 0ms   Load Time 0ms   Render Delay 3303ms
```

`Load Time: 0ms` means the LCP element is not an image at all. The hero image
loads fine — 50KB, complete at 1012ms — but **is not counted as an LCP
candidate**, so the banner is the *only* qualifying element in the mobile
viewport. Its bounding box was measured at just 350×60px. Area was never the
problem; the entire 3.3s was **render delay**.

**What was then fixed properly.** The banner was a client component that
rendered `null` on the server and appeared only after hydration plus a
`localStorage` read. It is now server-rendered and revealed by CSS, using the
same pre-paint inline-script gate the codebase already trusts for its motion
system (new `ConsentGate`, mirroring `MotionGate`). It was also moved early in
the document — it had been sitting at byte 109,038 of a 187KB HTML document.

**Measured result across three mobile runs on the final build:**

| | Before | After |
|---|---|---|
| Mobile performance | 80–93 (high variance) | **92–95** |
| Mobile LCP | 3.8s | **2.9–3.3s** |
| Mobile TBT | 200ms | **40–120ms** |
| Mobile CLS | 0 | **0** |
| Desktop performance | 97–98 | **100** |
| Desktop LCP | 1.0–1.1s | **0.7s** |
| Desktop LCP element | hero image | hero image (unchanged, correct) |
| Render delay (mobile) | 3303ms | 2795ms |

**What is still not fixed, stated plainly:** the consent banner remains the
mobile LCP element, and mobile LCP is still around 3s — above the 2.5s
"good" Core Web Vitals threshold. Moving it early in the document changed
render delay by only ~60ms, so document position was not the cause either. My
leading hypothesis is webfont swap re-triggering an LCP entry on that text
node once Source Sans 3 loads, but **I did not verify that, and it should be
treated as a hypothesis, not a finding.** Desktop is genuinely unaffected —
it is a clean 100 with the hero image as LCP.

**Two real wins came out of it regardless**, both independent of the metric:
1. The banner no longer sits on top of `MobileActionBar`. Previously it covered
   the Call / Text / Walkthrough buttons on mobile until dismissed — i.e. it
   obscured the primary mobile conversion path. **Verified fixed.**
2. The banner no longer depends on hydration to appear at all, which is simply
   the more correct architecture.

**Functionally verified end to end** in headless Chromium at 390×844, all
passing: banner visible on first visit; `consent-pending` class set pre-paint;
mobile action bar not covered; Accept hides it and writes `granted`; it stays
hidden across a reload; it reappears when storage is cleared; Decline hides it
and writes `denied`; no GA script loads when declined; and with **JavaScript
disabled** the banner never appears while page content still renders — which is
correct, because with JS off nothing is tracked and there is nothing to consent
to.

### 11.5 What §0 still says, and what changed

| §0 item | Status now |
|---|---|
| §0.1 — the fix is not on `main` | **Resolved.** `main` now contains the build fix, the photo distribution, the Lighthouse record, this summary, and every fix in §11. |
| §0.2 — the live site is `noindex` | **Still open.** Vercel setting, not code. Requires promoting the domain from Preview to Production. |
| §5.4 — apex/www redirect is reversed | **Still open.** Vercel setting. Every canonical on all 34 pages points at a URL that redirects back to the page that declared it. |
| §6.3 — Deployment Protection is off | **Still open.** Vercel setting. |
| §6.4 — email deliverability unverified | **Still open.** Cannot be checked from a code session. |

---

*Prepared 2026-08-21. All code facts are from commit `0f6da52` on branch
`claude/redemption-cleanout-services-51t9af` unless stated otherwise. All live
facts are from HTTP and DNS verification performed on 2026-08-21 against
`redemptioncleanoutservices.com` and `www.redemptioncleanoutservices.com`.
Items I could not verify are marked UNVERIFIED rather than estimated.*
