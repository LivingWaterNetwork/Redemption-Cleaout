import { chromium } from "@playwright/test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const routes = [
  "/",
  "/services",
  "/services/full-property-cleanouts",
  "/services/demolition",
  "/service-areas",
  "/service-areas/oakland-county-mi",
  "/service-areas/wayne-county-mi/detroit-mi",
  "/how-it-works",
  "/request-walkthrough",
  "/about",
  "/projects",
  "/reviews",
  "/resources/estate-cleanout-checklist",
  "/faq",
  "/contact",
  "/privacy",
];

const browser = await chromium.launch();
let total = 0;

for (const width of [390, 1440]) {
  for (const route of routes) {
    const page = await browser.newPage({
      viewport: { width, height: width < 500 ? 844 : 1000 },
      isMobile: width < 500,
    });
    // "load", not "networkidle": the gallery holds 30+ photos and Next
    // generates a fresh optimized variant per viewport width on first request,
    // so the network never goes idle within the default timeout on a cold
    // cache. Waiting for load plus a short settle gives axe a fully laid-out
    // DOM without making the check hostage to image optimization.
    await page.goto(`http://127.0.0.1:3000${route}`, {
      waitUntil: "load",
      timeout: 60_000,
    });
    await page.waitForTimeout(600);
    await page.addScriptTag({ path: axePath });
    const results = await page.evaluate(async () =>
      // WCAG 2.2 AA rule set.
      // @ts-ignore - axe is injected above
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      }),
    );
    const violations = results.violations.filter((v) => v.impact !== "minor" || true);
    if (violations.length) {
      total += violations.length;
      console.log(`\n${width}px ${route}`);
      for (const v of violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
        console.log(`     ${v.nodes[0]?.target?.join(" ")}`);
      }
    }
    await page.close();
  }
}

console.log(total === 0 ? "\nNo axe violations found." : `\nTotal violations: ${total}`);
await browser.close();
