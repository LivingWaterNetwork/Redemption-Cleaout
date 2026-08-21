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
