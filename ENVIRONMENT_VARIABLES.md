# Environment Variables

Copy `.env.example` to `.env.local` for local development. In Vercel, set
these under **Project Settings → Environment Variables**. Never commit real
values.

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_JOBBER_EMBED_URL` | The embedded request form on `/request-walkthrough` | The iframe `src`. Until set, that page shows an honest fallback (call/text) instead of a broken or fake-looking form. See `JOBBER_SETUP.md`. |
| `NEXT_PUBLIC_JOBBER_REQUEST_FORM_URL` | The "open in a new tab" fallback link | Jobber's standalone request-form URL, shown alongside the embed. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 | Format `G-XXXXXXXXXX`. Analytics only loads after a visitor accepts the consent banner. |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | The "View Google Reviews" link on `/reviews` | Direct review-collection link from your Google Business Profile. |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` | Future GBP linking | Direct link to the GBP listing. Not yet wired into a specific component; reserved for use once GBP is live. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, structured data | No trailing slash. Must be `https://redemptioncleanoutservices.com` in production. |

All variables are prefixed `NEXT_PUBLIC_` because they're read on both
server and client (metadata, structured data, and the client-side Jobber
form/analytics components) — none of them are secrets. There are no
server-only secrets in this project because there is no server-side
database or third-party API key: Jobber owns lead storage, and GA only
needs a public measurement ID.

## Blank is the same as unset

Every variable here is optional, and the app treats **blank the same as
missing** — the feature simply stays in its honest "not configured" state.

This was not always true. `NEXT_PUBLIC_SITE_URL` used `??`, which only falls
back on `undefined`, so a variable that was *declared but empty* passed `""`
straight through to `new URL()` in the root layout's `metadataBase` and threw
`ERR_INVALID_URL` at module evaluation — failing the entire production build,
on every route, on every branch. `resolveSiteUrl()` in `src/lib/validation.ts`
now handles blank, whitespace, and unparseable values, and
`tests/unit/resolveSiteUrl.test.ts` locks that behaviour in.

**Watch for this when importing to Vercel.** Vercel's import screen offers to
pre-fill environment variable keys it detects from `.env.example`. Accepting
that creates keys with empty values, which is what triggered the failure above.
If you want no configuration, add no variables at all — an empty key is not the
same as an absent one in Vercel's UI, even though the app now tolerates both.
