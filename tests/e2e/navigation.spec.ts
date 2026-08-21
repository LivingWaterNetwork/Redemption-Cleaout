import { test, expect } from "@playwright/test";

test("homepage loads with primary hero and CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Clear the Property/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request a Property Walkthrough" }).first()).toBeVisible();
});

test("desktop nav links to a service detail page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Services" }).click();
  await page.getByRole("link", { name: "Services Overview" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/couldn't find that page/i)).toBeVisible();
});

test("footer links to service areas", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Rochester, MI" })
    .click();
  await expect(page).toHaveURL(/\/service-areas\/rochester-mi/);
});
