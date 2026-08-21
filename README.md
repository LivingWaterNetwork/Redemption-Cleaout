# Redemption Cleanout Services — Website

Production website for Redemption Cleanout Services, a full-property
cleanout, estate cleanout, and commercial cleanout company serving
Rochester, Michigan and surrounding Southeast Michigan communities.

## Stack

- **Framework:** Next.js (App Router), TypeScript (strict)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Lead capture:** Jobber (embedded request form — no server-side database
  or custom CRM; see `JOBBER_SETUP.md`)
- **Analytics:** GA4, consent-gated (see `ANALYTICS.md`)
- **Testing:** Vitest (unit) + Playwright (e2e)

## Local development

```bash
npm install
cp .env.example .env.local   # fill in real values — see ENVIRONMENT_VARIABLES.md
npm run dev
```

Runs at http://localhost:3000.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run a production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run test` | Vitest unit tests |
| `npm run e2e` | Playwright end-to-end tests (builds + starts the app first) |
| `node axe-check.mjs` | WCAG 2.2 AA sweep over 14 routes at 390px and 1440px (needs a running server) |
| `node shot.mjs` | Full-page screenshots at each breakpoint; flags horizontal overflow |
| `./rebuild.sh` | Clean rebuild and restart on :3000 for local review |
| `npm run format` | Prettier |

## Project structure

```
src/
  app/                  Routes (App Router). Server components render
                         metadata + JSON-LD, then compose section
                         components from components/sections and
                         components/ui.
  components/            layout/ (Header — transparent over the hero and
                         solid on scroll, with the utility strip and mobile
                         panel; Footer; MobileActionBar; SkipLink),
                         motion/ (MotionGate + Reveal — the single motion
                         implementation, see DESIGN_SYSTEM.md),
                         sections/ (page composition: Hero, TrustBand,
                         SituationSelector, FlagshipServices,
                         BeforeAfterSection, WhyRedemption,
                         HowItWorksSection, ProfessionalPartnerSection,
                         FounderSection, RecentWork, ReviewSection,
                         ServiceAreaSection, FAQPreview, PageHero,
                         ProjectGallery),
                         ui/ (primitives: Breadcrumbs, CallToAction,
                         FAQAccordion, ProcessTimeline, SectionHeader,
                         EmptyState), plus JobberRequestForm,
                         BeforeAfterComparison, Analytics, ConsentBanner,
                         StructuredData at the top level. Error handling is
                         the App Router's own error.tsx / global-error.tsx,
                         not a component.
  content/               Typed content layer — business.ts, services.ts,
                         audiences.ts, serviceAreas.ts, faqs.ts,
                         testimonials.ts, projects.ts, resources.ts,
                         navigation.ts, process.ts, founderStory.ts.
                         Edit business facts here, not inline in
                         components. Organized so a future CMS (e.g.
                         Sanity) could replace this layer without
                         touching page templates.
  lib/                   seo.ts (metadata + breadcrumb JSON-LD helpers),
                         structuredData.ts (Organization/Service/FAQPage/
                         Article JSON-LD), analytics.ts (typed event
                         helper), fonts.ts, validation.ts.
  types/content.ts        Shared content types.
```

## Editing content

Almost everything editorial lives in `src/content/*.ts` as typed data, not
scattered through JSX:

- **Business facts** (phone, address, tagline, service region) →
  `src/content/business.ts`. This is also where the **address safety
  rule** lives: `publicAddressEnabled` must stay `false` until leadership
  confirms every condition in `CONTENT_APPROVALS.md`. Never hardcode the
  street address anywhere else in the codebase.
- **Services** → `src/content/services.ts`. Adding/editing a service
  automatically updates its detail page, the services overview, the
  sitemap, and navigation.
- **Audiences (who we serve)** → `src/content/audiences.ts`.
- **Service areas** → `src/content/serviceAreas.ts`. Only entries with
  `approved: true` get routed — see `SEO_MAP.md` for why new city pages
  require more than adding a row here.
- **FAQs, testimonials, projects, resources** → their own files under
  `src/content/`. `testimonials.ts` and `projects.ts` are intentionally
  empty until real, approved content exists — see the placeholder-policy
  comment at the top of each file.

## Testing

- `npm run test` — Vitest + Testing Library, covering content integrity
  (e.g. the address safety rule, placeholder policy), the analytics
  helper, the Jobber fallback, and the FAQ accordion's accessibility
  behavior.
- `npm run e2e` — Playwright, covering navigation, the mobile menu and
  action bar, the request-walkthrough flow, service/service-area routing
  (including 404s for unapproved areas), sitemap/robots, structured data,
  and reduced-motion behavior.

## Deployment

See `DEPLOYMENT.md` for the full Vercel + GoDaddy DNS cutover process. In
short: deploys automatically to Vercel on push to `main`; the domain stays
registered at GoDaddy, only its DNS records point at Vercel.

## Picking this up mid-project?

Start with **`HANDOFF.md`** — current state, decisions that are load-bearing
(and why), what's blocking launch, known gaps, and suggested next steps.

## Further documentation

- `HANDOFF.md` — project state, decisions, blockers, next steps

- `JOBBER_SETUP.md` — configuring the Jobber embed and recommended form fields
- `ANALYTICS.md` — GA4 setup and the full typed event catalog
- `CONTENT_APPROVALS.md` — every fact/claim/asset still pending leadership sign-off
- `SEO_MAP.md` — keyword-to-page mapping and structured data by page
- `IMAGE_REQUIREMENTS.md` — logo/photography assets still needed, and where they plug in
- `ENVIRONMENT_VARIABLES.md` — full env var reference
- `QA_CHECKLIST.md` — pre-release checklist
- `DESIGN_SYSTEM.md` — design tokens, component classes, and the motion system
