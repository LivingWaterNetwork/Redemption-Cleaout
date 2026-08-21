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
