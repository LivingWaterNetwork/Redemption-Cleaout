import { test, expect } from "@playwright/test";

test("sitemap.xml is reachable and includes core routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain("/services/full-property-cleanouts");
  expect(body).toContain("/service-areas/oakland-county-mi");
});

test("robots.txt is reachable and points to the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body.toLowerCase()).toContain("sitemap");
});

test("homepage exposes Organization structured data without a street address", async ({ page }) => {
  await page.goto("/");
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = scripts.map((s) => JSON.parse(s));
  const org = parsed.find((item) => item["@type"] === "LocalBusiness");
  expect(org).toBeDefined();
  expect(org.address.streetAddress).toBeUndefined();
});
