# Handoff — Redemption Cleanout Services website

Written for whoever picks this up next (human or AI). Read this first, then
`README.md` for setup and `DESIGN_SYSTEM.md` for anything visual.

Last updated: 2026-08-28 · Branch `claude/redemption-cleanout-vercel-preview-3fy9b1` (= `main`)

> **Read §6 first if you were told the site is not deployed.** It is.
> `redemptioncleanoutservices.com` has served live from Vercel since
> 2026-08-21, and `main` — not the older services branch — is the current
> code. Earlier copies of this file said otherwise; they were written before
> the cutover and the merges that followed never updated them.

---

## 1. What this is

Production website for **Redemption Cleanout Services** — a full-property
cleanout, estate cleanout, and commercial cleanout company in Rochester,
Michigan. Founder: Dante Terracciano.

- **Repo:** https://github.com/LivingWaterNetwork/Redemption-Cleaout
- **Branch to work from: `main`.** It carries everything — the photo library,
  the Lighthouse notes, the `resolveSiteUrl` build fix, the error boundaries
  and the SEO heading fixes — and it is what Vercel deploys to Production.
  The older `claude/redemption-cleanout-services-51t9af` is **9 commits
  behind `main`** and adds nothing but a stale copy of this file. Do not
  branch from it and do not deploy it: doing so would ship a site *older*
  than what is already live.
- **Live site:** **https://redemptioncleanoutservices.com** — deployed,
  public, and indexable. `www.` resolves as well.
- **Domain:** registered at GoDaddy; DNS points at Vercel (no transfer).
- **Hosting:** Vercel, project `redemption-cleaout`, Living Water Network
  team, Hobby plan. Production Branch is `main`. See §6.
- **CRM / system of record:** Jobber
- **Status:** Feature-complete, tested, and **deployed**. What remains is
  third-party configuration and content approvals — no code work. See §5.

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

## 5. What's still open

The site is live, so nothing below blocks *launch* any more — these are the
items that keep it from being fully useful. All configuration and approvals,
no code work. Full list in `CONTENT_APPROVALS.md`:

| Blocker | Why it matters |
|---|---|
| `NEXT_PUBLIC_JOBBER_EMBED_URL` + `..._REQUEST_FORM_URL` | The main conversion path. **Verified unset in Production on 2026-08-28** — `/request-walkthrough` is live but serving the honest call/text fallback, so every lead today arrives by phone. Highest-value item on this list now that the site is public. See `JOBBER_SETUP.md`. |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` / `..._BUSINESS_URL` | The reviews page can't invite reviews without them. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | **Verified unset in Production on 2026-08-28** — no `googletagmanager` script on the live homepage, so the launch is currently unmeasured. |
| "Fully insured" claim | The brochure claims it; the brand guide flags it unverified. **Not published anywhere on the site** until confirmed. |
| Operating hours | Not published anywhere yet. |
| Founder-story wording | Draft, pending Dante's sign-off. |
| 13 vs. 12 years real estate | Site uses 13 per the brand guide's correction; confirm. |
| Accepted / excluded materials | FAQ currently says this is pending. |
| Business email | Not published; phone/text only. |
| ~~A preview URL for the client~~ | **Resolved, and better than planned.** Send Dante the live site — https://redemptioncleanoutservices.com — rather than a preview URL. The static screenshot artifact in §11 is superseded. |

---

## 6. Deploying — done; here is the verified live state

**The site is deployed to Production and has been since 2026-08-21.** The
preview step this section used to describe was overtaken by the real cutover
and is no longer work anyone needs to do.

### Verified live on 2026-08-28

Checked directly against the public domain, not inferred from notes:

| Check | Result |
|---|---|
| `https://redemptioncleanoutservices.com/` | `HTTP/2 200`, `server: Vercel`, `x-vercel-cache: HIT` |
| `https://www.redemptioncleanoutservices.com/` | `HTTP/2 200` — the `www.` alias resolves |
| `X-Robots-Tag` | **Absent.** The site is indexable; the old `noindex` was the Preview-environment branch of `next.config.mjs` |
| `/robots.txt` | `Allow: /`, `Disallow: /api/`, plus the `Sitemap:` line |
| `/sitemap.xml` | `200`, **34 URLs** |
| Deployed code | Current with `main` — `/contact` serves the `<h2 class="eyebrow-plain">` headings introduced in `a14539a`, not the older `<p>` |
| `NEXT_PUBLIC_JOBBER_*` | **Unset** — `/request-walkthrough` renders the honest call/text fallback, no `<iframe>` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | **Unset** — no `googletagmanager` script on the homepage |

A Vercel project **`redemption-cleaout`** hosts it, under the **Living Water
Network** team on the **Hobby** plan, imported from the GitHub repo. Its
Production Branch is `main` and should stay that way.

