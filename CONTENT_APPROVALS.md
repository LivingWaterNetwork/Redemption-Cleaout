# Content Approvals

This site was built from the approved brief, the approved brand & marketing
standards guide, and the founder transcript referenced in that guide. A
number of items in both source documents are explicitly marked **draft /
recommended, not yet approved**. This file is the master checklist of what
Dante Terracciano and Redemption leadership must confirm before it's treated
as final brand truth or published more broadly than it already is on this
site.

Nothing below has been invented independently of the brief or brand guide —
each item traces to a specific source. Check items off as they're approved,
and update the linked content file when a decision is made.

## Business facts

- [ ] **Public use of 429 South Main Street.** Currently withheld — see
      `src/content/business.ts` (`publicAddressEnabled: false`). Requires
      confirmation of permanent operation, staffing during posted hours,
      customer visitability, permanent signage, and GBP compliance.
- [ ] **Operating hours** — not yet defined anywhere on the site.
- [ ] **"Fully insured" status** — the original brochure claims "Fully
      Insured"; the brand guide flags this as unverified. Not published
      anywhere on this site until confirmed. (Re-confirmed during the photo
      pull: the brochure in Drive does read "Fully insured - Local" under
      "OUR COMMITMENT TO YOU". Still unverified, still unpublished.)
