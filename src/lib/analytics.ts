"use client";

/**
 * Typed analytics event helper. Every call here must be free of PII —
 * never pass form field values, names, phone numbers, emails, addresses,
 * or uploaded-image data. See ANALYTICS.md for the full event catalog.
 */

export type AnalyticsEvent =
  | { name: "click_call"; params?: { location: string } }
  | { name: "click_text"; params?: { location: string } }
  | { name: "click_request_walkthrough"; params?: { location: string } }
  | { name: "jobber_form_view" }
  | { name: "jobber_form_submit" }
  | { name: "click_professional_partner"; params?: { audience: string } }
  | { name: "view_service"; params: { service: string } }
  | { name: "view_project"; params: { project: string } }
  | { name: "click_google_reviews" }
  | { name: "download_guide"; params: { guide: string } };

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  const params = "params" in event ? event.params : undefined;
  window.gtag("event", event.name, params as Record<string, unknown> | undefined);
}
