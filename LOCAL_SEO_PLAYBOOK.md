# Local SEO Playbook — Redemption Cleanout Services

Operational work, in priority order. This is not a code document: most of what
follows happens in Google's tools, on the phone with past customers, and on
directory websites. Where a step touches the site, the file is named.

**The honest framing.** The website is built and it is not the thing that wins
local search. For a service-area contractor, the two dominant factors are a
complete, verified **Google Business Profile** and a steady stream of **real
Google reviews**. Neither is a code change, neither can be shipped from this
repo, and no amount of on-page work substitutes for them. The site's job is to
be the credible, consistent thing the profile points at and the thing that
converts the click into a phone call. Right now there is **no Google Business
Profile at all** — that is the single biggest gap, and everything below is
ordered around closing it.

Nothing here promises a ranking or a date. Local results move on Google's
schedule, not ours.

---

## Priority 1 — Create the Google Business Profile

Do this first. Past customers have already agreed to leave reviews (confirmed
2026-08-31 in `CONTENT_APPROVALS.md`) and they have nowhere to leave them.

Go to `business.google.com` and create the profile. The details that matter:

**Business name.** Exactly `Redemption Cleanout Services`. Nothing appended —
not "Metro Detroit", not "Cleanouts & Demolition", not a city. See the
"How this goes wrong" section; a keyword-stuffed name is the most commonly
reported and most commonly penalised local-SEO violation there is.

**This is a service-area business — hide the address.** During setup Google
asks "Do you want to add a location customers can visit?" The answer is **no**.
Redemption works at the customer's property; there is no public storefront.
Google will still ask for a mailing address to verify you — enter it, then
make sure the option to **hide the address from customers** is selected so the
listing shows a service area instead of a pin at a door. Publishing an address
where no staff sit during posted hours and no customer can walk in is grounds
for suspension.

This mirrors the site exactly: `src/content/business.ts` has
`publicAddressEnabled: false`, so `429 South Main Street` is not rendered
anywhere, and `src/lib/structuredData.ts` omits the address from the
`LocalBusiness` schema. Do not publish it on Google while the site withholds
it. If leadership ever wants a public address, that is the five-point checklist
in `business.ts` and an entry in `CONTENT_APPROVALS.md` — flip both together or
neither.

**Service area — set all seven counties.** Add them as areas served:

Macomb, Oakland, St. Clair, Wayne, Monroe, Washtenaw, Livingston — all Michigan.

Google's picker will accept counties; use the county entries rather than a long
list of cities. This is the same list as `business.serviceRegionSummary` and the
seven entries in `src/content/serviceAreas.ts`.

**Categories — match the two services.** The site sells exactly two things
(`src/content/services.ts`): full property cleanouts and demolition.

- Primary category: the closest Google category to cleanout work — **Junk
  Removal Service** is the standard match for full property cleanouts. Check
  the live category list at signup; Google renames these.
- Secondary category: **Demolition Contractor**.

Do not bolt on categories for work Redemption does not do. Extra categories
dilute relevance and invite a suspension if the work isn't real.

**Fill in the rest completely.** Phone `(248) 321-9609` (must match
`business.phoneDisplay`). Website `https://redemptioncleanoutservices.com`.
Services list: add the cleanout types the site already anchors on
`/services/full-property-cleanouts` — estate, foreclosure, commercial,
hoarding, move-out, residential junk removal — plus the demolition scope from
the demolition page. Description in the business's own voice, no keyword lists.

**Hours are an open item.** `CONTENT_APPROVALS.md` records that operating hours
are not defined anywhere. Google will want them. Get them from Dante before
setup rather than guessing — hours on the profile that the phone doesn't honour
generate one-star reviews.

**Verification** is usually video or postcard for a service-area business.
Expect it to take days to a couple of weeks. Budget for it; nothing downstream
starts until the profile is live.

### Why the profile and the site must agree

