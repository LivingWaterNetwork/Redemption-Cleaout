import { test, expect } from "@playwright/test";

test("request-walkthrough page shows an honest Jobber fallback when unconfigured", async ({ page }) => {
  await page.goto("/request-walkthrough");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/request a property walkthrough/i);
  // Honest unavailable state, not a form that looks functional.
  await expect(page.getByText(/online form being connected/i)).toBeVisible();
  const phoneLinks = page.locator('a[href="tel:+12483219609"]');
  await expect(phoneLinks.first()).toBeVisible();
});

test("service detail page renders unique content and breadcrumbs", async ({ page }) => {
  await page.goto("/services/estate-cleanouts");
  await expect(page.getByRole("heading", { name: "Estate and Inherited-Property Cleanouts" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://redemptioncleanoutservices.com/services/estate-cleanouts",
  );
});

test("service area page only exists for approved cities", async ({ page }) => {
  await page.goto("/service-areas/rochester-mi");
  await expect(page.getByRole("heading", { name: /Rochester, Michigan/i })).toBeVisible();

  const response = await page.goto("/service-areas/detroit-mi");
  expect(response?.status()).toBe(404);
});
