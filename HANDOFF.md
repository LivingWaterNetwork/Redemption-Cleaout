# Handoff — Redemption Cleanout Services website

Written for whoever picks this up next (human or AI). Read this first, then
`README.md` for setup and `DESIGN_SYSTEM.md` for anything visual.

Last updated: 2026-08-21 · Branch `claude/redemption-cleanout-services-51t9af` · Head `0f6da52`

---

## 1. What this is

Production website for **Redemption Cleanout Services** — a full-property
cleanout, estate cleanout, and commercial cleanout company in Rochester,
Michigan. Founder: Dante Terracciano.

- **Repo:** https://github.com/LivingWaterNetwork/Redemption-Cleaout
- **Working branch: `claude/redemption-cleanout-services-51t9af`, head `0f6da52`.**
  Everything is pushed and the tree is clean. **Do all work on this branch.**
  It is 3 commits ahead of `main`, and `main` does NOT contain the photo
  library, the Lighthouse notes, or the build fix. No PR has been opened yet.
- **Target domain:** `redemptioncleanoutservices.com`, registered at GoDaddy
- **Hosting:** Vercel — project exists, preview not finished (see §6)
- **CRM / system of record:** Jobber
- **Status:** Feature-complete and tested. **Not deployed.** Blocked on
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
| Unit tests | 31 passing (Vitest) |
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
| A preview URL for the client | Dante has not clicked through the real site yet. Nearest thing today is the static review page in §11. Finish the Vercel preview (§6) to replace it. |

---

## 6. Deploying — where this actually got to

### Already done

A Vercel project **`redemption-cleaout`** exists under the **Living Water
Network** team, on the **Hobby** plan, imported from the GitHub repo. Its
Production Branch is `main` and should stay that way for now.

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
`tests/unit/resolveSiteUrl.test.ts`). Verified building unset, blank, garbage,
and with a real URL. **Note the same latent bug is on `main`** — it only
resolves there when this branch merges.

### To finish the preview

1. Vercel → project `redemption-cleaout` → Settings → Environment Variables →
   **delete every variable.** There should be zero. Blank is not the same as
   absent in Vercel's UI, even though the app now tolerates both.
2. Deployments tab → create a deployment from branch
   `claude/redemption-cleanout-services-51t9af`. Do **not** merge to `main` or
   open a PR just to force a build.
3. Confirm the deployed commit is `0f6da52` or later, and that
   `/`, `/services/estate-cleanouts`, `/about`, `/projects` render with photos.
4. Check Settings → Deployment Protection. On Hobby, previews are public — the
   client should be able to open the URL with no Vercel account. Verify in a
   private window.

Preview deploys get `X-Robots-Tag: noindex, nofollow` automatically, because
`next.config.mjs` keys off `VERCEL_ENV === "preview"`. No env var needed.

### The production cutover — still untouched

The domain stays at GoDaddy; only DNS records change, no transfer.

1. Add env vars from `ENVIRONMENT_VARIABLES.md` in Vercel → Settings.
2. Add both `redemptioncleanoutservices.com` and `www.` in Vercel → Domains.
3. **Before touching GoDaddy DNS, export the existing zone.** Then change only
   the apex `@` and the `www` CNAME. Leave every MX / SPF / DKIM / DMARC /
   verification record alone or Redemption's email breaks.
4. Set apex as primary, `www` redirecting to it.
5. Test email after propagation. Then submit the sitemap in Search Console.

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

1. **Finish the Vercel preview** — §6. This is the immediate blocker: the
   client cannot click through the site yet. The build fix is already pushed;
   what remains is deleting the blank env vars and deploying the branch.
2. **Re-run Lighthouse against the preview URL** and compare with the local
   numbers in §7. Expect mobile LCP to improve; the structural finding (the
   consent banner is the LCP element) will not change on its own. Decide the
   mobile-banner-width question in §7.
3. **Get answers to the 13 client questions** — §11. Several are one-word
   answers that unblock published copy (hours, insurance, 12-vs-13 years).
4. **Get the Jobber form URL** and verify an end-to-end submission.
5. **Photo follow-ups** — confirm who is in the founder-portrait candidate,
   pull the 5 oversized HEICs directly from Drive, decide where the 12 videos
   live, and get per-property permission so `projects.ts` can be filled (§4).
6. **Then** the GoDaddy DNS cutover, per `DEPLOYMENT.md`.

---

## 11. Open questions for the client

A static, page-by-page review of the whole site was published for Dante as a
private Claude artifact:

**https://claude.ai/code/artifact/7a631d35-c268-4d4e-a5e9-a88ed0244c6a**

It is screenshots, not a live site — links don't click. Replace it with the
real preview URL once §6 is finished. It carries these 13 questions, which are
the same items tracked in `CONTENT_APPROVALS.md`:

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