Google cross-checks the profile against the website. Same name, same phone,
same service area, same services, same address treatment. A profile that claims
a Rochester storefront while the site says "Serves Metro Detroit", or a profile
covering three counties while the site publishes seven, is an inconsistency
Google can see, and the cheapest way to look untrustworthy to an algorithm that
is specifically built to detect fake local businesses. The site is already
internally consistent — seven counties in `serviceAreas.ts`, seven
`AdministrativeArea` nodes in the `LocalBusiness` and `Service` schema, no
address anywhere. Make the profile match that, and keep them matched whenever
either changes.

---

## Priority 2 — Wire the review links into the site, then get the first reviews

Once the profile is verified, it hands you two different URLs. The site uses
both, and they are not interchangeable:

| Variable | Which URL | Where it appears |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | The **write-a-review** short link, from the profile's "Ask for reviews" button | The "Leave a Google Review" button on `/reviews` |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` | The **listing** URL, for reading reviews | The "See the Google listing" link on `/reviews` |

Set both in Vercel under Project Settings → Environment Variables, then
redeploy. See `ENVIRONMENT_VARIABLES.md` — and note the warning there: a
declared-but-empty variable is not the same as an absent one in Vercel's UI.
Blank is treated as unset by the app, and `/reviews` simply stays in its honest
empty state, so a typo fails quietly rather than loudly. Click both buttons on
the live site after deploying and confirm each goes where it should.

Then tick the two "Google review URL" / "Google Business Profile URL" boxes in
`CONTENT_APPROVALS.md`.

**Getting the reviews.** The customers are already willing; the ask just has to
be easy.

1. Pull the past-customer list out of Jobber. Jobber holds the client records
   and job history — that is the list.
2. Text or call each one individually. Text works better for this trade: short,
   personal, names the job. Send the **write-a-review short link** directly, not
   a link to the homepage and not a link to `/reviews` — every extra tap loses
   people.
3. Space them out. Six reviews landing in one hour on a two-week-old profile
   looks manufactured and can get them filtered. A handful a week is fine.
4. Never offer anything in exchange — no discount, no gift card, no entry into
   a drawing. That is against Google's policy and it is the kind of thing a
   competitor screenshots.
5. Reply to every review, good or bad, in a few sentences. Replies are public
   and they are the only part of a review you control.
6. Going forward, make the ask part of the job: after the final walkthrough,
   while the customer is standing in the empty property. Jobber can send it as
   a follow-up on job completion — set that up once and it runs itself.

**A note on the site.** There is deliberately no review or aggregate-rating
schema anywhere (`SEO_MAP.md`), and `src/content/testimonials.ts` is empty,
because no authentic first-party rating data exists. When a customer gives
permission to quote them on the site, that is one entry in `testimonials.ts`
and the page leaves its empty state automatically. Do not invent one, and do
not add rating schema for reviews that live on Google.

---

## Priority 3 — NAP consistency and citations

NAP = Name, Address, Phone. For a service-area business it is really Name,
Service Area, Phone. The rule is that the three strings are **byte-identical
everywhere** they appear:

- Name: `Redemption Cleanout Services`
- Phone: `(248) 321-9609`
- Address: not published — "Serves Metro Detroit" / the seven counties

Not "Redemption Cleanout Svcs.", not `248-321-9609` in one place and
`(248) 321-9609` in another. Google matches these mentions across the web to
decide the business is real; near-misses count for less than exact matches.

Everything on the site already flows from `src/content/business.ts`, so the
site is consistent by construction. The inconsistency risk is off-site.

**Citations worth building, for a Michigan contractor, roughly in order:**

1. **Google Business Profile** — done in Priority 1.
2. **Bing Places** — free, second-largest, and feeds Bing/Copilot answers.
3. **Apple Business Connect** — free; this is what Apple Maps and iPhone
   directions use. Real call volume for trades.
