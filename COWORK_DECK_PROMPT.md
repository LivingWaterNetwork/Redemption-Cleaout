# Cowork prompt — Redemption Cleanout Services delivery & pricing deck

Copy everything inside the fence below into Cowork. Attach or point it at
`PROJECT_SUMMARY.md` from this repo first — that file is the only source of
facts it should use.

---

```
Design a client-facing presentation for Redemption Cleanout Services about the
website we built for them. Use the attached PROJECT_SUMMARY.md as your ONLY
source of facts.

AUDIENCE AND PURPOSE
The audience is Dante Terracciano, the founder and owner of Redemption Cleanout
Services. He is a real-estate professional, not a developer. The deck has two
jobs, in this order:
  1. Show him what he actually got — concretely, in terms he can evaluate.
  2. Justify what it cost, by making the depth of the work legible to someone
     who cannot read code.
He should finish the deck feeling that the price was obviously fair, without
ever being told that it was.

HARD RULES — these matter more than the design
- Use ONLY facts, numbers, and quotes that appear in PROJECT_SUMMARY.md. Do not
  invent, round up, extrapolate, or "improve" a single figure.
- Where the summary gives a range (desktop Lighthouse 97–100, mobile 92–95),
  present the range. Never collapse a range to its best number.
- Where the summary marks something UNVERIFIED or as a hypothesis, either omit
  it or label it clearly. Never promote it to a fact.
- Do not imply the site is live and indexed. It is not yet — see section 0.2 of
  the summary. Handle this honestly in the "what's next" section.
- No stock photography of cleanouts, junk removal, trucks, or crews. This is a
  company whose entire content policy is "no stock imagery" — using stock in the
  deck about that policy would be self-defeating. Use type, color, layout, and
  the real numbers instead. Abstract geometric or textural treatment is fine.
- Write in plain language. Where a technical term is unavoidable, explain its
  business consequence in the same breath. "Structured data" means nothing to
  him; "the markup that lets Google show your services as rich results" does.

BRAND — pull directly from the site so the deck and the site look related
Colors (these are the real design tokens from tailwind.config.ts):
  Redemption red      #C32C26   primary accent
  Restoration red     #A91E23   darker red, use for small text on light
  Heritage black      #0B0D0E   backgrounds and headlines
  Clean white         #FFFFFF
  Steel gray          #605F5D   body copy
  Warm concrete       #E5E1DE   secondary surface
Typography:
  Display / headlines — Oswald (condensed, bold, uppercase for impact)
  Labels / eyebrows   — PT Sans Narrow, uppercase, wide letter-spacing
  Body                — Source Sans 3
Two brand rules the site itself enforces, and the deck should too:
  - Never set red type on a dark background. It fails contrast. On dark, labels
    go white and red is used only for rules and accents.
  - Near-zero border radius. Square, editorial, industrial. Not rounded cards.
Tone: editorial and confident. Large type, generous whitespace, strong
horizontal rules, oversized numerals for stats. Think a well-set trade
publication, not a SaaS pitch deck.

STRUCTURE — roughly this, adjust if a better narrative emerges
1. Title. Company name, "Website Delivery Review", date.
2. The one-slide summary. What was built, in a sentence, plus the three or four
   numbers that carry the most weight.
3. What was built. 34 pages / 41 routes. Break down the page inventory from
   section 2 — services, audience pages, service areas, guides, legal. Make the
   scale visible; a lot of people underestimate this.
4. The content. This is the most under-appreciated line item, so give it room.
   46 FAQs. Eight service pages each with scope, exclusions, audience,
   conditions, process, and FAQs. Three educational guides. Every word written
   for his business specifically. Quote 3–5 of the strongest verbatim lines from
   section 3 — the positioning statements land hardest.
5. Quality, measured. The Lighthouse table from section 9.1 and the grades from
   9.2. Accessibility 100 across every page tested and 0 axe violations deserve
   their own moment — explain that this is both a legal-exposure reduction and a
   real usability win for older clients, who are a meaningful share of estate
   and downsizing work.
6. The honesty policy as a feature, not a gap. Section 3.4's anti-claims and
   3.5's placeholders. Frame it correctly: no fabricated reviews, no invented
   ratings, no stock photos, no unverified insurance claim, no address published
   without approval — and it is enforced by automated tests, not just intended.
   This protects him from Google penalties and from claims he cannot back. It is
   the single most defensible thing in the build.
7. The build fix. Section 4.1. Tell it as a short story: every deploy was
   failing, the cause was a single operator in one line of code, it was found,
   fixed, and locked behind 7 regression tests. This is the clearest possible
   demonstration of value that a non-technical owner can grasp.
8. What it means for growth. Section 8's city-page strategy. The key point: the
   architecture was built so the next city page costs copy, not code — three
   lines and the page, navigation, footer, and sitemap all update themselves.
   The expensive part is already paid for.
9. What he needs to supply. Section 3.5 and phase 3 of section 8, turned into a
   short, concrete, non-accusatory checklist: founder portrait, written photo
   permissions, Jobber form URL, Google Business Profile, confirm insurance and
   hours, resolve 13 vs 12 years, sign off the founder story. Frame as "these
   unlock features already built and waiting," which is true.
10. What's next. The remaining Vercel configuration, honestly stated, then the
    recommended roadmap.
11. Close. A single strong slide. The tagline "Redeem Your Property. Reclaim
    Your Space." is his own and earns the last word.

DELIVERABLE
A polished presentation. Prefer real slides over a scrolling document. Design
for presenting on a screen and for reading alone afterwards, since he will
likely do both. Include brief speaker notes on any slide with a number on it,
so whoever presents can explain where the figure came from.
```

---

## Two notes before you send it

1. **Attach `PROJECT_SUMMARY.md`.** Without it the prompt has no facts to work
   from and Cowork will invent plausible-sounding numbers — exactly what the
   hard rules are there to prevent.

2. **Decide the 13-vs-12-years question first.** It appears in the deck's
   founder material and on three places on the site. If it changes, the deck
   changes with it.
