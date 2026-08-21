# Design System

Everything visual is centralized. Change a token here and it lands
everywhere — do not hardcode colors, spacing, type sizes, or easing in
components.

## Tokens — `tailwind.config.ts`

**Color** (brand-approved, unchanged): `redemption-red #C32C26`,
`restoration-red-dark #A91E23`, `heritage-black #0B0D0E`,
`clean-white #FFFFFF`, `steel-gray #605F5D`, `warm-concrete #E5E1DE`.

Red stays an emphasis color at roughly 15–20% of any page: one red band
(professional partners), the primary button, rules, and accents. Two
accessibility rules that also match the brand guide:

- **Never red type on a dark background.** It fails contrast (3.43:1) and the
  brand guide forbids it. `.on-dark .eyebrow` turns the label white and keeps
  red for the rule only.
- **Use `restoration-red-dark` for small red type on light surfaces.** Plain
  Redemption red reaches only 4.35:1 on warm concrete; the darker red clears
  4.5:1 on both white and concrete.

**Fluid type** — all `clamp()`, so there are no breakpoint jumps:

| Token | Range |
|---|---|
| `text-hero` | 40px → 110px |
| `text-section-xl` | 32px → 76px |
| `text-section` | 28px → 52px |
| `text-subhead` | 22px → 38px |
| `text-body-lg` | 17px → 21px |
| `text-body-base` | 16px → 18px |
| `text-label` | 13px → 15px |
| `text-numeral` | 48px → 96px |

**Measure** — `max-w-measure` (~58ch) and `max-w-measure-lg` (~68ch) keep
paragraphs in the 55–70 character band. Content maxes at `max-w-content`
(1440px) with fluid `px-gutter` (16px → 64px).

**Spacing rhythm** — `py-section` and `py-section-lg` are the only vertical
section paddings; both are fluid.

**Motion** — `ease-editorial` = `cubic-bezier(0.22, 1, 0.36, 1)`.
`duration-micro` 220ms · `duration-standard` 460ms · `duration-reveal` 760ms.

## Component classes — `src/app/globals.css`

`.btn-primary` `.btn-secondary` `.btn-on-dark` (all extend `.btn-base`,
52px min height, with `.btn-arrow` sliding 4px on hover) · `.eyebrow` and
`.eyebrow-plain` section labels · `.link-editorial` (underline wipes in on
hover) · `.img-frame` `.img-zoom` `.img-scrim` image treatments ·
`.frame-double` (the logo's vintage double-border, used for callouts) ·
`.rule-thin` · `.texture-concrete` (fine dot grid, not grunge) ·
`.container-page`.

`.on-dark` is a context class: put it on any dark panel and focus rings,
eyebrows, and labels adapt automatically.

## Motion system

One implementation, no per-component animation logic.

- `MotionGate` (in `<head>`) adds `html.motion-ready` **before first paint**,
  and only when JS runs and `prefers-reduced-motion` is not set.
- Every hidden-then-revealed state in `globals.css` is scoped to
  `.motion-ready`. So with **JS disabled or reduced motion on, the class is
  never added and all content renders in its final visible state** — nothing
  is ever gated behind an animation, and there is no flash of content.
- `<Reveal>` only observes intersection and toggles `.is-visible`.
  Variants: `up` (fade + 22px rise), `mask` (clip-path wipe),
  `lines` (per-line stagger at 90ms, for headlines).
- Hero image uses one bounded 24s scale settle — not continuous parallax.

Because full-page screenshots render from scroll 0, QA captures emulate
reduced motion so reveals photograph in their final state.

## Interior hero family

`PageHero` has three variants so routes don't all open identically:
`dark` (default), `image` (photography + directional scrim), and `light`
(warm concrete, used for legal and guide pages).

## Verification

```bash
npm run typecheck && npm run lint && npm run test && npm run build
npx playwright test
node axe-check.mjs      # WCAG 2.2 AA sweep, needs the server running
OUT=/tmp/shots WIDTHS=390,768,1024,1440,1920 ROUTES="home:/" node shot.mjs
```

`shot.mjs` reports any horizontal overflow it finds at each width.
