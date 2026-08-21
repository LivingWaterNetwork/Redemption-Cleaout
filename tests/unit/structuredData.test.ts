import { describe, expect, it } from "vitest";
import { organizationJsonLd } from "@/lib/structuredData";

describe("organizationJsonLd", () => {
  it("omits streetAddress while publicAddressEnabled is false", () => {
    const data = organizationJsonLd() as { address: Record<string, unknown> };
    expect(data.address.streetAddress).toBeUndefined();
    expect(data.address.addressLocality).toBe("Rochester");
  });
});
