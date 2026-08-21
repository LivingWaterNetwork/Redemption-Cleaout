import { describe, expect, it, vi, beforeEach } from "vitest";
import { trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    delete window.gtag;
  });

  it("does nothing when gtag is unavailable", () => {
    expect(() => trackEvent({ name: "click_call", params: { location: "test" } })).not.toThrow();
  });

  it("forwards the event name and params to gtag when available", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    trackEvent({ name: "view_service", params: { service: "estate-cleanouts" } });
    expect(gtag).toHaveBeenCalledWith("event", "view_service", { service: "estate-cleanouts" });
  });
});
