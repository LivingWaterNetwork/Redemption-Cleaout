import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = process.env.OUT || "/tmp/rev3";
mkdirSync(OUT, { recursive: true });

const routes = (process.env.ROUTES || "home:/").split(",").map((r) => {
  const i = r.indexOf(":");
  return [r.slice(0, i), r.slice(i + 1)];
});

const widths = (process.env.WIDTHS || "1440").split(",").map(Number);

const browser = await chromium.launch();

for (const w of widths) {
  for (const [name, path] of routes) {
    const page = await browser.newPage({
      viewport: { width: w, height: w < 500 ? 844 : 1000 },
      isMobile: w < 500,
      hasTouch: w < 500,
      deviceScaleFactor: 1,
      // Full-page capture renders from scroll 0, so scroll-triggered reveals
      // would photograph as blank. Emulating reduced motion puts every
      // element in its final visible state — the same state the reduced-motion
      // path serves in production.
      reducedMotion: process.env.MOTION === "on" ? "no-preference" : "reduce",
    });
    await page.goto(`http://127.0.0.1:3000${path}`, { waitUntil: "networkidle" });
    // Scroll through so IntersectionObserver reveals fire before capture.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.75;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    // Dismiss the consent banner so it doesn't sit over the capture.
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent?.trim() === "Accept",
      );
      btn?.click();
    });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    if (overflow) console.log(`!! horizontal overflow at ${w}px on ${path}`);
    await page.screenshot({ path: `${OUT}/${w}-${name}.png`, fullPage: true });
    await page.close();
  }
}

await browser.close();
console.log("done");
