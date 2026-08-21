# Image Requirements

## Current state

> **Note:** this section describes the *original* pre-photography state and is
> kept for the logo and OG-card notes only. Everything about placeholders is
> superseded by "Phase 3 update — Drive photo pull" further down this file,
> which is the accurate current record. `PhotoPlaceholder` has since been
> deleted, because no placement uses it any more.

- `public/images/brand/logo-master.png` — the real Redemption logo. Still
  raster, not vector. Favicon, app icons, Apple touch icon and the OG card are
  all generated from it. **A master vector logo is still outstanding.**
- `public/images/og/default.png` — a generated 1200×630 Open Graph image on a
  heritage-black background. Its dimensions are declared in
  `src/lib/seo.ts` (`OG_IMAGE_WIDTH` / `OG_IMAGE_HEIGHT`) — **update those
  constants if this card is ever regenerated at a different size.**
- Photography is now real throughout: 19 authentic job photos across 17
  placements, no placeholder components remaining. See the Phase 3 section.

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
  `about/page.tsx` — these now use real `<Image>` components; the remaining
  substitution is the founder portrait (see Phase 3).
- Use descriptive filenames (e.g. `rochester-estate-cleanout-garage-after.jpg`)
  and always provide accurate, descriptive alt text — never a generic
  "image" alt.

---

# Phase 3 update — Drive photo pull

## What is now in use (19 authentic photos, 17 placements)

The remaining photos were pulled from the client's shared Drive folder
("Redemption Cleanouts" → `Photo/Video`). The folder holds 83 files, but
roughly half are exact byte-identical duplicates (`IMG_x` / `IMG_x 2`), so
there are only ~41 unique stills; 36 were retrieved (see "Not retrieved"
below). After curation, **14 new photos** were added to the 5 already here.

All are cropped to the same 3:2 editorial ratio at 1600×1067, progressive
JPEG q84, with EXIF stripped.

| File | Used at |
|---|---|
| `branded-truck-and-dump-trailer-residential-drive.jpg` | Homepage hero |
| `branded-dump-trailer-curbside.jpg` | Final CTA background |
| `branded-truck-dump-trailer-driveway.jpg` | `/about` hero |
| `crew-branded-shirts-yard-clearing.jpg` | Why Redemption |
| `cleared-garage-bay-after.jpg` | Founder section |
| `garage-cleanout-crew-sorting-before.jpg` | Before/after — before |
| `garage-cleanout-cleared-bay-after.jpg` | Before/after — after |
| `commercial-forklift-pallet-loading.jpg` | Commercial service |
| `light-demolition-deck-removal.jpg` | Light Demolition service |
| `townhouse-patio-cleared-after.jpg` | Move-Out service, `/about` figure |
| `yard-debris-and-equipment-removal.jpg` | Foreclosure service |
| `severe-clutter-living-room-before.jpg` | Hoarding-related service |
| `metal-recycling-load-dropoff.jpg` | `/projects` hero |
| `full-property-cleanout-removal.jpg` | Full-Property service |
| `estate-cleanout-driveway-staging.jpg` | Estate service |
| `garage-cleanout-in-progress.jpg` | Residential Junk Removal service |

**Repetition is resolved.** Every image now appears once, except
`townhouse-patio-cleared-after.jpg`, which appears on two different pages.
All 8 services carry a distinct photo (three had none at all before), which
also diversifies `RecentWork`, since it reads from the service content layer.

Retained but unreferenced, as deliberate spares:
`severe-clutter-basement-before.jpg` (alternate severe-clutter frame),
`townhouse-contents-staged-before.jpg` (the before half of the townhouse
pair — see below), `pole-barn-cleared-interior.jpg` (alternate cleared space).

## Gaps closed by this pull

1. **Branded vehicle, properly composed** — three usable frames; the strongest
   now carries the homepage hero.
2. **Crew at work in branded uniform** — `crew-branded-shirts-yard-clearing.jpg`
   shows the Redemption wordmark on the shirt and cap.
3. **Commercial interiors** — `commercial-forklift-pallet-loading.jpg`.
4. **Matched before/after pairs** — two exist now (see below).