### What went wrong, so it isn't repeated

The first build failed on every route with
`TypeError: Invalid URL ... code: 'ERR_INVALID_URL', input: ''` at
`layout.tsx:16` (`metadataBase: new URL(siteUrl)`).

Cause: **`NEXT_PUBLIC_SITE_URL` existed in the Vercel project with an empty
value.** Vercel's import screen offers to pre-fill env keys it detects from
`.env.example`, and accepting that creates blank keys. `business.ts` used
`??`, which only falls back on `undefined`, so `""` went straight into
`new URL()`.

Fixed in `0f6da52` (`resolveSiteUrl()` in `src/lib/validation.ts`, plus
`tests/unit/resolveSiteUrl.test.ts`), and that fix is **now on `main`** and
therefore in Production. Re-verified on 2026-08-28: `NEXT_PUBLIC_SITE_URL=""
npm run build` completes and prerenders all 41 routes.

The takeaway survives the fix: in Vercel, a **declared-but-blank** env var is
not the same as an absent one. Vercel's import screen offers to pre-fill keys
it detects from `.env.example`, and accepting that creates blank keys. The app
tolerates them now, but don't create them.

### Adding the remaining env vars

The three unset groups in §5 are added the same way, and none of them require
a code change:

1. Vercel → project `redemption-cleaout` → Settings → Environment Variables.
2. Add the key with a **real value** for the Production environment (values
   and meanings in `ENVIRONMENT_VARIABLES.md`). Never save a key blank.
3. Redeploy — env vars are baked in at build time for `NEXT_PUBLIC_*`, so an
   existing deployment will not pick them up. Deployments → ⋯ → Redeploy.
4. Verify on the live URL: the Jobber `<iframe>` appears on
   `/request-walkthrough`, and a `googletagmanager` script appears on the
   homepage once consent is accepted.

### Still to do on the hosting side

- **Search Console** — submit `https://redemptioncleanoutservices.com/sitemap.xml`.
  The sitemap serves 34 URLs and the site is indexable, but nothing has been
  submitted, so discovery is passive.
- **Keep the GoDaddy zone export** taken before the cutover. Only the apex `@`
  and the `www` CNAME were changed; every MX / SPF / DKIM / DMARC record was
  left alone. If Redemption's email ever misbehaves, that export is the
  rollback.

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
npm run test                # Vitest, 38 tests
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

Deployment is done (§6). The order below reflects that.

1. **Get the Jobber form URL, set it in Vercel, and redeploy** — §6. The site
   is live and taking traffic with no working form on it, so this is now the
   most expensive gap on the list. Verify an end-to-end submission afterward.
2. **Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and redeploy.** Every day the live
   site runs unmeasured is traffic data that cannot be recovered later.
3. **Submit the sitemap in Search Console** — the site is indexable and the
   sitemap serves 34 URLs, but nothing has been submitted.
4. **Get answers to the 13 client questions** — §11. Several are one-word
   answers that unblock published copy (hours, insurance, 12-vs-13 years).
5. **Re-run Lighthouse against the live URL** and compare with the local
   numbers in §7. Expect mobile LCP to improve on real CDN + Brotli; the
   structural finding (the consent banner is the LCP element) will not change
   on its own. Decide the mobile-banner-width question in §7.
6. **Photo follow-ups** — confirm who is in the founder-portrait candidate,
   pull the 5 oversized HEICs directly from Drive, decide where the 12 videos
   live, and get per-property permission so `projects.ts` can be filled (§4).

---

## 11. Open questions for the client

**Send Dante the live site — https://redemptioncleanoutservices.com.** A
static, page-by-page screenshot review was published for him earlier as a
private Claude artifact:

**https://claude.ai/code/artifact/7a631d35-c268-4d4e-a5e9-a88ed0244c6a**

That artifact is superseded — its links don't click and it predates the live
deploy. Keep it only for the 13 questions it carries, which are the same items
tracked in `CONTENT_APPROVALS.md`:

1. 13 years in real estate, or 12? (Brochure and flyer both say 12; site says 13.)
2. Fully insured? Unpublished anywhere until confirmed.
3. Operating hours?
4. Publish a business email, or phone/text only?
5. Make the Main Street address public? Only if permanently staffed and visitable.
6. Founder-story wording — approve or edit.
7. Is the hard-hat photo in Drive actually Dante? Would close the portrait gap.
8. Accepted vs. excluded materials.
9. Jobber form link.
10. Google review link + Business Profile link.
11. Which other cities get their own page.
12. Written permission from the before/after property owners.
13. OK to publish the two Grace Centers of Hope donation photos?

---

## 12. Documentation index

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