- [ ] **Any licensing claims.**
- [ ] **Free estimate / free walkthrough policy** wording.
- [ ] **Same-day or next-day availability** claims.
- [ ] **13 vs. 12 years of real-estate experience** — the brochure says 12,
      the founder transcript says 13. This site uses 13 throughout,
      per the brand guide's correction — confirm before wider use.
      **New evidence (photo pull):** two client-supplied assets in the Drive
      folder both say **12** — the brochure (`IMG_6796`, "12 YEARS IN
      REALESTATE SALES") and a marketing flyer (`92b605d0-….PNG`, "12 years
      real estate expertise"). The only source for 13 is the brand guide's
      correction. Worth re-confirming directly with Dante; the weight of the
      client's own material currently favours 12.

## Service scope

- [x] **Exact service area** — confirmed by the client as all of Metro
      Detroit: Macomb, Oakland, St. Clair, Wayne, Monroe, Washtenaw, and
      Livingston counties. One page per county in `src/content/serviceAreas.ts`;
      the city lists on each page are illustrative, not exhaustive.
- [ ] **Accepted materials.**
- [ ] **Excluded materials / hazardous-material limits.**
- [~] **Demolition scope and licensing** — PARTIALLY CONFIRMED 2026-08-31: the
      owner states Redemption holds all licensing and insurance required where
      it operates. The site now says "licensed and insured" on the demolition
      page and in the FAQ, phrased generally because that is exactly what was
      confirmed — no licence number, class, or carrier is claimed anywhere.
      **Two things still to check before launch:**
      1. Michigan requires a residential builder or maintenance-and-alteration
         licence for much of this work, and licence holders are generally
         expected to show the number in advertising. Confirm with LARA (or the
         client's own licensing contact) whether the number must appear on the
         site, and add it to `business.ts` if so.
      2. Whether a certificate of insurance should be downloadable or simply
         offered on request. The FAQ currently offers it on request.
      The original scope questions below still stand.

      ORIGINAL NOTE — The client asked for
      demolition to be promoted from "light demolition" to a full service
      ("currently taking on larger projects"), so `src/content/services.ts`
      now advertises interior gut-outs, garages, decks, sheds, pole barns,
      concrete removal, and **full structure teardowns**. Written
      conservatively pending confirmation of:
      - Which of those Redemption actually performs, and any size ceiling.
      - Whether Redemption holds a Michigan residential builder / maintenance
        and alteration contractor licence, and whether any demolition claim
        needs a licence number displayed.
      - Permits: the copy says only that a permit requirement is flagged at
        the walkthrough and "who is pulling it" is confirmed before
        scheduling. It does **not** claim Redemption pulls permits. Confirm
        whether it should.
      - Insurance limits for structural work, if the site should state them.
      The carve-outs kept in `mayRequireSpecialist` — licensed asbestos/lead
      abatement first, utility disconnects by the provider, engineered shoring
      by a structural engineer — should not be removed without legal review.
- [ ] **Donation and recycling practices** — copy currently says items are
      sorted "where practical"; confirm specifics if a firmer claim is wanted.

## Brand & founder story

- [ ] **Founder-story wording** — `src/content/founderStory.ts` contains the
      "public short version" and "Our Story" version drafted in the brand
      guide (Slide 19). Both require Dante's explicit sign-off before wider
      distribution. No addiction/recovery detail is published anywhere on
      this site.
- [ ] **Real-estate experience wording** (13 years, family brokerage/home-building
      background) — confirm exact framing.
- [ ] **Mission, vision, purpose, and values language** (brand guide slides
      7–8) — not yet used verbatim anywhere on this site; draft only.
- [x] **Final tagline/headline selections** — the client set the main slogan
      as "Redeem Your Property. Redeem Your Space." It is the home-page H1 and
      `business.legalTagline`. (It replaces the brochure's "…Reclaim Your
      Space.") Other headline options from the brand
      guide (Slide 16) were not used and remain options only.
- [ ] **Team size** — not published anywhere on this site.
- [ ] **Response-time promise** — not published as a specific commitment
      anywhere on this site.

## Third-party configuration

- [ ] **Jobber form URL** — `NEXT_PUBLIC_JOBBER_EMBED_URL` / `NEXT_PUBLIC_JOBBER_REQUEST_FORM_URL`
      are unset. See `JOBBER_SETUP.md`.
- [ ] **Google review URL** — `NEXT_PUBLIC_GOOGLE_REVIEW_URL` unset.
- [ ] **Google Business Profile URL** — `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` unset.
- [ ] **Official business email** — no business email is published anywhere
      on this site; only phone/text.
- [ ] **Authentic testimonials** — `src/content/testimonials.ts` is
      intentionally empty and no fabricated reviews exist anywhere on this
      site. Confirmed 2026-08-31: past clients have agreed to leave Google
      reviews once the Business Profile is live, so the blocker is the GBP,
      not the clients. `/reviews` now carries a "Leave a Google Review" button
      that appears the moment `NEXT_PUBLIC_GOOGLE_REVIEW_URL` is set — use the
      **write-a-review** short link, not the listing URL. Adding a written
      testimonial to the site is one entry in `testimonials.ts`; the page
      switches out of its empty state automatically.
- [ ] **Social URLs** — only Instagram (`@redemption_cleanoutservices`) is
      published, per the brief. Confirm if others should be added.
- [x] **Property-owner permission for job photography — GRANTED.** Confirmed
      2026-08-31: permission is held from every client whose property appears.
      This clears the last gate on publishing job photos, including captions
      naming a city or property type if the owner later supplies those facts
      (they must come from Dante — they cannot be read off a photograph).
      It does **not** extend to the Grace Centers of Hope frames below: that
      approval has to come from Grace Centers, not from a property owner.
- [x] **Project photography** — the client asked for a plain gallery of every
      photo with no per-project pages, and confirmed more photos are coming.
      All 19 job photos are now published on `/projects` from
      `src/content/gallery.ts`. Nothing is captioned with a city, owner, or
      identifying detail, so no per-property permission gate applies to the
      gallery as built. If a photo is ever labelled with an address, owner, or
      client name, that specific caption needs the owner's written permission
      first.
- [x] **The demolition job photos — PUBLISHED.** All 13 frames from
      `Photo/Video / Demolition 1` are on the site: 8 before (shot 2026-08-21)
      and 5 after (2026-08-27), converted from HEIC and added to
      `src/content/gallery.ts`. `demolition-teardown-after-01.jpg` is now the
      demolition page's lead image, replacing the deck photo.
      What they actually show, which matters for how the page is written: a
      fully partitioned **commercial office suite** — corridor, private
      offices, washroom, suspended ceilings, carpet — taken back to bare block
      walls and concrete slab. It is a large interior gut-out, not a structure
      teardown. Any copy implying these photos show a teardown would be wrong.
      Checked for GPS: these particular files carry **no** GPS EXIF, so nothing
      was exposed. `tools/import-photos.py` strips EXIF regardless, which is
      the safeguard for future photos that do carry it.
- [ ] **Donation-partner photography** — two strong frames in Drive show a
      **Grace Centers of Hope** thrift-store truck being loaded with donated
      items. They are genuine and support the donation story, but publishing
      them puts a third party's branding on the site and implies a
      relationship. **Not used anywhere pending approval** from both Dante and
      Grace Centers of Hope.
- [ ] **Founder-portrait candidate** — `IMG_0421` in Drive shows a person in a
      hard hat and hi-vis in a truck cab. It would fill the top remaining
      asset gap, but the subject is unidentified. **Not used.** Confirm
      whether this is Dante before publishing it as a founder portrait.
- [ ] **Do not use the Drive marketing flyer as photography** —
      `92b605d0-….PNG` is a designed flyer whose before/after images appear to
      be stock or AI-generated. It must never be used as project imagery; it
      would breach the no-fabricated-content rule.

## Production assets still needed (per brand guide, Slide 25 & 38)

- [ ] Master vector logo (AI/EPS/SVG) and the full 12-mark logo suite. This
      site currently uses the real (but low-resolution, ~199×88px upscaled)
      logo pulled from the brand guide as a placeholder — see
      `public/images/brand/`.
- [ ] Commercial font license for Bison Bold, or confirmation to continue
      using the commercially-safe substitutes already implemented (Oswald,
      PT Sans Narrow, Source Sans 3).
- [ ] Photo & video library (crew, vehicles, before/after, founder).
