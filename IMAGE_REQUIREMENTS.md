# Image Requirements

## Current state

- `public/images/brand/logo-source-lowres.png` — the real Redemption logo,
  extracted from the brand guide's Canva brand-kit export. Source
  resolution is only ~199×88px upscaled, so it will look soft above small
  sizes. **This is a temporary placeholder, not a production asset.**
- `public/images/og/default.png` — a generated 1200×630 Open Graph image
  using this same low-res logo on a heritage-black background. Regenerate
  once a master vector logo exists.
- Every project photo, founder photo, and crew photo across the site is an
  honest `PhotoPlaceholder` component (see
  `src/components/ui/PhotoPlaceholder.tsx`) — a plain on-brand placeholder,
  never a stock photo or fabricated image. Replace these with real
  `<Image>` components once photography is approved.

## Production assets still needed (per brand guide, Slide 25)

Request from Dante/leadership, in order of urgency:

1. **Master vector logo** (AI, EPS, or SVG) — required before any of the
   12 logo-suite variations listed below can be produced.
2. Reverse logo for dark backgrounds
3. One-color black / white / red logo
4. Simplified secondary mark + badge/shield mark (for the mobile header at
   narrow widths and the favicon, which currently uses a cropped/padded
   version of the low-res source)
5. Wordmark-only configuration
6. Social-profile avatar
7. Favicon / small digital mark
8. Embroidery-safe and vehicle/signage versions (not used on the website,
   but worth requesting in the same round)

## Photography (per brand guide, Slide 29)

**Shoot:**
- Real crews working safely, in branded uniforms
- Branded truck and equipment
- Before-and-after pairs from identical angles
- Organized loading, clean completed spaces
- Dante speaking with clients or partners
- Authentic Michigan settings, residential and commercial scale

**Avoid:**
- Humiliating or "trash shock" imagery
- Identifiable personal documents, medication labels, or family photos
  without explicit permission
- Unsafe work practices
- Staged or misrepresentative images

## Where photography plugs in once available

- `src/content/projects.ts` — add entries with real before/after image
  paths; `ProjectGallery` and `BeforeAfterComparison` will render them
  automatically once the array is non-empty.
- `src/components/sections/Hero.tsx`, `FounderSection.tsx`,
  `about/page.tsx` — replace the `PhotoPlaceholder` calls with `<Image>`.
- Use descriptive filenames (e.g. `rochester-estate-cleanout-garage-after.jpg`)
  and always provide accurate, descriptive alt text — never a generic
  "image" alt.

---

# Phase 2 update — art direction audit

## What is now in use (5 authentic photos)

All five came from the shared Drive folder and are cropped to a consistent
3:2 editorial ratio, ~1600px wide, progressive JPEG at q84.

| File | Used at |
|---|---|
| `full-property-cleanout-removal.jpg` | Homepage hero background, Full-Property service page, /projects hero, RecentWork lead tile |
| `estate-cleanout-driveway-staging.jpg` | Estate service page, situation selector, RecentWork |
| `cleared-garage-bay-after.jpg` | Commercial service page, Why Redemption, /about hero |
| `severe-clutter-basement-before.jpg` | Hoarding service page, before/after section |
| `garage-cleanout-in-progress.jpg` | Residential junk removal page, founder section, final CTA background |

**Known limitation:** with five photos across ~15 placements, each image
appears 2–4 times. This is the single biggest remaining art-direction gap.
The Drive folder contains roughly 34 more photos and 12 videos that could not
be retrieved before the connector disconnected — pulling those would resolve
almost all repetition.

## Highest-priority missing assets

1. **Founder portrait of Dante** — the founder section on the homepage and
   `/about` both currently substitute work imagery with an honest caption
   ("Founder portrait to come"). Wanted: environmental portrait, on site,
   3:2 landscape and 4:5 portrait crops, natural light, branded shirt.
2. **Matched before/after pairs, identical angle** — required to populate
   `src/content/projects.ts` and turn the before/after section into the real
   visual moment it is designed to be. Shoot the same framing before work
   starts and after completion. Needs written client permission per property.
3. **Branded vehicle and equipment, properly composed** — the one trailer
   photo available was a tight crop on a wheel and was rejected as a hero.
   Wanted: full vehicle, three-quarter angle, clean background, daylight.
4. **Crew at work in branded uniform** — the available crew photo shows
   unbranded clothing, which reads off-brand for the premium positioning.
5. **Commercial interiors** — office/retail/warehouse, before and after.

## Rejected, and why

- `IMG_0822` (branded trailer) — tight crop on a dirty fender; not a usable
  hero or section image at any size.

## Standing rules

- No stock photography, ever.
- Nothing identifying (documents, medication labels, family photos, plates,
  house numbers) without written permission.
- Consistent 3:2 editorial crop; `next/image` with explicit `sizes`; every
  decorative image gets `alt=""` plus `aria-hidden`, every meaningful image
  gets descriptive alt text.
