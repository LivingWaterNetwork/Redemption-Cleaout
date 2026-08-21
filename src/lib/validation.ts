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
