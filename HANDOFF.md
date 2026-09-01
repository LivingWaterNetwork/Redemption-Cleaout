# Handoff — Redemption Cleanout Services website

Written for whoever picks this up next (human or AI). Read this first, then
`README.md` for setup and `DESIGN_SYSTEM.md` for anything visual.

Last updated: 2026-09-01 · restructured site and all 27 city pages are
**live in production** (see §0).

---

## 0. Read this first — state as of 2026-09-01

**The site is live.** `main` is at `b1c46d0` and Vercel is serving it at
`redemptioncleanoutservices.com` over HTTPS. Verified 2026-09-01: `robots.txt`
returns `Allow: /` with no `X-Robots-Tag`, `sitemap.xml` lists **53 URLs**, the
two service pages, all seven county pages and all 27 city pages return 200, and
the retired `/who-we-serve` and `/services/estate-cleanouts` return 308s.

The earlier note here — "nothing is deployed, the public site is still
untouched" — was written before the launch merge and was stale.

**Everything below §0 that describes eight service pages, a "Who We Serve"
tree, or two Rochester city pages is superseded.** So are the equivalent parts
of `PROJECT_SUMMARY.md`.

### What changed, in one pass

- **Two services**, not eight: `/services/full-property-cleanouts` and
  `/services/demolition`. Estate, foreclosure, commercial, hoarding-related,
  move-out and junk removal are anchored `<h3>` sections inside the cleanouts
  page (`categories` in `src/content/services.ts`).
- **Demolition is a full service**, no longer "light demolition", and the page
  says licensed and insured — phrased generally, because that is exactly what
  the owner confirmed. No licence number, class or insurer appears anywhere.
- **Coverage is all of Metro Detroit**: seven county pages, plus **27 city
  pages** at `/service-areas/<county>/<city>`.
- **`/who-we-serve` and its six children are deleted.** Audience content folded
  into the cleanouts page.
- **`/projects` is "Previous Work"** — a flat gallery of all 32 photos with a
  lightbox, no per-project pages.
- **Home page cut from 13 sections to 8.**
- **Quoting changed**: a ballpark estimate from photos over the phone, the
  final quote given on site in person. `src/content/process.ts` is the
  canonical wording; keep every other mention consistent with it.
- **Every retired URL 301s.** Map in `SEO_MAP.md`, redirects in
  `next.config.mjs` as `legacyRedirects`, covered by an e2e test. Do not
  remove them.

### Where to look

| For | Read |
|---|---|
| URL map, keywords, redirects, schema | `SEO_MAP.md` |
| What still needs the client's sign-off | `CONTENT_APPROVALS.md` |
| Adding photos, and how Drive binaries get pulled | `IMAGE_REQUIREMENTS.md` |
| Getting them ranking locally (not code) | `LOCAL_SEO_PLAYBOOK.md` |

### Commands that matter

```bash
npm run build && npm run lint && npm test   # must all pass before pushing
node tools/check-city-pages.mjs             # quality gate for city pages
node tools/build-city-index.mjs             # after adding a city file
node axe-check.mjs                          # accessibility, needs the site running
```

Sandbox notes for whoever picks this up: LibreOffice needs
`libreoffice-impress` installed before it will convert a `.pptx`, and the
bundled Chromium is at a different build than the pinned Playwright expects, so
scripts need `executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"`.

### ✅ The city pages were fixed before launch

The independent review found **79 problems across 26 of the 27** — fabricated
local geography, passages interchangeable between sibling pages, claims about
work the company has not confirmed doing, and three tone problems. All 79 are
fixed, one commit per county, and the findings and their fixes are recorded in
**`CITY_PAGE_FIXES.md`**. A follow-up pass corrected an escaped-separator bug
and rewrote 46 British spellings across twenty city files.

`tools/check-city-pages.mjs` passed all 27 before that review. It is a floor,
not sign-off; `CITY_PAGE_FIXES.md` explains exactly what it cannot see.

### The one rule about city pages

`src/content/cities/` is the biggest local-search asset here and the easiest
thing to ruin. A set of pages with the city name swapped into a template is a
doorway-page pattern — Google demotes it and it drags down the pages that
already rank, so **a generic city page is worse than no city page**.

`tools/check-city-pages.mjs` enforces the mechanical half: no unverifiable
claims (ordinances, permit fees, named disposal sites or charities, statistics,
prices, distances, claimed jobs), no puffery, nothing contradicting the fixed
facts, no broken nearby links, six-word phrase overlap between any two pages
under 18%, and no local consideration repeated verbatim. All 27 pass. Run it
after touching anything in that folder. It cannot judge whether the writing is
any good — that still needs a human read.

### Still outstanding

