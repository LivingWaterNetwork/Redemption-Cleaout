import { z } from "zod";

/**
 * This project intentionally has no server-stored lead forms — Jobber is
 * the system of record (see JOBBER_SETUP.md). This schema exists only to
 * validate the handful of runtime configuration values that come from
 * environment variables, so a misconfigured URL fails fast and visibly
 * instead of silently rendering a broken embed.
 */
export const optionalUrlSchema = z
  .string()
  .url()
  .optional()
  .or(z.literal(""));

export function isConfiguredUrl(value: string | undefined): value is string {
  if (!value) return false;
  return optionalUrlSchema.safeParse(value).success && value.length > 0;
}

/** Canonical production origin, used whenever NEXT_PUBLIC_SITE_URL is unusable. */
export const FALLBACK_SITE_URL = "https://redemptioncleanoutservices.com";

/**
 * `??` is not sufficient for this one. A variable that is *declared but blank*
 * — which is what Vercel produces when its import screen pre-fills keys from
 * `.env.example`, and what a bare `KEY=` line in a .env file produces — arrives
 * as "" rather than undefined, so `??` passes it straight through. That empty
 * string then reaches `new URL()` in the root layout's `metadataBase` and
 * throws ERR_INVALID_URL at module evaluation, which fails the entire
 * production build on every route.
 *
 * Blank or unparseable is treated as "not configured", exactly like every
 * other optional value here, and falls back to the canonical origin. A
 * misconfigured URL still fails visibly — the site simply renders with
 * canonical metadata instead of refusing to build.
 */
export function resolveSiteUrl(value: string | undefined): string {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return FALLBACK_SITE_URL;
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return FALLBACK_SITE_URL;
  }
}
