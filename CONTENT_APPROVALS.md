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

- [ ] **Exact service area** beyond Rochester and Rochester Hills (the only
      two location pages currently published — see `src/content/serviceAreas.ts`).
- [ ] **Accepted materials.**
- [ ] **Excluded materials / hazardous-material limits.**
- [ ] **Light demolition limits** — copy already states scope is "subject to
      site conditions and approval" and excludes structural demolition and
      asbestos abatement; confirm this is sufficient or needs more limits.
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
- [ ] **Final tagline/headline selections** — this site uses the brochure's
      existing tagline ("Redeem Your Property. Reclaim Your Space.") as
      primary, per brief instruction. Other headline options from the brand
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
      intentionally empty. No fabricated reviews exist anywhere on this site.
- [ ] **Social URLs** — only Instagram (`@redemption_cleanoutservices`) is
      published, per the brief. Confirm if others should be added.
- [ ] **Final photography permissions** — now the single blocker on
      `src/content/projects.ts`. 19 authentic job photos are published across
      the site, and two matched before/after pairs exist as assets. Each pair
      needs **written permission from that property's owner** before it is
      published as a named project, plus the verified city, property type,
      challenge and outcome (these must come from Dante — they cannot be read
      off a photograph without inventing them).
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