1. **Demolition scope specifics.** Licensing and insurance are **confirmed**
   (2026-09-01) in general terms. Two
   open questions in `CONTENT_APPROVALS.md`: whether Michigan requires the
   licence number in advertising (add it to `business.ts` if so), and whether a
   certificate of insurance should be downloadable. The page claims work up to
   full structure teardowns on the owner's word — the published photos show a
   commercial interior gut-out, not a teardown, so do not let copy imply
   otherwise.
2. **About page and mission.** Untouched by request; the client is rewriting it
   and sending crew photos.
3. **Google Business Profile — created 2026-09-01, awaiting verification.** A
   new service-area listing exists with both categories, all seven counties,
   24-hour availability, the phone number, the website and a description, plus
   two job photos. The postcard carrying the verification code is in transit to
   429 S Main St; until that code is entered the listing is invisible in Search
   and Maps. The logo and three more photos are staged and must be added by
   hand. The old Business Manager account was an orphaned shell with no listing
   attached; it was created on our side, and cleaning it up is ours to do, not
   the client's. See `GBP_SETUP.md` on
   `claude/redemption-gbp-optimization-mggx9w` and `LOCAL_SEO_PLAYBOOK.md`
   Priority 1.
4. **Jobber has no photo-upload field**, so the request page tells people to
   text photos. That is a Jobber setting, not a code change.
5. ~~City page fixes~~ — **done.** All 79 findings are fixed and the pages are
   live. `CITY_PAGE_FIXES.md` is now a record, not a task list.
6. **Audit findings from the 2026-08-31 agent run**, produced and not yet
   applied. Full text in the workflow transcript at
   `~/.claude/projects/-home-user-Redemption-Cleaout/<session>/subagents/workflows/wf_f02c49c0-83a/journal.jsonl`
   (read it with `jq`, it is large). Verify each before acting — they are
   claims, not instructions. The ones that looked strongest on a first read:
   - ~~Every county and city `<title>` overruns the SERP limit~~ and ~~the home
     `<title>` renders a double pipe~~ — **both checked against the live site on
     2026-09-01 and neither reproduces.** Home serves
     `Fast, Reliable Cleanouts & Demolition | Metro Detroit`; county and city
     titles run 63–68 characters. Treat these two findings as closed.
   - **Still true:** county pages emit no `Service` schema, while service and
     city pages do. Confirmed live 2026-09-01.
   - **Still true:** the `LocalBusiness` node has no `@id`, so the copies
     emitted on every page and inside each `provider` read as separate entities
     rather than one; it also lacks `image`, which Google lists as required.
     Confirmed live 2026-09-01.
   - The home page `<h1>` is the slogan, which carries no keyword and no
     geography. **The client explicitly asked for that slogan as the headline**,
     so do not simply overwrite it — the compromise is a keyword-bearing `<h2>`
     directly beneath it. Raise it with the client rather than deciding alone.

---

## 0b. The 2026-08-31 restructure — detail

The client reviewed the site and asked for it to be simpler and to stop being
tied to Rochester. The changes below are done; the sections further down this
document that describe eight service pages, a "Who We Serve" tree, or two
Rochester city pages are **superseded** by this section, as are the equivalent
parts of `PROJECT_SUMMARY.md`.

**Structure**

- **Two services**, not eight: `/services/full-property-cleanouts` and
  `/services/demolition`. Estate, foreclosure, commercial, hoarding-related,
  move-out, and junk removal are now anchored `<h3>` sections inside the
  cleanouts page (`categories` in `src/content/services.ts`).
- **Demolition is a full service**, no longer "light demolition" — through
  full structure teardowns. **The scope claims need the owner's confirmation**;
  see the demolition entry in `CONTENT_APPROVALS.md`, which lists exactly what
  to ask.
- **Seven county pages** replace the two city pages: Oakland, Macomb, Wayne,
  St. Clair, Livingston, Washtenaw, Monroe. Each names its real communities.
- **`/who-we-serve` and its six children are gone.** Audience content folded
  into the cleanouts page.
- **`/projects` is now a flat gallery** of every photo with a lightbox, no
  per-project pages. Adding photos = adding entries to
  `src/content/gallery.ts`; nothing else. See `IMAGE_REQUIREMENTS.md`.
- **Home page cut from 13 sections to 8.** Removed: the trust strip, the
  "What brings you here today" picker, the before/after block, the
  professional-partner block, the founder blurb, and the FAQ preview.

**Every retired URL 301s** — the map is in `SEO_MAP.md` and the redirects live
in `next.config.mjs` as `legacyRedirects`. Do not delete them.

**Quoting changed.** Estimates are now given from photos over the phone, with
the final quote given on site in person. Anything that previously said "we
don't quote from photos" has been rewritten. `src/content/process.ts` is the
canonical wording — keep every other mention consistent with it.

**Still outstanding for the client:**

