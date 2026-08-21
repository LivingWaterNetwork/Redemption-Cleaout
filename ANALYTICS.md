# Analytics

## Stack

- **GA4** via `src/components/Analytics.tsx`, gated behind visitor consent
  (`src/components/ConsentBanner.tsx`). The GA script tags never load until
  a visitor clicks "Accept."
- **Search Console** — not wired into the codebase; verify the domain and
  submit `https://redemptioncleanoutservices.com/sitemap.xml` manually
  after launch (see `DEPLOYMENT.md`).
- **Google Ads conversion tracking** — not yet configured. Once a
  conversion action exists in Google Ads, add its tag the same way GA4 is
  added in `Analytics.tsx`, still gated by consent.
- **Call tracking** — not implemented. If a call-tracking number/service is
  adopted later, swap `business.phoneDisplay`/`phoneHref` in
  `src/content/business.ts` for the tracking number so every `tel:`/`sms:`
  link across the site updates from one place.
- **UTM persistence** — not implemented in this phase. Recommended
  approach if added: capture `utm_*` params into `sessionStorage` on first
  load and append them to the Jobber request-form URL as query params (most
  Jobber embeds pass query params through).

## Event catalog

Every event is defined in `src/lib/analytics.ts` as a typed union — this is
the single source of truth; do not fire an ad-hoc `gtag` call anywhere else
in the codebase.

| Event | Fires when | File |
|---|---|---|
| `click_call` | A call link/button is clicked | Header, UtilityBar, MobileActionBar, CallToAction |
| `click_text` | A text link/button is clicked | MobileActionBar, CallToAction |
| `click_request_walkthrough` | A "Request a Walkthrough" CTA is clicked | Header, MobileActionBar, CallToAction |
| `jobber_form_view` | The Jobber embed renders (config present) | JobberRequestForm |
| `jobber_form_submit` | Not currently fired — see JOBBER_SETUP.md §4 | JobberRequestForm (reserved) |
| `click_professional_partner` | "Discuss a Referral Partnership" is clicked | ProfessionalPartnerSection |
| `view_service` | Reserved for a service page view — not yet fired automatically to avoid double-counting with GA4's own pageview | — |
| `view_project` | Reserved for a project detail view once `/projects` has real entries | — |
| `click_google_reviews` | Reserved for the "View Google Reviews" link | ReviewSection (not yet wired) |
| `download_guide` | Reserved for a future downloadable PDF guide | — |

Several events are defined but not yet fired everywhere the brief lists
them (`view_service`, `view_project`, `click_google_reviews`,
`download_guide`) because the underlying content (project entries, a
downloadable guide) doesn't exist yet — wire them up when that content
ships, using the same `trackEvent()` helper.

## Privacy rule

**Never** pass form field values, names, phone numbers, email addresses,
physical addresses, or uploaded-image data as event parameters. Every
`params` object in `AnalyticsEvent` (see `src/lib/analytics.ts`) is
restricted to non-PII context like `location` or `service` — keep it that
way when adding new events.