## Before/after pairs — assets exist, entries do not

Two genuine same-property pairs were found:

- **Garage** — `garage-cleanout-crew-sorting-before.jpg` /
  `garage-cleanout-cleared-bay-after.jpg`. Same garage, packed to the door
  line, then cleared to bare floor. Framing is close but not identical.
- **Townhouse patio** — `townhouse-contents-staged-before.jpg` /
  `townhouse-patio-cleared-after.jpg`. Near-identical angle; the better
  matched pair of the two.

`BeforeAfterSection` now shows the garage pair **side by side**, replacing the
"asset needed" panel. It does not use the wipe slider, because the slider only
reads correctly on identical framing.

`src/content/projects.ts` is still empty **on purpose**. A `Project` entry also
needs city, property type, challenge and outcome — none of which can be read
off a photograph without inventing them — plus written per-property owner
permission. Supply both and the slider turns itself on; no template change.

## Still missing

1. **Founder portrait of Dante.** Still the top gap. One candidate exists in
   Drive (`IMG_0421`, a hard-hat/hi-vis profile in a truck cab) but **the
   subject's identity is unconfirmed**, so it has not been used. Confirm who
   it is before publishing it as the founder.
2. **A properly matched pair shot deliberately** — identical tripod position,
   before and after, with permission captured at the same time.
3. **Dante speaking with clients or partners** — none in the folder.
4. **Interior commercial before/after** (office, retail, warehouse).

## Not retrieved (5 files)

Five HEICs could not be pulled: the Drive connector returns file content as
base64 through the tool layer and fails above roughly 6 MB. Everything
≤5.68 MB transferred; everything ≥6.52 MB failed, repeatably and
independent of concurrency. Affected: `IMG_6754`, `IMG_6756`, `IMG_6790`,
`IMG_6792`, `IMG_6872`. Retrieve them by downloading from Drive directly
(browser or `rclone`) rather than through the connector.

Also not pulled: **12 videos** (~20–28 MB each, ~250 MB total). The site has
no video component and committing them to git would be the wrong home for
them. Decide on hosting (Vimeo/YouTube/Mux) before pulling.

## Excluded during curation, and why

- `IMG_0822` (branded trailer) — the previously rejected tight crop on a dirty
  fender. Confirmed and still excluded.
- `IMG_6904` (bathroom) — trash-shock; violates the "no humiliating imagery"
  rule.
- `IMG_6911`, `IMG_6912`, `IMG_6922` — food-waste-heavy or motion-blurred.
- `IMG_1316` (crew standing on loose debris inside a trailer) — reads as an
  unsafe work practice.
- **8 phone screenshots** — not photography, and may contain private
  correspondence.
- `92b605d0-....PNG` — a marketing flyer whose before/after images appear to be
  **stock or AI-generated**. Must never be used as project photography.
- `IMG_6796.JPG` — a photo of the printed brochure, not a job photo.

## Edits applied to published frames

Two redactions, both to satisfy the "nothing identifying" rule. Neither
changes what the photograph documents:

- `branded-truck-and-dump-trailer-residential-drive.jpg` — the truck's Michigan
  plate was legible; pixelated.
- `commercial-forklift-pallet-loading.jpg` — a third-party client's sign (name,
  phone, domain) identified the commercial customer; feathered blur.

EXIF is stripped from every published frame. (The Drive originals happened to
carry no GPS, but the strip is unconditional.)

## Standing rules

- No stock photography, ever.
- Nothing identifying (documents, medication labels, family photos, plates,
  house numbers) without written permission.
- Consistent 3:2 editorial crop; `next/image` with explicit `sizes`; every
  decorative image gets `alt=""` plus `aria-hidden`, every meaningful image
  gets descriptive alt text.
- Note: `WhyRedemption`, `FounderSection` and the `/about` figure render into
  `aspect-portrait` boxes, so a 3:2 file is centre-cropped hard by CSS. Choose
  frames whose subject sits centre-horizontal for those three slots, or
  introduce a 4:5 variant (the sources are all portrait, so it is lossless).
