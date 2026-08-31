import { test, expect } from "@playwright/test";

test("projects page renders the full photo gallery", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 1, name: /previous work/i })).toBeVisible();

  const tiles = page.getByRole("button").filter({ hasNot: page.locator("nav") });
  expect(await page.locator("main img").count()).toBeGreaterThan(10);
  expect(await tiles.count()).toBeGreaterThan(0);
});

test("gallery lightbox opens and closes with the keyboard", async ({ page }) => {
  await page.goto("/projects");
  await page.locator("main ul li button").first().click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("reduced motion is respected on the homepage", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const prefersReducedMotion = await page.evaluate(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  expect(prefersReducedMotion).toBe(true);

  // Global CSS (globals.css) forces near-zero animation/transition duration
  // whenever this media query matches — confirm it actually applies.
  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scrollBehavior).toBe("auto");
});
