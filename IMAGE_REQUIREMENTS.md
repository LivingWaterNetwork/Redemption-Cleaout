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
| `commercial-forklift-pallet-loading.jpg` | Gallery |
| `light-demolition-deck-removal.jpg` | Demolition service |
| `townhouse-patio-cleared-after.jpg` | Gallery, `/about` figure |
| `yard-debris-and-equipment-removal.jpg` | Gallery |
| `severe-clutter-living-room-before.jpg` | Gallery |
| `metal-recycling-load-dropoff.jpg` | `/projects` hero |
| `full-property-cleanout-removal.jpg` | Full Property Cleanouts service |
| `estate-cleanout-driveway-staging.jpg` | Gallery |
| `garage-cleanout-in-progress.jpg` | Gallery |

## Converting the owner's photos

Photos come off an iPhone as HEIC, which **no browser can display**, at 3–7 MB
each. They cannot go into `public/images/photos` as-is. `tools/import-photos.py`
does the conversion:

```bash
pip install pillow pillow-heif
python3 tools/import-photos.py ~/Downloads/"Demolition 1" --prefix demolition-teardown
```

It writes progressive JPEGs capped at 1600px on the long edge (matching the
existing library) into
`public/images/photos` and prints ready-to-paste `gallery.ts` entries with the
alt text left as TODO — somebody has to look at each photo and describe it.

It also **strips EXIF**, which matters: iPhones embed GPS coordinates in every
photo, and publishing those would publish the customer's address.

## The August 2026 commercial gut-out (published)

All 13 frames from `Redemption Cleanouts / Photo/Video / Demolition 1` are on
the site, named `demolition-teardown-before-01..08` and
`demolition-teardown-after-01..05`, in that order in `gallery.ts`.

- **Before** (shot 2026-08-21, from `IMG_7067/7068/7071/7072/7074/7077/7080/7082`)
  — an intact commercial office suite: corridor, private offices, washroom,
  suspended tile ceilings, carpet.
- **After** (shot 2026-08-27, from `IMG_7121/7123/7124/7125/7126`) — the same
  building stripped to bare block walls, exposed ductwork and concrete slab.

`demolition-teardown-after-01.jpg` is the demolition page's lead image.

**How they were pulled**, since it is not obvious: the Drive MCP tool returns
file bytes as base64 in the tool result, which is far too large for a
multi-megabyte photo. The harness spills any oversized tool result to a file
under the session's `tool-results/` directory, so the recovery is
`jq -r '.content' <that file> | base64 -d > out.heic` — the bytes never pass
through the conversation. Same trick works for any future Drive binary.

The parent `Photo/Video` folder holds roughly 40 unique stills (many are stored
twice as `IMG_xxxx` and `IMG_xxxx 2`), of which 19 are published (plus the 13
gut-out frames above, which came from the `Demolition 1` subfolder). The remainder
has not been reviewed frame by frame — some are phone screenshots, and the two
Grace Centers of Hope frames are held pending approval (`CONTENT_APPROVALS.md`).
There are also 7 unique `.MOV` clips; no video is used anywhere on the site.

## Adding new photos

`src/content/gallery.ts` is the single source of truth for job photography.
Every one of the 19 files above appears on `/projects`, and the first six also
appear in the home-page "Previous Work" strip. To publish a new photo:

1. Drop the file in `public/images/photos` (naming and size rules above).
2. Add an entry to `src/content/gallery.ts` — `src`, real `alt` text,
   a short `caption`, and a `category`.
3. Position it where you want it to appear; newest work reads best near the top.

That is the whole process — no page edits, no route changes. A unit test fails
if a photo is listed twice or has alt text under 20 characters.

The two service pages each pull one image from `src/content/services.ts`
separately; those are the only photos referenced outside the gallery.

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