4. **Facebook Page** — even if it is barely used. It is a citation and people
   check it to see if a contractor is real.
5. **Yelp** — set it up and claim it, service-area configured the same way.
   You do not have to love Yelp; leaving an unclaimed listing is worse.
6. **Nextdoor Business** — genuinely strong for residential cleanouts in the
   Oakland/Macomb suburbs.
7. **Angi / Thumbtack / HomeAdvisor** — optional and they will sell you leads;
   the free listing is still a citation. Decide deliberately whether to engage.
8. **Better Business Bureau** — optional, paid for accreditation, free basic
   listing.
9. **Local chambers of commerce** — Rochester Regional, and the chambers in
   whichever counties actually produce work. Real local links, modest cost.
10. **Michigan-specific**: if and when a LARA residential builder / maintenance
    and alteration licence number is confirmed (open item in
    `CONTENT_APPROVALS.md`), it should appear consistently in listings that ask
    for it — and possibly on the site. Resolve that item before publishing a
    number anywhere.

Add the Instagram profile (`@redemption_cleanoutservices`) to every listing
that takes a social URL, and add the website to every listing that takes one.

**Keep a record.** A single spreadsheet with one row per directory — URL,
login, date claimed — is the difference between fixing a wrong phone number in
ten minutes and never finding it. If the phone number ever changes, that
spreadsheet is the checklist, plus `business.ts` (which updates every `tel:`
and `sms:` link on the site from one place).

---

## Priority 4 — Search Console, Bing Webmaster, sitemap

Do this at launch, the day the site goes live.

**Google Search Console** (`search.google.com/search-console`)

1. Add a **Domain** property for `redemptioncleanoutservices.com` (not a URL
   prefix property — the domain property covers www, non-www, http and https in
   one).
2. Verify by DNS TXT record at the registrar. Vercel's DNS panel if the domain
   is on Vercel.
3. Submit the sitemap: `https://redemptioncleanoutservices.com/sitemap.xml`.
   It is generated by `src/app/sitemap.ts`; `src/app/robots.ts` points at it.
4. Confirm `robots.ts` is serving an allow (not a blanket disallow left over
   from a preview deployment) by loading
   `https://redemptioncleanoutservices.com/robots.txt` in a browser.
5. Link the Search Console property to the Google Business Profile and to GA4.

**Bing Webmaster Tools** (`bing.com/webmasters`) — sign in and import the
Search Console property; it copies the verification and the sitemap in one
step. Two minutes of work, and it feeds Bing, DuckDuckGo, and Copilot.

**What to actually use Search Console for**, monthly: the Performance report
filtered to queries containing a city or county name (that tells you whether
the city pages are earning impressions), and the Pages report for anything that
has fallen out of the index.

---

## Priority 5 — The retired URLs and their redirects, after launch

The two-pillar restructure retired a set of URLs. They are 301'd in
`next.config.mjs` (`legacyRedirects`), and the full From → To table is in
`SEO_MAP.md`. A test in `tests/e2e/request-walkthrough.spec.ts` fails if the
first three stop resolving.

After launch:

1. **Verify each redirect resolves on the live domain.** Load a few by hand —
   `/services/estate-cleanouts`, `/services/light-demolition`,
   `/service-areas/rochester-mi` — and confirm you land on the right page with
   the right anchor.
2. **Run URL Inspection in Search Console on each retired URL** and request
   indexing. This is how Google picks up the 301s in days rather than waiting
   for a recrawl.
3. **Do not remove the redirects and do not downgrade them to 302.** They carry
   whatever ranking signal those URLs earned. They are permanent.
4. **Fix external links you control.** Any of the old URLs in the Instagram
   bio, in Jobber email templates, on a printed brochure or a business card,
   or in a directory listing — update them to the live URL. A redirect works,
   but a direct link is better and there is no reason to keep the hop.
