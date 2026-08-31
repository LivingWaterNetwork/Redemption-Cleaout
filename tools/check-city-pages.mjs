/**
 * Quality gate for the city landing pages.
 *
 * City pages are the biggest local-search asset on this site and also the
 * easiest thing to get badly wrong: a set of near-identical pages with the name
 * swapped is a doorway-page pattern, which Google demotes and which drags the
 * whole domain down with it. This checks the things a machine can check, so a
 * human review can spend its attention on whether the writing is any good.
 *
 *   node tools/check-city-pages.mjs
 *
 * Exits non-zero if anything fails.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/content/cities";
const files = readdirSync(DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");

const problems = [];
const fail = (file, kind, msg) => problems.push({ file, kind, msg });

// Quantities written as words evade a digit check. A verification pass found
// "twenty-eight to forty feet of frontage" sitting in a page that this script
// had passed, so measurements spelled out are caught here too.
const SPELLED_NUMBER =
  /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)[a-z-]*\s+(?:to\s+[a-z-]+\s+)?(?:feet|foot|ft|percent|per cent|miles|minutes|acres|dollars)\b/i;

// Marketing filler the house voice does not use.
const PUFFERY = [
  "nestled", "vibrant", "premier", "trusted partner", "look no further",
  "pride ourselves", "state-of-the-art", "one-stop", "hassle-free",
  "peace of mind", "unparalleled", "top-notch", "second to none",
  "bustling", "hidden gem", "we understand that",
];

// Claims a city page must never make, because none of them were verified.
const FABRICATION = [
  /\bordinance\b/i, /\bpermit fee/i, /\bbulk pickup\b/i, /\bcurbside pickup\b/i,
  /\blandfill\b/i, /\btransfer station\b/i, /\bGoodwill\b/, /\bSalvation Army\b/i,
  /\bHabitat for Humanity\b/i, /\bawarded\b/i, /\bvoted\b/i, /\brated\b/i,
  /\b\d+\s*(?:%|percent)/, /\$\s?\d/, /\b\d{1,3}\s?(?:miles|minutes|mins)\b/i,
  /\bwe (?:have )?(?:cleared|completed|worked on|did)\b/i,
  /\bour (?:recent|last) (?:job|project)\b/i,
];

const parsed = [];

for (const file of files) {
  const src = readFileSync(join(DIR, file), "utf8");
  const slug = file.replace(/\.ts$/, "");
  const camel = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

  if (!src.includes(`export const ${camel}`)) {
    fail(file, "contract", `export must be named "${camel}"`);
  }
  if (!src.includes(`slug: "${slug}"`)) {
    fail(file, "contract", `slug field must be "${slug}"`);
  }

  const grab = (field) => {
    const m = src.match(new RegExp(`${field}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? m[1] : null;
  };
  // Arrays are written both inline and multi-line, so match to the closing
  // bracket rather than assuming either shape.
  const list = (field) => {
    const start = src.indexOf(`${field}: [`);
    if (start === -1) return [];
    const open = src.indexOf("[", start);
    let depth = 0;
    let end = -1;
    for (let i = open; i < src.length; i++) {
      if (src[i] === "[") depth++;
      else if (src[i] === "]") {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end === -1) return [];
    return [...src.slice(open, end).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
  };

  const meta = grab("metaDescription");
  if (!meta) fail(file, "contract", "metaDescription not found");
  else if (meta.length < 120 || meta.length > 170) {
    fail(file, "contract", `metaDescription is ${meta.length} chars (want 120-170)`);
  }

  const areas = list("localAreas");
  if (areas.length < 3 || areas.length > 8) {
    fail(file, "contract", `localAreas has ${areas.length} entries (want 3-8)`);
  }

  const nearby = list("nearbySlugs");
  if (nearby.length < 2) fail(file, "contract", `nearbySlugs has ${nearby.length} (want 2+)`);
  if (nearby.includes(slug)) fail(file, "contract", "nearbySlugs links to itself");

  const considerations = list("localConsiderations");
  if (considerations.length < 3) {
    fail(file, "contract", `localConsiderations has ${considerations.length} (want 3+)`);
  }

  const faqCount = (src.match(/question:/g) || []).length;
  if (faqCount < 2) fail(file, "contract", `only ${faqCount} FAQ(s) (want 2+)`);

  const lower = src.toLowerCase();
  for (const phrase of PUFFERY) {
    if (lower.includes(phrase)) fail(file, "voice", `puffery: "${phrase}"`);
  }
  for (const re of FABRICATION) {
    const m = src.match(re);
    if (m) fail(file, "fabrication", `unverifiable claim: "${m[0]}"`);
  }
  const spelled = src.match(SPELLED_NUMBER);
  if (spelled) {
    fail(file, "fabrication", `measurement stated as fact: "${spelled[0]}"`);
  }

  // Claims about Redemption's own history or mix of work in this city. Nothing
  // has been verified about where the company has actually worked.
  const TRACK_RECORD = [
    /\b(?:usually|often|typically|commonly|frequently|routinely|regularly|mostly)\b[^.]{0,60}\b(?:we|our crew|our)\b/i,
    /\bit is common (?:around here|here)\b/i,
    /\badd(?:s)? steady\b/i,
    /\bhalf of what we do\b/i,
    /\b(?:most|much|many) of (?:our|the) (?:work|jobs|calls) (?:here|in)\b/i,
    /\bsame[- ]day\b/i,
  ];
  for (const re of TRACK_RECORD) {
    const m = src.match(re);
    if (m) {
      // "review", not "fabrication": some of these are ordinary prose. A hit
      // means a person has to judge it, not that it is automatically wrong.
      fail(file, "review", `claims something about our own work: "${m[0].trim()}"`);
    }
  }

  // Quoting and coverage facts must not be contradicted.
  if (/\b(?:don'?t|do not|never|won'?t|cannot|can'?t)\s+quote\s+from\s+photos/i.test(src)) {
    fail(file, "fact", "contradicts the photo-estimate quoting model");
  }
  if (/southeast michigan/i.test(src)) {
    fail(file, "fact", '"Southeast Michigan" — the service area is Metro Detroit');
  }
  if (/light demolition/i.test(src)) {
    fail(file, "fact", '"light demolition" is retired');
  }
  if (/who-we-serve/i.test(src)) fail(file, "fact", "links to the deleted who-we-serve tree");

  const prose = [grab("housingContext"), grab("workContext")].filter(Boolean).join(" ");
  parsed.push({ file, slug, nearby, prose, considerations });
}

// Every nearbySlug must resolve to a real city page.
const slugs = new Set(parsed.map((p) => p.slug));
for (const p of parsed) {
  for (const n of p.nearby) {
    if (!slugs.has(n)) fail(p.file, "contract", `nearbySlug "${n}" does not exist`);
  }
}

// The doorway-page check a machine can do: how much sentence-level text is
// shared between any two pages. Genuinely local writing overlaps very little.
const shingles = (text) => {
  const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + 6 <= words.length; i++) out.add(words.slice(i, i + 6).join(" "));
  return out;
};
const sig = new Map(parsed.map((p) => [p.slug, shingles(p.prose)]));

for (let i = 0; i < parsed.length; i++) {
  for (let j = i + 1; j < parsed.length; j++) {
    const a = sig.get(parsed[i].slug);
    const b = sig.get(parsed[j].slug);
    if (!a.size || !b.size) continue;
    let shared = 0;
    for (const s of a) if (b.has(s)) shared++;
    const overlap = shared / Math.min(a.size, b.size);
    // A shingle check catches copy-paste, not a page that follows a sibling's
    // argument beat for beat in different words. Most doorway findings in the
    // 2026-08-31 review were the latter, so a clean run here proves little.
    if (overlap > 0.18) {
      fail(
        parsed[i].file,
        "doorway",
        `${Math.round(overlap * 100)}% phrase overlap with ${parsed[j].slug}`,
      );
    }
  }
}

// A consideration repeated verbatim across pages is by definition not local.
const seen = new Map();
for (const p of parsed) {
  for (const c of p.considerations) {
    const key = c.toLowerCase().trim();
    if (seen.has(key) && seen.get(key) !== p.slug) {
      fail(p.file, "doorway", `localConsideration is identical to ${seen.get(key)}'s`);
    }
    seen.set(key, p.slug);
  }
}

const byKind = problems.reduce((acc, p) => ((acc[p.kind] = (acc[p.kind] || 0) + 1), acc), {});

if (problems.length === 0) {
  console.log(`${parsed.length} city pages checked — no mechanical problems.`);
  console.log(
    "This is a floor, not sign-off: it cannot judge whether a place name is\n" +
      "attributed to the right city, or whether a page merely restructures a\n" +
      "sibling's argument. Those need a reader. See CITY_PAGE_FIXES.md.",
  );
} else {
  for (const p of problems) console.log(`  [${p.kind}] ${p.file}: ${p.msg}`);
  console.log(`\n${problems.length} problem(s) across ${parsed.length} pages:`, byKind);
  process.exit(1);
}
