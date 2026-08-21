# Handoff — Redemption Cleanout Services website

Written for whoever picks this up next (human or AI). Read this first, then
`README.md` for setup and `DESIGN_SYSTEM.md` for anything visual.

Last updated: 2026-08-21 · Latest commit: `a5ff374` + this photo pull

---

## 1. What this is

Production website for **Redemption Cleanout Services** — a full-property
cleanout, estate cleanout, and commercial cleanout company in Rochester,
Michigan. Founder: Dante Terracciano.

- **Repo:** https://github.com/LivingWaterNetwork/Redemption-Cleaout
  (branch `main` — everything is pushed, working tree clean)
- **Target domain:** `redemptioncleanoutservices.com`, registered at GoDaddy
- **Hosting:** Vercel (not yet connected — see §6)
- **CRM / system of record:** Jobber
- **Status:** Feature-complete and tested. **Not deployed.** Blocked only on
  third-party configuration and content approvals, not on code.

**Important:** this is a *different business* from `livingwaternetwork/lwn-website`,
which is a nonprofit site that happens to share the GitHub account. Don't mix
them. The only link between them is a private, noindexed intake page for Dante
that lives in the LWN repo.

---

## 2. Current state

| Area | State |
|---|---|
| Routes | 41 generated (8 services, 6 audiences, 2 service areas, 3 resources, plus static + legal) |
| Typecheck / lint | Clean |
| Unit tests | 24 passing (Vitest) |
| E2E tests | 14 passing (Playwright) |
| Production build | Passing |
| Accessibility | **0 axe violations**, WCAG 2.2 AA, 14 routes × 390px and 1440px |
| Horizontal overflow | None at 390 / 768 / 1024 / 1440 / 1920 |
| Lighthouse | **Not run** — see §7 |

### Stack

Next.js 16 (App Router) · React 18 · TypeScript strict (with
`noUncheckedIndexedAccess`) · Tailwind 3 · Vitest · Playwright · Zod (config
validation only). No database, no auth, no CMS, no animation library.

### Architecture in one paragraph

Every route is a server component that renders metadata + JSON-LD, then
composes section components. All editorial content lives as typed data in
`src/content/*.ts` — services, audiences, service areas, FAQs, resources,
situations, testimonials, projects, navigation, process, founder story, and
business facts. Page templates read from those files, so adding a service
updates its detail page, the overview, navigation, and the sitemap at once.
The layer is deliberately shaped so a CMS (e.g. Sanity) could replace it later
without touching templates.

---

## 3. Decisions already made — don't undo these without a reason

These are load-bearing. Each one traces to the client brief or the approved
brand guide.

1. **`publicAddressEnabled: false`** in `src/content/business.ts`. The street
   address (429 S Main St) is kept in an internal comment only. It must not
   appear in the footer, contact page, map, or LocalBusiness schema until
   leadership confirms permanent operation, staffing, visitability, signage,
   and GBP compliance. A unit test enforces this, and `structuredData.ts`
   omits `streetAddress` while the flag is false.

2. **No fabricated content, anywhere.** `testimonials.ts` and `projects.ts`
   are intentionally empty arrays. There are no star ratings, no aggregate
   rating schema, no project counts, no "years in business" counter, no fake
   partner logos, and no stock photography. Where an asset is missing, the UI
   shows an honest "being gathered / asset needed" state.

3. **Jobber owns leads.** The site never stores form submissions, and the
   `JobberRequestForm` component never implies a submission happened. When
   the embed URL is unset it renders an honest unavailable state with working
   call/text links — not a form that looks functional.

4. **Only 2 service-area pages** (Rochester, Rochester Hills). Adding more
   requires approval *and* genuinely unique local content — not a template
   with the city name swapped. `generateStaticParams` only routes entries
   with `approved: true`.

