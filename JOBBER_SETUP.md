# Jobber Setup

Jobber is the system of record for leads on this site. The website never
stores form submissions, uploaded photos, or contact information — it only
embeds Jobber's own request form and links to it.

## 1. Get the embeddable request-form URL

In Jobber:

1. Go to **Client Hub → Online Booking** (or **Request a Service**, naming
   varies by Jobber plan).
2. Enable the public request/assessment form for this account.
3. Copy the form's public URL (it will point at `clienthub.getjobber.com`
   or a Jobber-hosted subdomain).
4. Set that URL as both:
   - `NEXT_PUBLIC_JOBBER_EMBED_URL` — used as the `<iframe>` source on
     `/request-walkthrough`.
   - `NEXT_PUBLIC_JOBBER_REQUEST_FORM_URL` — used as the "open in a new tab"
     fallback link shown beneath the embed.

If Jobber requires an allow-list of embedding domains for iframes, add
`redemptioncleanoutservices.com` and `www.redemptioncleanoutservices.com`
(and your Vercel preview domain if you want previews to embed it too).

## 2. Recommended form fields (configure in Jobber)

Per the project brief, don't require every field before showing basic
contact options — keep the form itself lean and let a human follow up for
detail. Recommended fields to configure in Jobber's form builder:

- Full name, phone, email
- Property address, property type
- Type of cleanout, approximate property size
- Areas being cleared, reason for cleanout
- Desired completion date
- Known stairs or access limitations
- Heavy items, appliances
- Light-demolition needs
- Known hazardous materials
- Items to keep or donate
- Property photos
- Decision-maker status
- Referral source
- Preferred walkthrough availability / assessment booking

## 3. Cross-domain measurement

If you want GA4 to track the handoff from redemptioncleanoutservices.com
into the Jobber-hosted form domain (`clienthub.getjobber.com`), configure
GA4's cross-domain measurement to include that domain under **Admin → Data
Streams → Configure tag settings → Configure your domains**.

## 4. Submission tracking

Jobber does not currently expose a client-side postMessage event this site
can listen for on successful submission, so the `jobber_form_submit`
analytics event defined in `src/lib/analytics.ts` is not wired to fire
automatically — only `jobber_form_view` fires (when the embed renders). If
Jobber later exposes a webhook or postMessage event for submissions, wire
it there rather than guessing from iframe `load` events, which fire on
every page load, not on a real submission.

## 5. Content Security Policy

`next.config.mjs` already allows `frame-src`, `connect-src`, and
`form-action` for `*.getjobber.com` and `clienthub.getjobber.com`. If Jobber
changes its embed domain, update the CSP there too or the iframe will be
silently blocked by the browser.
