import { describe, expect, it } from "vitest";
import { business } from "@/content/business";

describe("business config address safety rule", () => {
  it("keeps publicAddressEnabled false by default", () => {
    expect(business.address.publicAddressEnabled).toBe(false);
  });

  it("exposes only the safe public area description while disabled", () => {
    expect(business.address.publicAreaDescription).toBe("Serves Metro Detroit");
    // The point of the rule: whatever the wording, it must never leak the
    // street address or the unit-level location.
    expect(business.address.publicAreaDescription).not.toContain(business.address.street);
    expect(business.address.publicAreaDescription).not.toContain(business.address.zip);
  });

  it("retains the internal street address for later activation, without publishing it", () => {
    expect(business.address.street).toBe("429 South Main Street");
  });
});