5. **Red is never used as type on dark backgrounds.** It fails contrast
   (3.43:1) and the brand guide forbids it. `.on-dark .eyebrow` turns labels
   white and keeps red for rules. Small red type on light surfaces uses
   `restoration-red-dark` (#A91E23), because plain Redemption red only hits
   4.35:1 on warm concrete.

6. **Motion degrades to nothing.** `MotionGate` adds `html.motion-ready`
   before first paint, only when JS runs and reduced-motion is off. Every
   hidden state is scoped to that class, so with JS disabled or reduced motion
   on, all content renders visible. Never hide content outside that scope.

7. **Primary CTA is "Request a Property Walkthrough"**, never "Book Now" —
   larger cleanouts require qualification. Quoting is on-site by design.

8. **Language rules.** "hoarding-related" or "severe-clutter" cleanout, never
   labeling a person a hoarder. No "cheapest," "instant quote," "we take
   anything," "no job too disgusting." No referral-fee promises. Light
   demolition is always scoped as "subject to site conditions and approval"
   and explicitly excludes regulated asbestos abatement and structural
   demolition.

9. **Founder story has boundaries.** `src/content/founderStory.ts` holds the
   approved short and "Our Story" versions. No addiction or recovery detail
   appears anywhere, and sobriety is never used as a sales mechanism. All
   founder copy still needs Dante's explicit sign-off.

---

## 4. Assets

### In the repo

- `public/images/brand/logo-master.png` — the real master logo, derived from a
  10264×4532 PNG pulled from the client's shared Drive folder. Favicon, app
  icons, Apple touch icon, and the OG card are all generated from it.
- `public/images/photos/` — **19 authentic job photos**, all cropped to a
  consistent 3:2 editorial ratio at 1600×1067, EXIF stripped. 14 of these were
  pulled from the client's Drive folder in the photo session documented in
  `IMAGE_REQUIREMENTS.md`.

### The gap — largely closed

Image repetition is **resolved**: 19 photos now cover 17 placements, each
appearing once except one that appears on two different pages. Previously 5
photos covered ~15 placements at 2–4× each. All 8 services carry a distinct
photo; three had none at all.

Also closed by the pull: the **branded vehicle** shot (now the homepage hero),
**crew in branded uniform**, **commercial interiors**, and **matched
before/after pairs** — two genuine same-property pairs now exist, and the
homepage before/after section shows one side by side instead of an "asset
needed" panel.

Still missing: a **founder portrait of Dante**. A candidate exists in Drive
(a hard-hat/hi-vis profile) but the subject's identity is unconfirmed, so it
was not used. Also wanted: a deliberately shot identical-angle pair, and Dante
with clients or partners.

Not retrieved: **5 HEICs** and **12 videos**. The Drive connector passes file
content as base64 and fails above ~6 MB — every file ≤5.68 MB transferred,
every file ≥6.52 MB failed, repeatably. Pull those five from Drive directly
rather than through the connector. The videos (~250 MB) need a hosting
decision first; they do not belong in git.

One photo was rejected: a tight crop on a trailer's dirty fender. It was
briefly used as the homepage hero and the client correctly called it out as
unprofessional; the hero is now photography-plus-scrim with a typographic
focus instead.

---

## 5. What's blocking launch

All configuration and approvals — no code work. Full list in
`CONTENT_APPROVALS.md`; these are the ones that actually gate going live:

| Blocker | Why it matters |
|---|---|
| `NEXT_PUBLIC_JOBBER_EMBED_URL` + `..._REQUEST_FORM_URL` | The main conversion path. Until set, `/request-walkthrough` shows call/text only. See `JOBBER_SETUP.md`. |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` / `..._BUSINESS_URL` | The reviews page can't invite reviews without them. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No analytics until set (and consent accepted). |
| "Fully insured" claim | The brochure claims it; the brand guide flags it unverified. **Not published anywhere on the site** until confirmed. |
| Operating hours | Not published anywhere yet. |
| Founder-story wording | Draft, pending Dante's sign-off. |
| 13 vs. 12 years real estate | Site uses 13 per the brand guide's correction; confirm. |
| Accepted / excluded materials | FAQ currently says this is pending. |
| Business email | Not published; phone/text only. |

---

## 6. Deploying (not done yet)

The domain stays at GoDaddy. Only DNS records change — no transfer.

1. vercel.com/new → import `LivingWaterNetwork/Redemption-Cleaout` → Deploy.
   Next.js auto-detects; no build config needed.
2. Add env vars from `ENVIRONMENT_VARIABLES.md` in Vercel → Settings.
3. Add both `redemptioncleanoutservices.com` and `www.` in Vercel → Domains.
4. **Before touching GoDaddy DNS, export the existing zone.** Then change only
   the apex `@` and the `www` CNAME. Leave every MX / SPF / DKIM / DMARC /
   verification record alone or Redemption's email breaks.
5. Set apex as primary, `www` redirecting to it. `NEXT_PUBLIC_SITE_URL` is
   already the apex.
6. Test email after propagation. Then submit the sitemap in Search Console.

Full step-by-step with rollback in `DEPLOYMENT.md`.

---

## 7. Known gaps and honest caveats

- **Lighthouse was never run.** There's no Chrome measurement environment in
  the build sandbox, so there are no real Performance / LCP / INP / CLS
  numbers. The architecture targets the goals (static prerendering, one small
  IntersectionObserver, `next/image` everywhere with explicit `sizes`, no
  animation library), but treat the targets as unverified until someone runs
  Lighthouse against a Vercel preview URL.
- **Image repetition** — resolved, see §4.
- **`src/content/projects.ts` is still empty**, even though matched
  before/after photography now exists. An entry needs city, property type,
  challenge and outcome — which cannot be read off a photo without inventing
  them — plus written per-property owner permission. The photos are staged and
  the template is ready; supply the facts and the slider turns itself on.
- **`view_service`, `view_project`, `click_google_reviews`, `download_guide`**
  are defined in the typed analytics helper but not all wired to fire, because
  the underlying content (project entries, a downloadable guide) doesn't exist
  yet. Documented in `ANALYTICS.md`.
- **`jobber_form_submit` never fires.** Jobber exposes no client-side event
  this site can listen for, and firing on iframe `load` would be a lie. If
  Jobber adds a webhook or postMessage, wire it there.
- **Bison Bold is not licensed.** Display type uses Oswald (a commercially
  safe substitute), per the brand guide's own recommendation. The script
  wordmark is original artwork and is never retyped in a font.
- **npm audit shows advisories** in dev-only tooling (Vitest/Vite/Playwright
  chains). Nothing in the production dependency path.

---

## 8. Environment gotchas that cost time

If you're working in a sandbox like the one this was built in:

- **`pkill -f next` will kill your own shell** if the command string contains
  "next". Use `./rebuild.sh`, which matches `next-server` specifically.
- **`ss -ltnp` has no permission** to show PIDs here, so port-based process
  cleanup silently does nothing. `rebuild.sh` uses `ps -eo pid,args` instead.
- **A killed build leaves a stale server** serving a CSS chunk that no longer
  exists on disk — the page renders completely unstyled. If that happens, run
  `./rebuild.sh`; it prints the CSS byte count so you can confirm (should be
  ~49KB, not 21).
- **Full-page screenshots render from scroll 0**, so scroll-triggered reveals
  photograph as blank. `shot.mjs` emulates reduced motion to capture final
  states; pass `MOTION=on` to see the animated path instead.
- **Node scripts must live in the project root** to resolve `@playwright/test`
   — running them from `/tmp` fails with `ERR_MODULE_NOT_FOUND`.

---

## 9. Commands

```bash
npm install
npm run dev                 # localhost:3000

npm run typecheck
npm run lint
npm run test                # Vitest, 24 tests
npm run build
npx playwright test         # 14 e2e tests

./rebuild.sh                # clean rebuild + restart on :3000, verifies CSS
node axe-check.mjs          # WCAG 2.2 AA sweep, needs a running server
OUT=/tmp/shots WIDTHS=390,768,1024,1440,1920 ROUTES="home:/" node shot.mjs
```

`shot.mjs` prints a warning for any horizontal overflow it finds.

---

## 10. Suggested next steps, in order

1. **Deploy to Vercel** to get a preview URL, then run Lighthouse against it
   and fix whatever it finds.
2. ~~Pull the remaining photos from Drive~~ — **done.** What remains from that
   thread: (a) confirm who is in the founder-portrait candidate, (b) pull the
   5 oversized HEICs directly from Drive, (c) decide where the 12 videos are
   hosted, (d) get per-property permission so `projects.ts` can be filled.
3. **Get the Jobber form URL** and verify an end-to-end submission from the
   live domain.
4. **Walk `CONTENT_APPROVALS.md` with Dante** — especially the insurance
   claim, the founder story, and operating hours.
5. **Then** the GoDaddy DNS cutover, per `DEPLOYMENT.md`.

---

## 11. Documentation index

| File | Contents |
|---|---|
| `README.md` | Setup, scripts, structure, content editing |
| `DESIGN_SYSTEM.md` | Tokens, component classes, motion system |
| `DEPLOYMENT.md` | Vercel + GoDaddy DNS cutover, with rollback |
| `JOBBER_SETUP.md` | Embed config, recommended form fields, CSP |
| `ANALYTICS.md` | GA4 setup, full typed event catalog, privacy rule |
| `CONTENT_APPROVALS.md` | Every claim/fact/asset pending sign-off |
| `SEO_MAP.md` | Keyword-to-page mapping, structured data per page |
| `IMAGE_REQUIREMENTS.md` | Assets in use, what's missing, shot direction |
| `ENVIRONMENT_VARIABLES.md` | Full env var reference |
| `QA_CHECKLIST.md` | Pre-release checklist |