1. Demolition scope, licensing, and permit handling (`CONTENT_APPROVALS.md`).
2. New photos, including the recent larger demolition job.
3. The rewritten About page and mission statement, plus crew photos. `/about`
   is untouched and still carries the old founder copy.
4. Jobber has no photo-upload field. The request page tells people to text
   photos to the business number instead. Adding a file-upload field in Jobber
   would be an improvement — it is a Jobber setting, not a code change.

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
| Unit tests | 38 passing (Vitest) |
| E2E tests | 14 passing (Playwright) |
| Production build | Passing |
| Accessibility | **0 axe violations**, WCAG 2.2 AA, 14 routes × 390px and 1440px |
| Horizontal overflow | None at 390 / 768 / 1024 / 1440 / 1920 |
| Lighthouse | Desktop **100/100/100/100** · Mobile **80** perf, 100 a11y/BP/SEO — see §7 |

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

- **Lighthouse has now been run** — locally, against a production build
  (`npm run start`), not against Vercel. The earlier note that this sandbox
  has no Chrome measurement environment was wrong: Chromium ships at
  `/opt/pw-browsers/chromium-*/chrome-linux/chrome`, and Lighthouse runs
  against it fine (command in §9).

  | | Perf | A11y | Best Practices | SEO |
  |---|---|---|---|---|
  | Desktop | **100** | 100 | 100 | 100 |
  | Mobile | **80** | 100 | 100 | 100 |

  Desktop: FCP 0.3s, LCP 0.7s (the hero image), TBT 0ms, CLS 0.
  Mobile: FCP 1.7s, LCP 3.9s, TBT 200ms, CLS **0**, Speed Index 5.1s.

  **The mobile LCP element is the consent banner, not the hero.** Lighthouse
  names `body > div.fixed > p.text-sm` — the "We use analytics…" paragraph.
  `ConsentBanner` is a client component that renders `null` on the server and
  only becomes visible after hydration and a `useEffect` localStorage read, so
  under mobile emulation (4× CPU + slow 4G) it paints late, and because it is
  full-bleed on mobile (`inset-x-0 bottom-0`, versus a `max-w-sm` card at
  `sm:`) it is the largest contentful element in the viewport. LCP is
  therefore measuring "time until the consent banner hydrates" rather than
  when the page becomes useful — FCP is 1.7s and CLS is a clean 0.

  Three things worth considering, none of them done yet:
  1. Make the banner a narrow card on mobile too, as it already is at `sm:`.
     That shrinks its painted area and likely hands LCP back to the hero. It
     is a design change, so it needs a decision — but it is not metric-gaming.
  2. The only real perf opportunities Lighthouse found are framework-level and
     modest: legacy JS to modern browsers (~300ms), unused JS (~240ms),
     render-blocking resources (~150ms).
  3. Re-measure on a Vercel preview. These numbers come from a local server
     with no CDN, no Brotli, and no edge cache, so hydration starts later than
     it would in production; mobile LCP should improve there. The *structural*
     point — that a post-hydration client component is the LCP element —
     will not change on its own.

  Note the motion system interacts with this: `Reveal` elements start at
  opacity 0, and opacity-0 elements are not LCP candidates, which also
  inflates Speed Index (5.1s on mobile). That is the cost of the reveal
  choreography, and it is a deliberate design decision — not a bug.

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
- **`waitUntil: "networkidle"` is flaky in this sandbox.** `axe-check.mjs` and
  `shot.mjs` both use it, and it intermittently times out even though the route
  serves in under 5ms via curl and no requests are pending after `load`. Which
  route fails varies between runs. It is a tooling artifact, not a site bug —
  re-run, or swap `networkidle` for `load`
  (`sed 's/networkidle/load/' axe-check.mjs > axe-load.mjs`) to get a result.
  Full-page screenshots at 390px additionally exceed Chromium's height limit on
  the longer pages (the homepage is ~21,000px at phone width) and need a
  `clip`, without `fullPage`.
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

# Lighthouse — needs a running server (./rebuild.sh first)
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  npx lighthouse@12 http://127.0.0.1:3000/ --preset=desktop \
  --chrome-flags="--headless=new --no-sandbox" --output=html \
  --output-path=/tmp/lh.html          # drop --preset=desktop for mobile
OUT=/tmp/shots WIDTHS=390,768,1024,1440,1920 ROUTES="home:/" node shot.mjs
```

`shot.mjs` prints a warning for any horizontal overflow it finds.

---

## 10. Suggested next steps, in order

1. **Deploy to Vercel** to get a preview URL, then re-run Lighthouse against
   it. Lighthouse has now been run locally (§7) — desktop is 100 across the
   board, mobile perf is 80 with the consent banner as the LCP element. Decide
   on the mobile-banner width question in §7 before or after the deploy.
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
