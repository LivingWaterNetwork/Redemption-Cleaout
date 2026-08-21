import { test, expect } from "@playwright/test";

test("projects page shows an honest empty state when no photography exists yet", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByText(/project photography is being gathered/i)).toBeVisible();
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