5. **Watch Search Console's "Not found (404)" report** for a few weeks. Any
   old URL that was missed from the redirect table shows up there; add it to
   `legacyRedirects` and redeploy.

---

## Priority 6 — The ongoing cadence

Local SEO for a contractor is maintenance, not a project. This is what actually
sustains it.

### Weekly (about 30 minutes)

- **Post one job to the Google Business Profile.** A before/after pair from a
  recent job, two or three sentences, a call-to-action button pointing at the
  site. This is the highest-value recurring task after reviews — it signals the
  profile is active and it is the only place photos of the work show up
  directly in search results.
- **Post the same photos to Instagram** (`@redemption_cleanoutservices`).
  Same assets, different crop; no reason to shoot twice.
- **Ask the week's completed jobs for a review**, via the Jobber follow-up.
- **Reply to any new review**, within a day or two.
- **Upload the week's photos to the profile's photo section** as well as the
  post — the profile has both, and both are looked at.

Photo rules, which are not negotiable and come straight from
`CONTENT_APPROVALS.md`: property-owner permission is held for job photography.
No caption naming a city, owner, address, or client unless Dante supplies that
fact in writing — it cannot be read off a photograph. Nothing showing the Grace
Centers of Hope truck until that separate approval exists. And EXIF: the site's
`tools/import-photos.py` strips it, but a phone photo posted straight to Google
or Instagram can carry GPS. Strip it or post from an app that does.

### Monthly (about an hour)

- **Search Console**: queries by city/county, pages losing impressions, any new
  404s or coverage errors.
- **GA4**: the events below.
- **Review count and average**, written down. Trend matters more than the
  number.
- **Search `Redemption Cleanout Services` and check the top results** — that is
  the brand-search experience a referred customer actually sees.
- **Spot-check three citations** against the NAP standard. Rotate through the
  list; the whole set gets audited over a few months.
- **One competitor check**: search "property cleanout <a county>" and look at
  who is in the map pack and how many reviews they have. Not to copy — to know
  the bar.

### Quarterly

- **Re-read the profile end to end.** Categories, services, service area,
  hours, description. Google adds fields and occasionally edits listings on
  its own; unwanted "suggested edits" get applied silently.
- **Consider one new city page** — but only where there is genuine local
  substance. The standard in `SEO_MAP.md` is explicit: swap in a different
  city's name and the text should read obviously wrong. A city page that fails
  that test is a doorway page and does net harm.
- **Work through the open items in `CONTENT_APPROVALS.md`.** Hours, insurance
  wording, licensing, the 12-vs-13-years discrepancy. Each one closed is a
  claim the site can make honestly.

---

## Measuring whether any of this is working

The site already fires a typed set of events, defined in `src/lib/analytics.ts`
and catalogued in `ANALYTICS.md`. GA4 only loads after a visitor accepts the
consent banner, so these are consented-visitor counts, not total traffic —
treat them as a trend line, not a census.

The ones that mean something here:

| Event | What it tells you |
|---|---|
| `click_call` | The single best proxy for a lead. This is a phone-and-text business. |
| `click_text` | Same, and for cleanouts it often outruns calls. |
| `click_request_walkthrough` | Intent to use the form path. |
| `jobber_form_view` | The Jobber embed actually rendered — if this is near zero while `click_request_walkthrough` is not, the embed is misconfigured. |
| `click_leave_review` | Whether the site is feeding the review engine. Watch this one specifically after Priority 2. |
| `click_google_reviews` | Visitors going off to read the listing — a trust-checking behaviour. |

`jobber_form_submit`, `view_service` and `download_guide` are defined but not
fired yet; don't build a report on them.

**Alongside GA4, the numbers Google gives you free:**

- **Google Business Profile insights**: calls from the listing, direction
  requests, website clicks, and the searches people used to find it. For a
  service-area business this is often a larger share of the calls than the
  website is.
- **Search Console**: impressions and clicks by query and page.
- **Jobber**: the actual truth. Requests received, quotes sent, jobs booked,
  revenue. Everything above is a proxy for this.

