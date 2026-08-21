# QA Checklist

Run before declaring any release complete.

## Automated

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` (Vitest unit tests) passes
- [ ] `npm run build` (production build) succeeds
- [ ] `npm run e2e` (Playwright) passes

## Manual — every route

- [ ] All routes in `src/app/sitemap.ts` load without error
- [ ] Unique `<title>` and meta description per page (spot-check a service,
      an audience, a service area, and a resource page)
- [ ] Canonical URL matches the page's own path
- [ ] Breadcrumbs render and link correctly
- [ ] No console errors in the browser dev tools on any page

## Manual — breakpoints

Check at minimum: 320px, 375px, 390px, 430px, 768px, 1024px, 1280px,
1440px, 1920px.

- [ ] No horizontal scroll at any width
- [ ] No clipped or overlapping text
- [ ] Logo never distorted (fixed aspect ratio via `next/image` `width`/`height`)
- [ ] Mobile action bar doesn't cover content and hides when the Jobber
      form is in view

## Manual — CTAs & forms

- [ ] "Request a Property Walkthrough" links work from header, mobile nav,
      mobile action bar, homepage hero, and every CTA band
- [ ] Call and text links use the correct `tel:`/`sms:` href with the
      correct number
- [ ] Jobber embed loads when `NEXT_PUBLIC_JOBBER_EMBED_URL` is set
- [ ] Jobber fallback (honest, not fake) renders when it is unset
- [ ] "Discuss a Referral Partnership" reaches `/who-we-serve`

## Manual — accessibility

- [ ] Skip link works and is visible on focus
- [ ] Full keyboard navigation through header, mobile menu, and FAQ
      accordions
- [ ] Visible focus ring on every interactive element
- [ ] `prefers-reduced-motion` disables animation
- [ ] Color contrast holds for red-on-white and white-on-black text pairs

## Manual — content integrity

- [ ] No Lorem ipsum, "coming soon," fake reviews, fake metrics, fake
      staff, fake project results, fake addresses, fake certifications, or
      fake partner logos anywhere
- [ ] Every unverified claim in `CONTENT_APPROVALS.md` remains unchecked
      until leadership confirms it
- [ ] Full street address does not appear anywhere while
      `publicAddressEnabled` is `false`

## SEO

- [ ] `/sitemap.xml` includes every published route
- [ ] `/robots.txt` references the sitemap and blocks `/api/`
- [ ] Preview deployments (`VERCEL_ENV=preview`) are `noindex`
- [ ] Structured data validates (spot-check with Google's Rich Results
      Test after deploying)
