# Deployment

The domain (`redemptioncleanoutservices.com`) stays registered at GoDaddy.
Only DNS records change — there is no domain transfer involved in any of
this.

## 1. Connect the repo to Vercel

1. In Vercel, **Add New → Project**, import
   `LivingWaterNetwork/redemption-cleaout` from GitHub.
2. Framework preset: Next.js (auto-detected).
3. Add the environment variables from `ENVIRONMENT_VARIABLES.md` under
   **Project Settings → Environment Variables** (Production, and Preview if
   you want previews to have working analytics/Jobber links too — though
   previews are `noindex` by default, see `next.config.mjs` and `robots.ts`).
4. Deploy. Confirm the `*.vercel.app` preview URL renders correctly before
   touching DNS.

## 2. Add the domains in Vercel

1. **Project Settings → Domains → Add**: `redemptioncleanoutservices.com`.
2. Add `www.redemptioncleanoutservices.com` as well.
3. Vercel will show the DNS records it needs (typically an `A`/`ALIAS`
   record for the apex domain pointing at Vercel's IP, and a `CNAME` for
   `www` pointing at `cname.vercel-dns.com`). Copy these exactly — they can
   change over time, so use what Vercel's dashboard shows you at the time
   you do this, not a hardcoded value from this doc.

## 3. Update DNS at GoDaddy — carefully

**Do not delete or replace the whole DNS zone.** Change only the records
Vercel needs.

1. Log into GoDaddy → **My Products → DNS** for
   `redemptioncleanoutservices.com`.
2. **Before changing anything**, screenshot or export the full current
   record list. In particular, note and preserve every:
   - `MX` record (mail routing — breaking this breaks incoming email)
   - `TXT` record, especially `SPF` (`v=spf1 ...`) and `DKIM`
     (`*._domainkey`) records, and any domain-verification `TXT` records
     (Google Search Console, Microsoft 365, etc.)
   - `CNAME`/`TXT` records for `DMARC` (`_dmarc`)
   - Any other verification records for services you already use
3. Change **only**:
   - The apex (`@`) record — update to whatever Vercel's dashboard
     specifies (commonly an `A` record to Vercel's IP, or `ALIAS`/`ANAME`
     if GoDaddy supports it for the apex).
   - The `www` `CNAME` record — point it at `cname.vercel-dns.com` (or
     whatever Vercel's dashboard currently specifies).
4. Leave every `MX`, `SPF`, `DKIM`, `DMARC`, and verification record
   untouched.

## 4. Choose one canonical host and redirect the other

`NEXT_PUBLIC_SITE_URL` in this project is set to the apex domain
(`https://redemptioncleanoutservices.com`, no `www`). In Vercel's Domains
settings, set the apex as the **primary** domain and `www` as a redirect
to it (Vercel does this with one click when both domains are added — look
for the "Redirect to" option next to the `www` entry).

## 5. Verify

1. Wait for DNS propagation (can take minutes to ~48 hours depending on
   GoDaddy's TTL — Vercel's dashboard will show "Valid Configuration" once
   it sees the records).
2. Confirm SSL is issued automatically for both domains (Vercel handles
   this once DNS is valid — no action needed on GoDaddy's side).
3. **Test email** after the DNS change — send and receive a test email
   through whatever service handles Redemption's email — to confirm MX/SPF/DKIM
   survived the change untouched.
4. Visit both `redemptioncleanoutservices.com` and
   `www.redemptioncleanoutservices.com` and confirm the `www` version
   redirects to the apex (or vice versa, whichever you chose) over HTTPS.

## 6. Post-launch SEO/analytics steps

1. Submit `https://redemptioncleanoutservices.com/sitemap.xml` in
   [Google Search Console](https://search.google.com/search-console) and
   verify domain ownership (a `TXT` record or the HTML-file method both
   work without touching other DNS records).
2. Confirm GA4 is receiving traffic (`NEXT_PUBLIC_GA_MEASUREMENT_ID` set,
   and a real visitor has accepted the consent banner).
3. Confirm the Jobber request form actually submits end-to-end from the
   live domain (test the iframe and the fallback link both).

## Rollback

If DNS changes cause a problem, GoDaddy DNS changes are reversible by
restoring the original records from your Step 3 export/screenshot — this
is why that step isn't optional.