**The one number to keep.** A simple monthly line: *reviews / GBP calls /
website `click_call` + `click_text` / Jobber requests / jobs booked.* Five
figures a month, in a spreadsheet. After three or four months it says more than
any dashboard will.

Two things worth knowing about attribution. Call tracking is not implemented —
you cannot currently tell a GBP call from a website call at the phone
(`ANALYTICS.md` describes how to add a tracking number later, by swapping
`business.phoneHref` in `business.ts` so every link updates from one place).
And a fair share of people will see the profile, then type the business name
into Google directly; that shows up as brand search, not as an SEO win, even
though it is one.

---

## How this goes wrong for contractors

These are the failure modes that matter in this trade. Each one is real, each
one is cheap to avoid, and several of them are unrecoverable.

**Fake reviews.** Reviews from friends who were never customers, reviews bought
from a service, reviews left from the shop's own devices. Google filters an
increasing share of them, competitors report them, and a profile caught doing
it can be suspended — taking the real reviews with it. Redemption does not need
this: real customers have already agreed to leave real reviews. Also on this
list: offering a discount or gift for a review, and reviewing your own
competitors. Do not do any of it.

**Keyword-stuffed business name.** "Redemption Cleanout Services — Metro
Detroit Junk Removal & Demolition" will rank a little better for a while and it
is a policy violation that any competitor can report in about ninety seconds.
The name field is the legal, on-the-truck name. Nothing else.

**Inconsistent NAP.** The slow one. A phone number that changed three years ago
still living on four directories, the name abbreviated on two more, a former
address on one. Each mismatch is a small dent in the signal that this is one
real business. It never causes a dramatic drop; it just quietly caps the
ceiling. The spreadsheet in Priority 3 is the fix.

**Doorway pages.** The classic contractor mistake: one page per city across
seven counties, identical text with the name swapped. Google treats it as a
doorway-page pattern, demotes the pages, and the drag lands on the whole
domain — not just the thin pages. This site is already built against it:
county-level coverage with city pages only where there is real local substance
(`SEO_MAP.md`, and the note at the top of `src/content/serviceAreas.ts`
explicitly forbidding copy-and-swap). The temptation will arrive as "we should
have a page for every suburb." The answer is no, unless someone will write
genuinely city-specific content for it.

**Claiming an address you don't have.** A virtual office, a relative's house, a
UPS box, a co-working desk. Google verifies service-area businesses precisely
because this is common, and a suspension takes the reviews down with it. The
site withholds `429 South Main Street` for exactly this reason; the profile
must too.

**Unverifiable claims in copy.** "Fully insured", "licensed", "same-day
service", a specific years-in-business figure. `CONTENT_APPROVALS.md` tracks
each of these as an open item for a reason. They are not an SEO issue directly
— they are a credibility and legal issue that becomes an SEO issue the first
time a customer disputes one in a public review.

**Setting it up and stopping.** A profile created, verified, and then untouched
for eight months will lose ground to a competitor posting weekly and collecting
two reviews a month. The weekly cadence above is thirty minutes. That is the
whole competitive moat in this trade, and most contractors do not do it.

---

## Sequence, at a glance

1. Create the Google Business Profile — address hidden, seven counties, two
   categories, exact name. Verify it.
2. Set `NEXT_PUBLIC_GOOGLE_REVIEW_URL` and `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`,
   redeploy, click both buttons on `/reviews`.
3. Work the Jobber past-customer list for reviews, a few a week.
4. Search Console + Bing Webmaster, submit the sitemap.
5. Verify the 301s live and URL-inspect the retired URLs.
6. Claim the citations, NAP-identical, and log them in a spreadsheet.
7. Run the weekly and monthly cadence, and keep the five-number monthly line.

Steps 1 through 3 are the ones that move the needle. Everything after is
protection and compounding.
