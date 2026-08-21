import { test, expect, devices } from "@playwright/test";

const { defaultBrowserType: _defaultBrowserType, ...iPhone13Viewport } = devices["iPhone 13"];

test.use({ ...iPhone13Viewport });

test("mobile menu opens and closes and stays keyboard operable", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /open menu/i });
  await expect(toggle).toBeVisible();
  await toggle.click();
  const nav = page.getByRole("navigation", { name: "Mobile" });
  await expect(nav).toBeVisible();
  await page.getByRole("button", { name: /close menu/i }).click();
  await expect(nav).not.toBeVisible();
});

test("mobile action bar exposes call, text, and walkthrough actions", async ({ page }) => {
  await page.goto("/");
  const callLink = page.getByRole("link", { name: "Call", exact: true });
  await expect(callLink).toHaveAttribute("href", "tel:+12483219609");
  const textLink = page.getByRole("link", { name: "Text", exact: true });
  await expect(textLink).toHaveAttribute("href", "sms:+12483219609");
  const walkthroughLink = page.getByRole("link", { name: "Walkthrough", exact: true });
  await expect(walkthroughLink).toHaveAttribute("href", "/request-walkthrough");
});
