# City page fixes — outstanding

Generated from the verification pass of the 2026-08-31 agent run. **The 27 city
pages under `src/content/cities/` are written and committed but are NOT ready to
publish.** Independent reviewers found 79 issues across 26 of them.

| Severity | Count | What it means |
|---|---|---|
| fabrication | 21 | An unverifiable or wrong claim stated as fact. Must be removed or sourced. |
| doorway | 26 | Text substantially interchangeable with a sibling page. Must be rewritten or cut. |
| contract | 6 | Breaks the CityDefinition contract or a fixed site fact. |
| voice | 5 | Marketing puffery or off-house-voice. |
| minor | 21 | Worth fixing, not blocking. |

**Fabrication and doorway are blocking.** Fabricated local geography on a live
site is a credibility problem, and a doorway-page pattern is demoted by Google
and drags down the pages that already rank — which is the whole reason these
pages were built.

## Why `tools/check-city-pages.mjs` passed all 27

The mechanical gate is necessary and not sufficient. It missed every issue below
because:

- **Numbers written as words.** It greps for digits, so "twenty-eight to forty
  feet of frontage" sailed through. Now partially covered — see the spelled-out
  number check added to the script.
- **Misattributed places.** Springwells is in Southwest Detroit, not Dearborn.
  Fort Gratiot is a separate township from Port Huron. Lambertville is not part
  of Temperance. Checking this needs real geographic knowledge, not a regex.
- **Structural sameness rather than shared phrasing.** The 18% six-word-shingle
  threshold catches copy-paste. It does not catch a page that follows a sibling's
  argument beat for beat in different words, which is most of the doorway
  findings.

Treat the script as a floor, never as sign-off.

## How to work this list

One agent per county, each given only its own section below plus the files it
names. Rewrite rather than patch around a finding — several pages need their
`localConsiderations` and `workContext` genuinely rethought, not reworded. Then
re-run `node tools/check-city-pages.mjs`, `npm run build`, and a fresh
adversarial verification pass before publishing.

Reviewers' own summaries are included per county; some flag pages that were
clean, which is worth knowing before rewriting something that does not need it.


---

## livingston-county-mi — 9 issue(s)

> **Reviewer summary.** Both Livingston pages are contract-clean and voice-clean: countySlug "livingston-county-mi" matches serviceAreas.ts; export names brightonMi/howellMi are correct camelCase of the slugs; all nearbySlugs are on the allowed list; metaDescriptions are 157 and 151 characters (in range); localAreas are 7 and 6 (in range); localConsiderations are 5 each; 3 FAQs each; housingContext is 69/70 words and workContext 92/89 words, all inside the documented ranges. No invented ordinance, permit fee, landfill, transfer station, charity, partner, price, distance, award, or population figure appears in either file, and nothing contradicts the fixed facts — both pages correctly state photo estimate first, final quote in person on site, and neither implies a third service or a narrower service region. No puffery: no "nestled", "vibrant", "premier", "trusted partner", and no condescension toward either town. The real problems are two. First, four passages assert an existing local track record — Howell's "steady commercial clearing between tenants" on Grand River, Howell's "usually the bigger half of the job" and "almost always", and Brighton's "Demolition requests around Brighton lean toward..." and "it is common around here" — which is exactly the claimed-work-in-that-city category CityDefinition's own doc comment prohibits without CONTENT_APPROVALS.md sign-off; all four are fixable by switching from claimed frequency to property-stock or conditional framing. Second, and more damaging, the two pages are substantially interchangeable with each other: their five localConsiderations map 1:1 onto the same four themes (outbuildings, lake access, no-driveway downtown loading, barn demolition with contents cleared first), their FAQ sets pair the same way, and Howell's workContext reuses troy-mi.ts's three-beat structure down to the "[corridor] adds a steady run of commercial clearing" sentence with Grand River swapped for Big Beaver. Differentiating them requires Brighton to carry the cottage/chain-of-lakes material and Howell the county-seat courthouse-square and probate material, not the shared Livingston traits both currently recite. Two smaller items: Ore Lake is in Hamburg Township and is misattributed to Brighton, and Howell's "built through the 1990s and 2000s" is an unnecessary unverified date. Neither file should ship as written.


### fabrication

**`howell-mi.ts`** — workContext asserts an existing book of business in Howell: "Storefront and small-office turnovers along Grand River add steady commercial clearing between tenants." This is an unverified claim that Redemption already has recurring commercial customers on Grand River in Howell. CityDefinition's own doc comment forbids stating a job Redemption has done in a city unless confirmed in CONTENT_APPROVALS.md.

*Fix:* Rewrite as capability/property-stock framing rather than claimed volume: "Grand River carries small storefronts and offices, so commercial turnovers between tenants are part of the mix here as well as houses." Remove "steady" and "add".

**`brighton-mi.ts`** — localConsiderations bullet 5 claims a demand pattern the company cannot substantiate: "Demolition requests around Brighton lean toward barns, shops, decks and boathouses more than interior gut-outs." This is a statistic-shaped claim about inbound Brighton requests.

*Fix:* Recast as a property-stock observation: "Detached structures — barns, shops, decks, boathouses — are what there is to take down on most of these lots, more so than interior walls." Drop "requests ... lean toward".

**`brighton-mi.ts`** — FAQ 2 answer opens "Usually, yes — it is common around here," asserting frequency of steep-lot lake cleanouts already performed in Brighton. Same unverified-experience class as above; also FAQ 1's "are all standard demolition work for us" leans on the same implied local track record.

*Fix:* Replace "it is common around here" with a condition-based statement: "Usually, yes — a lot of the lake lots here drop away from the road." Keep the claim about the terrain, not about how many of these jobs we have done.

**`howell-mi.ts`** — FAQ 1 answer: "on a Howell-area farm property the outbuildings are usually the bigger half of the job" and localConsiderations bullet 3 "Farm cleanouts almost always include buildings the owner has not opened in years" both state observed frequencies from Howell jobs that are not confirmed anywhere in the content approvals.

*Fix:* Convert to conditional/advisory voice: "On a farm property the outbuildings can easily be the bigger half of the job" and "Farm cleanouts often involve buildings nobody has opened in years, so we walk every structure before quoting."


### doorway

**`brighton-mi.ts`** — The two Livingston pages are structurally parallel to the point of interchangeability. Brighton's five localConsiderations map 1:1 onto Howell's five on the same themes and in nearly the same order: outbuildings/pole barns are the routine job (Brighton 1 ≈ Howell 3/4), lake-lot access and truck placement (Brighton 2 ≈ Howell 5), old downtown lots with no driveway so loading happens off the street/alley (Brighton 4 ≈ Howell 2), barn/shed demolition with contents cleared first (Brighton 5 ≈ Howell 4). Swap the city names and neither list reads wrong. The FAQ sets pair the same way (barn/outbuilding question, access/truck-placement question).

*Fix:* Differentiate the two pages by what actually separates Brighton from Howell rather than by re-describing shared county traits. Brighton should carry what Howell does not: the chain-of-lakes cottage stock around Brighton, Woodland and Ore lakes (seasonal storage, boats, docks, winterised cottages, water-side carry) and the Old US-23 / Grand River commercial edge. Howell should carry the county-seat specifics: courthouse-square commercial blocks, alley-served Victorians, probate and estate work tied to the county courthouse, and working farmsteads out toward Fowlerville. Cut at least two overlapping bullets from each list and replace them with items that only make sense in that city.

**`howell-mi.ts`** — workContext recycles the exemplar's three-beat structure verbatim in shape: [dominant residential job type] / [second property type is "a different job entirely"] / [corridor adds a steady run of commercial clearing]. Compare troy-mi.ts workContext, which runs estate/downsizing → renovation gut-outs → "The Big Beaver office corridor adds a steady run of commercial clearing." Howell's third sentence is the same sentence with Grand River substituted for Big Beaver.

*Fix:* Restructure the paragraph rather than reskinning it — e.g. lead with the courthouse-square estate work and the probate timeline that comes with a county seat, and let the farm and commercial material follow in a different shape. Do not reuse the "[corridor] adds a steady run of commercial clearing" construction.


### minor

**`brighton-mi.ts`** — Ore Lake is listed in localAreas as a Brighton area and in housingContext as one of the lakes "around" Brighton. Ore Lake sits in Hamburg Township, several miles southeast of the City of Brighton — closer to Hamburg/Pinckney than to Brighton proper, and serviceAreas.ts already assigns the Pinckney/Hamburg lake communities to the county page. Listing it as a Brighton locality is a misattribution a local would notice.

*Fix:* Drop Ore Lake from localAreas (leaving 6 entries, still in range) and from the housingContext sentence, or reword to "the Brighton-area lakes — Brighton Lake, Woodland Lake, and the chain running toward Hamburg Township." Keep the lakes that are actually in or adjacent to the city.

**`howell-mi.ts`** — Two unverified specific claims about downtown Howell's street layout: localConsiderations bullet 2 ("Several downtown lots are served from a rear alley or service drive") and the FAQ 3 answer ("On the street, or in the rear alley where the block has one"). The bullet states it as established fact about a quantified set of lots; nothing in the repo confirms it.

*Fix:* Soften the bullet to match the FAQ's already-hedged phrasing: "Some downtown blocks are served from a rear alley, so the crew may load from behind the house rather than the street — we confirm access at the walkthrough." Avoid "Several ... lots," which reads as a counted claim.

**`howell-mi.ts`** — housingContext dates the subdivision stock: "subdivisions built through the 1990s and 2000s off Latson and Oak Grove." A build-era claim is the kind of specific the audit brief treats as needing verification, and it is not load-bearing for the cleanout argument.

*Fix:* Replace with an observable characteristic instead of a date: "newer subdivisions off Latson and Oak Grove, attached garages and full basements," which supports the same work argument without asserting a construction period.


---

## macomb-county-mi — 12 issue(s)

> **Reviewer summary.** All five Macomb pages pass the mechanical contract: correct countySlug, correct camelCase exports registered in index.ts, all nearbySlugs on the allowed list, metaDescriptions 152-158 chars, 3 FAQs each, 6-7 localAreas, housingContext 59-66 words and workContext 98-100 words (inside the type's documented ranges). No marketing puffery anywhere - the voice is plain and concrete throughout, which is the strongest thing about this batch. The real problems are three. (1) One hard fabricated statistic in Warren (lot frontage as a numeric range) plus two unverified factual characterisations presented as fact: Shelby described as the county's "northern, low-density end" (wrong on both counts) and Sterling Heights' build-out date range. (2) Recycled scaffolding: the "square footage understates the job" consideration appears on Troy, Warren AND Shelby in three rewordings; Sterling Heights' subdivision-driveway bullet is a near-paraphrase of Troy's; an identical "association/management controls truck placement and hours" bullet runs across three pages; and the photos-estimate-then-in-person-quote FAQ is the third FAQ on four pages. (3) Two internal contradictions: Sterling Heights offers to clear "a house on Hall Road" after its own housingContext says Hall Road is solid retail end to end, and Warren promises a "same day" phone estimate, a turnaround commitment that is not one of the site's fixed facts; Clinton Township adds an unapproved broom-swept finish guarantee. Clinton Township is the cleanest page of the five - the upper-floor-stairwell angle is genuinely specific and non-swappable - with St. Clair Shores a close second, carrying only shared-scaffolding issues. Nothing here is a wholesale doorway page; each has a real differentiating angle. But the shared bullets and shared FAQ should be rewritten and the three unverified factual claims pulled before publication.


### fabrication

**`warren-mi.ts`** — housingContext states Warren lots have "twenty-eight to forty feet of frontage". This is a specific numeric statistic about the housing stock presented as fact, with no source and no entry in CONTENT_APPROVALS.md. Typical Warren platted lots are wider than the low end of this range, so the figure is likely wrong as well as unverified.

*Fix:* Drop the numbers and keep the observable characteristic: "narrow lots with single-width drives and a detached garage at the back". If a frontage figure is genuinely wanted, source it from Warren's zoning/plat records and log it in CONTENT_APPROVALS.md first.

**`shelby-township-mi.ts`** — housingContext opens "Shelby Township is the northern, low-density end of Macomb County." Both halves are unverified and both appear wrong: Macomb's northern end is Richmond/Armada/Bruce/Washington, well north of Shelby, and Shelby is one of the county's most populous townships, not a low-density one. Stated flatly as fact.

*Fix:* Replace with a claim the page can support from its own content: "Shelby Township sits at the north-west edge of Macomb County's built-up area, where subdivision gives way to acreage." That preserves the contrast the workContext depends on without asserting rank or density.

**`sterling-heights-mi.ts`** — housingContext asserts "Most of it went up between the late 1960s and the 1990s" - a specific dated build-out claim presented as fact with no source. The page leans on it again in workContext ("the 1980s and 1990s pressure-treated deck").

*Fix:* Soften to what a crew actually observes on site - "the housing stock is mostly late-postwar subdivision rather than prewar" - or verify the build-out period against Sterling Heights' planning documents and log it in CONTENT_APPROVALS.md.


### doorway

**`sterling-heights-mi.ts`** — localConsiderations[0] - "Subdivision drives are wide and take a truck and trailer easily, so most of the crew time goes to carrying, not manoeuvring" - is a straight paraphrase of the Troy exemplar's "Subdivision driveways generally take a truck and trailer without difficulty, which keeps crew time down". Same observation, same clause order, same payoff; swap the city name and nothing changes.

*Fix:* Replace with something true only of Sterling Heights' layout - the cul-de-sac bulbs and curved streets that let a trailer turn around on site without a three-point back-out, which is the actual contrast with Warren's grid the housingContext already sets up.

**`warren-mi.ts`** — localConsiderations[3] "Small houses with full basements: the finished square footage understates the job almost every time" is the third rewording of one idea across the site - Troy has "a whole-floor level more work than the square footage suggests" and Shelby has "the volume estimate ... is routinely higher than the room count suggests". A consideration on every page is not a local consideration.

*Fix:* Keep this bullet on exactly one page. On Warren, replace it with the Warren-specific version: a small brick ranch with no attic and a single-width drive means everything comes up the basement stairs and out the front, with nowhere on the lot to stage or sort.

**`shelby-township-mi.ts`** — localConsiderations[3] "Three-car garages and deep attic space mean the volume estimate on a subdivision house is routinely higher than the room count suggests" is the same square-footage-understates-the-job point as Troy's and Warren's, reskinned with different nouns. It would read identically on any subdivision page in the county.

*Fix:* Cut it and let the acreage/outbuilding contrast - the one thing no other Macomb page has - carry the slot. If a volume bullet is needed, tie it to walkout basements and pole barns loading from grade, which is already this page's own angle.

**`clinton-township-mi.ts`** — The "association/building management controls truck placement and working hours, confirmed before the date" consideration appears three times in this batch in near-identical form: clinton-township localConsiderations[1], sterling-heights localConsiderations[2], and st-clair-shores localConsiderations[3]. The same sentence with the association swapped for a condo board is textbook interchangeable filler.

*Fix:* Assign the bullet to one page only. It belongs on Clinton Township, where condo/apartment stock is the page's whole thesis, and there it should be sharpened to the no-lift stairwell reality rather than generic association rules. Delete the sterling-heights and st-clair-shores copies and replace them with page-specific material (deck footings; canal-side gate and seawall access).

**`st-clair-shores-mi.ts`** — FAQ 3 is the fourth near-verbatim copy of the photos-estimate-then-in-person-final-quote FAQ (also warren FAQ 2, sterling-heights FAQ 3, clinton-township FAQ 2). The underlying process is a fixed fact and must stay accurate everywhere, but reproducing it as a standalone third FAQ on every page makes a quarter of each FAQ block identical.

*Fix:* State the process once inside an FAQ that is actually about something local, and give the third slot a different St. Clair Shores question - what happens to a seawall-side deck or dock hardware, or whether a boat well can be cleared. The quote process can be a closing sentence rather than the whole question.


### contract

**`sterling-heights-mi.ts`** — FAQ 3 asks "How do I get a price for clearing a house on Hall Road before it lists?" but this page's own housingContext says "Hall Road is solid retail from end to end." The page contradicts itself within 25 lines, and a local reader will notice that nobody lists a house on Hall Road.

*Fix:* Move the house to residential ground consistent with the rest of the page - e.g. "a house off Metro Parkway" - or repoint the FAQ at the retail turnover the corridor actually generates.

**`warren-mi.ts`** — FAQ 2 promises "we will get you an estimate over the phone the same day." The site's fixed facts cover estimates from photos over the phone and a final quote in person, but say nothing about same-day turnaround. This adds an unapproved service commitment that no sibling page makes.

*Fix:* Cut "the same day": "Send photos and we will get you an estimate over the phone." The following sentence about the in-person final quote already carries the process correctly.

**`clinton-township-mi.ts`** — FAQ 3 states "the unit is left broom-swept so paint and flooring can start." That is a specific finish-condition guarantee, not one of the two fixed services or an established fact, and it appears on no other page.

*Fix:* Remove the guarantee or reduce it to what the walkthrough settles: "we agree at the walkthrough what condition the unit is left in so paint and flooring can start." If broom-swept really is standard, get it approved and state it consistently on every city page.


### minor

**`shelby-township-mi.ts`** — localAreas includes "Twenty-Six Mile and Dequindre". Those roads meet at the extreme north-west corner of the township, on the Washington Township and Oakland County boundary - a corner point rather than an area a resident would name as part of Shelby Township. The other entries (Van Dyke/M-53, Twenty-Three Mile, Stony Creek Metropark, Packard Proving Grounds, Auburn and Ryan) are all solid; this one is not.

*Fix:* Replace with a location residents actually name, e.g. "Twenty-Two Mile and Hayes" or the Utica/M-59 edge - or simply drop it, since the list still has five entries against a minimum of four.


---

## monroe-county-mi — 9 issue(s)

> **Reviewer summary.** Neither page is clean. Contract mechanics check out on both: countySlug "monroe-county-mi" matches serviceAreas.ts, export names monroeMi/temperanceMi are correct camelCase, both are registered in index.ts, localAreas are 6 each (4-7 OK), localConsiderations 5 each (3-5 OK), 3 FAQs each, metaDescriptions are 158 and 159 characters (130-165 OK), and every nearbySlug is on the allowed list. No pricing, ordinance, permit, fee, named landfill or charity, statistic, distance, date, award or claimed job appears on either page, and the estimate language is correct (Temperance FAQ 3 states photos-then-phone estimate with the final quote in person; Monroe FAQ 3 says quoted in person after walking the property). Voice is clean on both — no puffery, hype or condescension. The real problems are elsewhere. Temperance carries two fabricated or misattributed places: a non-existent "Secor Road and the US-23 interchange" (the Bedford Township exits are Summerfield, Sterns and Samaria) and "Lambertville", a separate CDP with its own ZIP that is not part of Temperance. It also advertises dumpster placement, which contradicts the two-service model and the site's own positioning against dumpster rental, and it asserts well-and-septic as a general fact when much of Bedford Township is on public water and sewer. Both pages have doorway problems: Temperance's pole-barn/acreage bullets and its pole-barn FAQ are the fourth or fifth near-verbatim repeat of material already on saline-mi, shelby-township-mi, canton-mi and rochester-hills-mi, and Monroe's cellar-stairs and plaster-and-lath lines are reworded from port-huron-mi and ypsilanti-mi. Monroe's genuinely local material — the River Raisin floodplain, wet basements, Loranger Square, the historic streets — is good and should be what the page rests on; the borrowed old-house boilerplate around it should go.


### fabrication

**`temperance-mi.ts`** — localAreas lists "Secor Road and the US-23 interchange" as a single place. Secor Road runs north–south roughly parallel to US-23 in Bedford Township; there is no Secor Road interchange with US-23. The Bedford Township exits are at Summerfield Road, Sterns Road and Samaria Road. This reads as a fabricated conflation of two unrelated features and is exactly the kind of detail a local would catch.

*Fix:* Split them or replace with a real interchange: use "Sterns Road at US-23" (a genuine Temperance-area interchange) and, if Secor Road is wanted, list it separately as plain "Secor Road".

**`temperance-mi.ts`** — localAreas lists "Lambertville" as an area of Temperance. Lambertville is a separate census-designated place in Bedford Township with its own ZIP code (48144); it is not part of Temperance (48182). Listing it as a Temperance local area misattributes a neighbouring community.

*Fix:* Remove "Lambertville" from localAreas. If proximity matters, mention it in workContext as an adjacent Bedford Township community rather than as a Temperance area. Replacing it keeps localAreas at 6, still inside the 4–7 range.


### doorway

**`temperance-mi.ts`** — The acreage/pole-barn material is substantially interchangeable with three existing sibling pages. localConsiderations "Pole barns and machine sheds hold the real volume — the house is often the smaller half of the job" restates saline-mi's "Farm properties outside the city put the real work in the outbuildings rather than the house, and a pole barn or machine shed can hold more than the whole dwelling". "Outbuildings frequently hold fuel cans, oils, batteries and old tyres" restates shelby-township-mi's "Pole barns and outbuildings often hold heavier material than the house does — equipment, fuel cans, lumber, scrap and tyres". The long-gravel-drive consideration restates shelby-township-mi's "Long private and gravel drives set the limit on what can get near the building". Swap "Temperance" for "Saline" or "Shelby Township" and these three bullets read unchanged.

*Fix:* Keep only the genuinely Temperance-specific bullets (the Ohio-line/Toledo owners point, the well-and-septic point) and replace the three recycled ones with specifics that are true here and not in Oakland/Macomb/Washtenaw: e.g. the strip of Bedford Township frontage along Lewis Avenue where lots are deep but the road shoulder is the only staging space; the fact that unincorporated parcels have no city refuse service so nothing can be staged kerbside between days; the mix of 1960s–90s quad-levels whose split stairs make hand-carry the constraint rather than lot size.

**`temperance-mi.ts`** — FAQ 1, "Do you take down pole barns in Bedford Township?", is the fifth near-identical pole-barn FAQ on the site — canton-mi, saline-mi, shelby-township-mi and rochester-hills-mi all carry the same question and substantively the same answer ("Yes. Pole barns, outbuildings, sheds and the concrete pads underneath them are standard demolition work… we can clear what is stored inside first"). The Temperance answer adds nothing local.

*Fix:* Replace with a question only a Temperance caller would ask — e.g. "We're on well and septic. Can your equipment get to the barn without damaging the field?" — and answer with the actual constraint (locating the field and well head at the walkthrough, choosing a tracked or wheeled machine and an approach route accordingly).

**`monroe-mi.ts`** — The old-housing-stock material recycles the phrasing of two sibling pages. workContext's "interior gut-outs — plaster and lath, layered flooring, dated kitchens" is a reordering of ypsilanti-mi's "plaster and lath, old kitchens, layers of flooring". localConsiderations item 1 ("Cellars under the oldest houses are shallow with steep, narrow stairs") duplicates port-huron-mi's "Cellar stairs in pre-war houses are narrow and steep" and ypsilanti-mi's "unfinished stone or rubble basements with low headroom and one narrow stair". housingContext's "narrow side drives and detached garages set well back on the lot" reappears almost verbatim in marysville-mi. Swap "Monroe" for "Ypsilanti" or "Port Huron" in those lines and nothing looks wrong.

*Fix:* Cut the duplicated cellar-stairs and plaster-and-lath lines and lean on what is only true in Monroe: the River Raisin floodplain, the 1817-era street grid around Loranger Square with lot lines predating driveways, the Monroe historic-district streets, and the rural-edge pole barns to the north and west. The wet-basement consideration and FAQ 2 are the strongest content on the page — build outward from those rather than from generic pre-war-house copy.


### contract

**`temperance-mi.ts`** — localConsiderations item 1 says "heavy trucks and dumpster placement get planned around ground conditions". The company has exactly two services — Full Property Cleanouts and Demolition — and services.ts explicitly positions the offering against dumpster rental ("Debris volume that a dumpster rental won't cover"). Implying the crew places dumpsters advertises a service that does not exist.

*Fix:* Rewrite as "Long gravel or unpaved drives soften after rain, so where the truck and trailer can sit gets planned around ground conditions rather than convenience" — drop the dumpster reference entirely.


### minor

**`temperance-mi.ts`** — housingContext asserts "many parcels sit on well and septic", and localConsiderations builds a whole bullet on septic fields and private well heads. Large parts of Bedford Township are served by public water and sanitary sewer, so this is an unverified generalisation being used as load-bearing local fact.

*Fix:* Soften to the parcels where it is actually true: "the older farm parcels and the properties off the paved section lines are still on well and septic" — and scope the localConsiderations bullet the same way ("On parcels still on well and septic, …").

**`monroe-mi.ts`** — workContext claims houses have been "in one family since the mill and plant years" — an implied local industrial-history assertion presented as fact with no support anywhere in the content set, and vague enough that a reader cannot tell which mill or plant is meant.

*Fix:* Either drop the clause ("A house has been in one family for decades, and what comes out is an attic, a cellar and a back garage filled across that time") or make it a plainly non-specific tenure statement without invoking unnamed industry.

**`monroe-mi.ts`** — workContext ends "as are decks and slab pours on lots that flood-prone ground has been unkind to" — "slab pours" describes the act of pouring, not a structure to demolish, and "ground has been unkind to" is strained. The sentence obscures what is actually being offered.

*Fix:* Rewrite as "…as are decks and concrete slabs that have heaved or cracked on low, wet ground."


---

## oakland-county-mi — 13 issue(s)

> **Reviewer summary.** All six pages pass the mechanical contract checks: countySlug is oakland-county-mi everywhere, export names are correct camelCase, metaDescriptions run 151-159 characters, each has 3 FAQs, localAreas run 6-7 entries, and every nearbySlug is in the allowed list. No invented ordinances, fees, landfills, charities, statistics, prices or awards appear anywhere. The problems are elsewhere. First, doorway-grade recycling: the office-suite/lease-end/after-hours line appears in near-identical form on Farmington Hills, Southfield and the Troy exemplar with only the road name swapped; the condo-association parking consideration and its matching FAQ appear on Farmington Hills, Novi and Rochester Hills interchangeably; and the plaster-and-lath-is-heavier-than-drywall point is duplicated between Rochester and Royal Oak. Second, two accuracy issues: Novi places its older housing "south and toward the lake side" when Novi's lakes and surviving older stock are at the north-west end near Walled Lake, and Royal Oak's "Twelve Mile and Campbell" sits on or across the Madison Heights line. Third, Royal Oak's FAQ calls an interior gut-out "one of our two services", contradicting the fixed fact that the two services are Full Property Cleanouts and Demolition. Rochester and Rochester Hills are the strongest of the six — each has only a single shared-line issue. Southfield is well differentiated but promises interior gut-outs in its metaDescription that the body never delivers. No marketing puffery of the "nestled/vibrant/premier" kind was found on any page.


### fabrication

**`novi-mi.ts`** — housingContext says "South and toward the lake side there are still small older houses and midcentury ranches on smaller lots." Novi's lake frontage (Walled Lake, Shawood Lake) and its surviving pockets of small older houses are at the NORTH-WEST end of the city, not the south. South Novi (Ten Mile toward Eight Mile, Beck and Wixom Rd) is later subdivision and industrial development. A real Novi housing pattern is attributed to the wrong side of the city.

*Fix:* Rewrite as: "At the north-west end, near Walled Lake, there are still small older houses and midcentury ranches on smaller lots." Or drop the directional claim: "Pockets of small older houses and midcentury ranches survive on smaller lots near the older lake settlements."

**`royal-oak-mi.ts`** — localAreas lists "the Twelve Mile and Campbell neighbourhoods". Campbell Road runs along or just east of the Royal Oak / Madison Heights boundary in that stretch, so a neighbourhood at Twelve Mile and Campbell is not reliably inside Royal Oak — a misattribution risk on a page whose purpose is local specificity.

*Fix:* Replace with an unambiguously Royal Oak locality — "Northwood", "the Thirteen Mile and Crooks blocks", or "Red Run and Rochester Road" — or verify the boundary and, if it straddles, phrase it as "the Royal Oak side of Twelve Mile".


### doorway

**`farmington-hills-mi.ts`** — localConsiderations item 5 ("Office suite clearing off Northwestern Highway generally runs to a lease-end date and often needs after-hours access") is the Troy exemplar's Big Beaver line and Southfield's item 2 with the road name swapped. Swap the road name and the sentence reads perfectly on either sibling page.

*Fix:* Make it specific to Farmington Hills office stock: low-rise garden-office and medical/professional suites rather than towers, meaning ground-floor door access with no dock or service elevator to book, and carved-up multi-tenant space where only part of a floor is being emptied.

**`southfield-mi.ts`** — localConsiderations item 2 ("Office turnovers are usually tied to a lease-end date, so the schedule is fixed at the other end and the walkthrough needs to happen early") is the third page in the county making this point in near-identical words, after Troy and Farmington Hills.

*Fix:* Fold the lease-end point into item 1 (which already has the genuinely local dock/service-elevator detail) and replace item 2 with something only true here — e.g. that a single Town Center tenant may occupy several non-contiguous floors, so one "suite" clearing is really several jobs stacked into one dock booking.

**`farmington-hills-mi.ts`** — localConsiderations item 3 ("Condominium communities usually dictate where a vehicle may stage and whether a shared entry can be held open") plus FAQ 2 is functionally identical to novi-mi.ts item 3 and FAQ 3, and overlaps rochester-hills-mi.ts item 3. Three Oakland County pages all say the association decides where the truck parks.

*Fix:* Keep the point on one page only. Here, replace it with what is specific to the city's 1970s garden-style and mid-rise condo stock: exterior stair-and-balcony entries with no interior corridor, so the carry is outdoors and weather-dependent, and unit storage lockers sited in a separate building from the unit.

**`novi-mi.ts`** — FAQ 3 ("Tell us the parking and access rules the community enforces at the walkthrough and we plan the staging and timing around them") is farmington-hills-mi.ts FAQ 2 with the nouns rearranged, and both pages also carry the matching association-parking localConsideration, doubling the duplication.

*Fix:* Novi's attached housing is newer townhouse and site-condo product with private attached garages and driveway aprons, unlike Farmington Hills' older garden-style stock. Rewrite around that: garage-and-driveway loading at the unit itself, guest-parking limits on the shared drive, and site-condo associations governing the drive but not the unit's own apron.

**`rochester-mi.ts`** — localConsiderations item 4 ("Gut-outs in pre-war houses produce plaster, lath and old flooring — a heavier, denser load than a modern remodel of the same size") is the same observation as royal-oak-mi.ts item 5 ("Bungalow gut-outs produce plaster and lath, which is far heavier per room than modern drywall").

*Fix:* Keep the plaster-and-lath weight point on Royal Oak, where bungalow gut-outs are the page's stated core work. On Rochester, replace item 4 with something only this stock produces — a knob-and-tube-era attic, a coal-chute cellar bay and cast-iron radiators, all of which change what comes out and how it is carried up the cellar stairs.

**`rochester-hills-mi.ts`** — localConsiderations item 3 ("Long cul-de-sac drives and subdivision association rules affect where a truck can park and how long it stays") repeats the association-parking theme carried by Farmington Hills and Novi, and its first half restates the Troy exemplar's "Subdivision driveways generally take a truck and trailer without difficulty".

*Fix:* Cut it — item 2 (rolling lots and soft turf limiting trailer staging) is a stronger, genuinely local version of the same constraint. Four considerations is fine, or substitute a point about the older Avon Township road-frontage parcels having a shared or unpaved drive.


### contract

**`royal-oak-mi.ts`** — FAQ 2 answer states "Interior gut-outs are one of our two services". The fixed facts are that there are exactly two services: Full Property Cleanouts and Demolition. An interior gut-out is a form of demolition work, not one of the two named services; as written the page redefines the service taxonomy.

*Fix:* Change to: "Yes. Interior gut-outs fall under our demolition service — plaster, lath, cabinets, flooring, fixtures and non-structural walls come out and leave the shell ready for the trades."


### voice

**`royal-oak-mi.ts`** — localConsiderations item 1 says the crew works from the back "and the front of the house is never involved". "Never" is an absolute the company cannot guarantee — a blocked alley, an overhead line, or contents that must come out the front door all break it. The rest of the corpus hedges operational claims ("usually", "generally", "often").

*Fix:* Change to: "Where a block has an alley, the crew usually works from the back, which keeps the street frontage clear."


### minor

**`southfield-mi.ts`** — metaDescription promises "interior gut-outs", but the body never mentions gut-outs, demolition or teardown work at all — housingContext, workContext, all five localConsiderations and all three FAQs are cleanout-only. Southfield is the only one of the six with no demolition content despite Demolition being one of the two services.

*Fix:* Either drop "and interior gut-outs" from the metaDescription, or add the demolition angle that is real here: office suites stripped to bare shell between tenants (partition walls, dropped ceilings, cabling, built-in reception counters) and brick-ranch kitchen and bath gut-outs ahead of a resale. One localConsideration and one FAQ would cover it.

**`farmington-hills-mi.ts`** — FAQ 1 question reads "Our house is a quad-level. Does all those stairs change the price?" — subject-verb disagreement. It is the only ungrammatical sentence across the six pages and reads as sloppiness rather than colloquialism.

*Fix:* "Our house is a quad-level. Do all those stairs change the price?"

**`rochester-hills-mi.ts`** — FAQ 2 uses a curly apostrophe in "my parents’ house", and southfield-mi.ts FAQ 1 uses one in "the building’s dock hours", while troy-mi.ts and the other four pages use straight apostrophes throughout. Mixed apostrophe characters are inconsistent in rendered output and in diffing/search.

*Fix:* Normalise to straight apostrophes to match troy-mi.ts: "my parents' house" and "the building's dock hours". Worth a repo-wide check for U+2019 in src/content/.


---

## st-clair-county-mi — 8 issue(s)

> **Reviewer summary.** Neither page is clean. Contract-wise both are sound: correct countySlug (st-clair-county-mi, matching serviceAreas.ts line 162), correct camelCase exports, both registered in index.ts, metaDescriptions at 157 and 153 chars, 6 localAreas each, 3 FAQs each, localConsiderations 5 and 4, housing/work word counts inside the documented 40-70 / 60-100 ranges, and every nearbySlug drawn from the allowed list. Nothing contradicts the fixed facts — both pages state photo estimate by phone with the final quote in person, and both stay inside the two-service model. The problems are fabrication risk and, on Marysville, template bleed. Port Huron is the stronger page: the pre-war stock, stone cellars, alley-loaded garages and exterior-stair flats are genuinely city-specific and would not transplant to a sibling — but it misattributes Fort Gratiot (a separate township, already listed separately on the county page) to the city and names a street that appears not to exist as written (24th Avenue vs 24th Street), plus an "Edwardian" stock claim. Marysville is weaker: two of its six localAreas are doubtful or belong to Port Huron (Kraft/Krafft Road, Michigan Avenue), it opens with an unverified founding-history and decade claim, and its driveway consideration and first FAQ are recycled from the Troy exemplar. No puffery or condescension in either file — voice is clean throughout. Both pages also share a near-identical nearbySlugs set weighted toward Macomb County cities 35-55 miles away.


### fabrication

**`port-huron-mi.ts`** — localAreas lists "Fort Gratiot along 24th Avenue" as a Port Huron area. Fort Gratiot is a separate township immediately north of the city, not a Port Huron neighbourhood — and it is already listed as its own community in the St. Clair County service area (serviceAreas.ts line 181). The street is also wrong: Port Huron's north-south arterial is 24th Street, not 24th Avenue.

*Fix:* Replace with a locator actually inside the city, e.g. "North end around 24th Street" or "Bluewater/Krafft Road end of Pine Grove Avenue", and drop the Fort Gratiot reference (or move it to the county page where it already belongs).

**`port-huron-mi.ts`** — housingContext asserts "Victorian and Edwardian houses" as a Port Huron stock type. "Edwardian" is a British period label not used for American housing; applied here it reads as an unverified stylistic claim about a specific city's building stock.

*Fix:* Use American period terms that are defensible for a Great Lakes port city — e.g. "late-1800s and early-1900s frame and brick houses" — rather than naming architectural periods that were not applied to this stock.

**`marysville-mi.ts`** — localAreas includes "Kraft Road neighbourhoods" and "Michigan Avenue and the older grid". Both are doubtful as Marysville locators: the road in this area is Krafft Road (double f) and it runs through Port Huron/Fort Gratiot, not Marysville; Michigan Avenue is not a locator a Marysville resident would recognise as naming a district. Two of the six localAreas may be misattributed to the wrong municipality.

*Fix:* Verify each against a Marysville street map and replace unverified entries with confirmable ones (e.g. Marysville Golf Course area, Ballentine Street, Delaware/Ohio Avenue grid). Do not carry a Port Huron road into a Marysville page.

**`marysville-mi.ts`** — housingContext states "Marysville grew as a planned industrial town" and dates the riverside grid to "1920s and 1930s". This is a specific historical claim about the city's founding and the age of a housing cohort, presented as fact with no source, which is exactly what CONTENT_APPROVALS.md restricts.

*Fix:* Either confirm and cite internally, or soften to what is observable from the street: "an older grid of frame houses near the river, then postwar ranches and split-levels running west." Drop the founding-history assertion and the decade range.


### doorway

**`marysville-mi.ts`** — localConsiderations item 2 — "Wide, flat driveways on the postwar streets let the truck and trailer back right up, which usually keeps the job to one trip" — recycles the exemplar's phrasing almost verbatim (troy-mi.ts: "Subdivision driveways generally take a truck and trailer without difficulty, which keeps crew time down"). Swap "Marysville" for any postwar suburb in the county and the sentence is unchanged.

*Fix:* Replace with something only true here, or cut it. The genuinely Marysville-specific point already in the file is the contrast between the wide postwar drives west of town and the single-file drives on the river grid — merge the two into one item instead of asserting the generic one separately.

**`marysville-mi.ts`** — FAQ 1 is a structural clone of troy-mi.ts FAQ 1: same premise (basement + garage), same answer beats ("one full property cleanout", "where most of the volume sits" vs Troy's "usually where the volume is"). It carries no Marysville content beyond the city name in the question.

*Fix:* Rewrite around something specific to this page's own workContext — e.g. the workshop basement with machinery, lumber and paint stock, and what heavy contents mean for scoping — so the answer could not be pasted onto Troy.


### minor

**`port-huron-mi.ts`** — nearbySlugs are [marysville-mi, st-clair-shores-mi, clinton-township-mi, shelby-township-mi] — identical to the Marysville page's set apart from ordering. Three of the four are Macomb County communities roughly 35-55 miles away; St. Clair Shores in particular looks like a confusion of "St. Clair Shores" with St. Clair County. Presenting them as "nearby" is misleading to a reader and dilutes the internal-link signal.

*Fix:* Keep the one true neighbour (marysville-mi for Port Huron, port-huron-mi for Marysville) and, if the allowed slug list offers nothing else genuinely close, cut the list to the honest one or two rather than padding with Macomb cities. Also differentiate the two pages' lists from each other.

**`marysville-mi.ts`** — workContext asserts a market fact about buyers — "these houses sell to buyers who want them emptied and neutral" — stated as an established local condition without support.

*Fix:* Attribute it to the work rather than the market: "pre-listing clearing is a steady share of the calls" states what the company sees without claiming to know what local buyers want.


---

## washtenaw-county-mi — 12 issue(s)

> **Reviewer summary.** All three Washtenaw pages pass the hard contract checks: countySlug is washtenaw-county-mi and exists in serviceAreas.ts; export names (annArborMi, ypsilantiMi, salineMi) are correct camelCase; every nearbySlug is in the allowed list; metaDescriptions are 153/145/151 chars; each has 3 FAQs; localAreas are 7/7/6; housingContext (59/64/60 words) and workContext (90/87/86) sit inside the documented ranges. No prices, fees, ordinances, named landfills, charities, populations, distances or awards appear anywhere — the worst fabrication risk is a same-day estimate promise in the Ypsilanti FAQ and a couple of soft geographic assertions in Saline. The real weaknesses are (a) Ypsilanti's page repeatedly describing Ypsilanti Township — a separate municipality not in the county city list — as if it were the city, (b) two Saline lines that are near-paraphrases of the Troy exemplar, and (c) a class-tone asymmetry where Ypsilanti gets "bought cheap" / "plain" framing while Saline gets "unhurried and family-driven". Ann Arbor is the strongest of the three and needs only the "one of our two services" wording fix and the "one of the busier things we do here" experience claim softened. Nothing here is a doorway page in the whole-page sense; the flagged doorway items are sentence-level recycling.


### fabrication

**`ypsilanti-mi.ts`** — FAQ 3 promises "an estimate over the phone the same day in most cases". A same-day turnaround commitment is a service-level claim that appears nowhere in the site's fixed facts (photos over the phone → estimate; final quote on site in person) and is not made on any sibling page including the Troy exemplar. It is an invented promise the business may not be able to keep.

*Fix:* Drop the timing claim: "Send photos and we will give you an estimate over the phone. The final quote comes when we walk the unit."

**`ypsilanti-mi.ts`** — "estate clearing in houses held by one family since the Willow Run years" attaches a specific historical provenance to actual customer properties. Willow Run — the bomber plant and its wartime worker housing — sits in Ypsilanti Township and Willow Run Village, not the city core the rest of the paragraph describes, so this is both an unverifiable customer claim and a geographic misattribution.

*Fix:* Replace with something you can stand behind: "Alongside that: estate clearing in houses one family has held for generations, and bank-owned properties needing everything out before they can be listed."


### doorway

**`saline-mi.ts`** — localConsiderations item 3 — "Subdivision homes on the edges of town have deep attached garages and full basements, so the volume is usually well above what the main floor suggests" — is a near-paraphrase of the Troy exemplar's "Full basements are the norm, so a Troy cleanout is usually a whole-floor level more work than the square footage suggests". It also survives the city-swap test intact for Novi, Canton or Brighton.

*Fix:* Cut it and replace with something only true in Saline — e.g. the 1990s–2000s colonials with unfinished bonus space over the garage, or how far a truck has to stage on the newer cul-de-sac streets.

**`ann-arbor-mi.ts`** — All three new pages open workContext with the exemplar's two-market split and the same rhetorical shape (Troy: residential estate work plus Big Beaver commercial; Ann Arbor: "Two very different jobs share the same city"; Ypsilanti: investor/rental plus estate; Saline: in-town estate plus farm outbuildings), and each localConsiderations list runs the same cadence ending on an access-logistics bullet. The substance genuinely differs city to city, so these are not interchangeable pages, but the template is visible enough that a reader seeing two of them recognises the mould.

*Fix:* Vary the opening move on at least one page — lead Ann Arbor with the lease calendar as a single dominant driver instead of restating the two-market frame, and let one page's considerations run to three substantive items rather than padding to the exemplar's length.


### contract

**`ann-arbor-mi.ts`** — FAQ 3 says "Interior gut-outs — plaster, lath, cabinetry, flooring, non-structural walls — are one of our two services." The two services are Full Property Cleanouts and Demolition. An interior gut-out is a form of Demolition, not a service in its own right, so the sentence misstates the fixed service model to any reader who is counting.

*Fix:* "Interior gut-outs — plaster, lath, cabinetry, flooring, non-structural walls — are part of our demolition service."


### voice

**`ypsilanti-mi.ts`** — The framing is noticeably more disparaging than the sibling pages: "Houses bought cheap, gutted and turned over", "plain postwar bungalows", "mobile home parks", set against Saline's "unhurried and family-driven" owners. Read side by side, Ypsilanti is characterised by cheapness and churn and Saline by settled family life — condescension about a place, even if each individual phrase is defensible on its own.

*Fix:* Neutralise the value-laden words: "Investor purchases that are gutted and re-let generate steady interior demolition", and "postwar bungalows and ranches" without "plain".


### minor

**`ypsilanti-mi.ts`** — The page repeatedly treats Ypsilanti Township as part of the City of Ypsilanti: a localAreas entry "Ypsilanti Township along Ecorse and Michigan Avenue", plus housingContext/workContext passages about "the township", its bungalows, subdivisions and mobile home parks, and "ordinary month-to-month churn in the township". Ypsilanti Township is a separate municipality and is not among the Washtenaw cities listed in serviceAreas.ts (Ann Arbor, Ypsilanti, Saline, Chelsea, Dexter, Manchester, Milan, Pittsfield Township, Superior Township, Whitmore Lake). A city page that spends a third of its body on a neighbouring jurisdiction misattributes its geography.

*Fix:* Either drop the township material and keep the page inside the city limits (Depot Town, Historic East Side, Normal Park, College Heights, Cross Street, downtown Michigan Avenue), or keep one clearly-labelled sentence acknowledging surrounding-township work and remove the township localAreas entry so the list stays city-scoped.

**`saline-mi.ts`** — "the light-industrial and manufacturing area on the north edge of town" asserts a specific compass location for Saline's industrial district. Saline's main plant and industrial land are not straightforwardly on the north edge, and nothing in the repo supports the placement — an unverified geographic specific of exactly the kind a local would catch.

*Fix:* Drop the direction: "the light-industrial and manufacturing area at the edge of town", or name the corridor only once it is verified.

**`saline-mi.ts`** — localAreas lists "the Saline–Ann Arbor Road corridor". The road is universally known as Ann Arbor–Saline Road; the inverted form reads as written by someone who has not been there, which is the exact signal this audit is meant to catch.

*Fix:* Rename to "the Ann Arbor–Saline Road corridor".

**`saline-mi.ts`** — housingContext puts "silos" behind the farmhouses on acreage. Silos are working-farm grain/dairy infrastructure, not a general feature of the residential acreage being described, and the page never returns to them — workContext is about pole barns and machine sheds. It reads as stock rural set-dressing rather than observed detail.

*Fix:* Drop it: "farmhouses on acreage with pole barns and machine sheds behind them", which matches what workContext actually goes on to discuss.

**`ann-arbor-mi.ts`** — "Yes, and it is one of the busier things we do here" asserts an existing volume of student-rental jobs specifically in Ann Arbor — an unverifiable claim about work already performed in this city, the class of claim the brief flags as a claimed job or customer.

*Fix:* Recast as capability rather than track record: "Yes. Left-behind furniture, mattresses, kitchenware and general debris all come out under a full property cleanout."

**`ypsilanti-mi.ts`** — FAQ 2 closes with "Tight lots and rear-alley access are normal here; we confirm the approach on site before quoting" — the same implied-local-experience move as the Ann Arbor item, asserting familiarity with Ypsilanti job conditions the site cannot evidence.

*Fix:* "Tight lots and rear-alley access are no obstacle; we confirm the approach on site before quoting."


---

## wayne-county-mi — 16 issue(s)

> **Reviewer summary.** Audited all six Wayne County pages against troy-mi.ts and the contract. No hard contract violations: every file has countySlug "wayne-county-mi" (present in serviceAreas.ts), a correct camelCase export registered in index.ts, metaDescriptions between 146 and 160 characters, 4-7 localAreas, 4-5 localConsiderations, housingContext 54-63 words and workContext 83-97 words (all inside the documented ranges), 2-3 FAQs, and nearbySlugs drawn entirely from the permitted list. No factual contradictions of the fixed facts either — Detroit and Canton both state the photos-then-phone-estimate, final-quote-in-person sequence correctly, and no page invents a third service, a landfill or charity partner, a price, a named customer, a distance, an award, or a population figure. The real problems are elsewhere. Four fabrications: Dearborn misattributes Southwest Detroit's Springwells to Dearborn (the Dearborn place is Springwells Park) and invents the statistic "commercial cleanouts are half of what we do"; Westland asserts its housing stock was "originally built for autoworkers"; Redford claims a bulkhead door "can halve the carry-out". Six doorway findings, concentrated in two clusters — Livonia recycles Troy's housingContext nearly phrase for phrase and shares Troy's and Canton's identical "wide subdivision drives take a truck and trailer" line, while Dearborn and Redford both lean on Detroit's alley/gut-out material, with one FAQ answer and one localConsiderations sentence each that survive a city-name swap intact and a "saves a second mobilisation" closer recurring on four pages. Three voice issues: Dearborn's "houses are frequently multigenerational" is an unsupported demographic generalisation that reads as a stereotype, Westland talks down about Norwayne and its tenants, and Detroit's "whatever scrappers left behind" editorialises about the city. Two minor items round it out (Westland's ambiguous "Cherry Hill" against Canton's Cherry Hill Village, and Canton linking to non-adjacent Novi), plus a Redford city-versus-township naming inconsistency. No file is clean: Detroit is closest, needing only the scrapper line removed and its gut-out FAQ de-duplicated against Redford; Canton is next, needing its workContext differentiated from Livonia's. Livonia and Dearborn need the most rework — Livonia's housingContext is exemplar-derived and should be rewritten from scratch, and Dearborn carries a fabrication, a misattributed neighbourhood, a stereotype and duplicated Detroit content.


### fabrication

**`dearborn-mi.ts`** — localAreas lists "Springwells" as a Dearborn district. Springwells (Springwells Village, Vernor/Springwells) is a Southwest Detroit neighbourhood, not a Dearborn one — and detroit-mi.ts already claims "Southwest Detroit". The Dearborn place with that name is Springwells Park, the Ford-built subdivision off Rotunda/Greenfield. As written this misattributes a Detroit neighbourhood to Dearborn.

*Fix:* Change the localAreas entry to "Springwells Park", or drop it and use a verifiable Dearborn district instead (e.g. "Snow Woods" / "Ford Woods" / "Dearborn Hills").

**`dearborn-mi.ts`** — FAQ 3 answer opens "Commercial cleanouts are half of what we do." That is an invented business statistic — nothing in the site's fixed facts supports a 50% split, and no other page makes a proportional claim about the work mix.

*Fix:* Replace with a non-numeric statement of capability: "Yes — storefront and small-office clearing is regular work for us."

**`westland-mi.ts`** — housingContext asserts of Westland's small brick ranches and bungalows that "a lot of them originally built for autoworkers". This is an unsourced historical claim generalised to the whole housing stock; the documented case is Norwayne specifically, which was federal wartime defense-worker housing, not builder housing for autoworkers generally.

*Fix:* Delete "a lot of them originally built for autoworkers", or narrow it to Norwayne and describe it accurately as wartime defense-worker housing.

**`redford-mi.ts`** — localConsiderations item 2 claims a working bulkhead door "can halve the carry-out" — a specific 50% performance figure presented as fact, with nothing behind it.

*Fix:* Remove the quantification: "...worth checking before the day, because a usable bulkhead takes the whole load out at grade instead of up the stair."


### doorway

**`livonia-mi.ts`** — housingContext recycles the troy-mi exemplar almost phrase for phrase. Troy: "colonials and ranches on generous subdivision lots, most with attached garages, full basements and a shed or two out back". Livonia: "brick ranches and colonials on square subdivision lots — full basements, attached two-car garages, a shed at the back fence". Swap the city name and the sentence is the Troy page.

*Fix:* Rewrite around what is specific to Livonia's build-out: the strict mile-road grid, the 1950s-70s tract builders, Rosedale Gardens as the pre-war exception, and the fact that most of the city is one platted generation deep rather than layered.

**`livonia-mi.ts`** — localConsiderations item 2 ("Subdivision drives are wide and flat, so a truck and trailer can usually back close to the garage and cut the carry distance right down") is the same observation as troy-mi's "Subdivision driveways generally take a truck and trailer without difficulty, which keeps crew time down" and canton-mi's "Wide subdivision drives take a truck and trailer easily". Three pages, one filler line.

*Fix:* Keep it on at most one page. On Livonia replace it with something only true here — e.g. the mile-road grid means no cul-de-sac turning problem, or the Clarenceville strip's older narrower drives.

**`canton-mi.ts`** — workContext is substantially interchangeable with livonia-mi's: both are "first wave of subdivisions turning over, pre-listing clearing, empty-nesters downsizing, big basement plus garage plus shed". Only the pole-barn sentence is genuinely Canton. The two pages sit in the same county and will read as templates of each other.

*Fix:* Cut the generic downsizing paragraph back to one clause and lead on what is actually distinct: township-not-city rules and the split between 1990s-2000s subdivision stock east of Canton Center and working acreage out toward Ridge Road.

**`dearborn-mi.ts`** — The alley material duplicates detroit-mi. localConsiderations item 1 mirrors Detroit's item 1 (alley-loaded, crew works from the rear), and FAQ 1's answer is a near-restatement of Detroit's FAQ 2 answer, down to the same conditional — check the alley at the walkthrough, otherwise "bring everything around the side" / "come around the side of the house".

*Fix:* Keep the alley FAQ on Detroit only. On Dearborn make the access point specific to East Dearborn — narrow side drives between houses, no kerb frontage for a trailer on the Warren Avenue side streets — and give the page a Dearborn-only FAQ instead (e.g. clearing above-store apartments on Warren).

**`redford-mi.ts`** — FAQ 1 ("clear it and gut the interior in one go") repeats detroit-mi FAQ 1 in substance and structure — clear what is left, strip kitchen/bath/flooring, house is a shell for the trades. The closer "saves you a second mobilisation" also appears verbatim-ish in westland-mi FAQ 3 and in paraphrase in canton-mi FAQ 2, so one stock line is doing duty on four Wayne County pages.

*Fix:* Drop the duplicate FAQ from Redford and replace it with something the Redford page alone would answer (single-width drive access for a rehab dumpster/trailer, or township rental-registration turnover timing). Vary or remove the "second mobilisation" closer so it appears on at most one page.

**`redford-mi.ts`** — localConsiderations item 3 ("Lots are close enough together that a trailer on the street affects the neighbours, so we agree staging and timing at the walkthrough") is the same sentence as dearborn-mi item 2 ("Lots sit close together and there is rarely room to park a trailer at the kerb without blocking a neighbour, so staging is planned at the walkthrough").

*Fix:* Keep it on one page. On Redford, replace with the actual local constraint: the long side drive means the trailer stays at the kerb and the whole load is a 60-80 foot carry, so timing is set by carry distance rather than by volume.


### voice

**`dearborn-mi.ts`** — workContext states "Houses are frequently multigenerational, which means more of everything." This is an unsupported demographic generalisation about Dearborn households, and in a city defined in the popular mind by its Arab-American community it reads as a stereotype about the residents rather than an observation about the buildings.

*Fix:* Delete the sentence. If the point is volume, tie it to tenure and the building — long ownership in a house with a full basement and a floored attic that were never thinned out — which the paragraph already says.

**`westland-mi.ts`** — "Norwayne is the extreme case — rows of very small wartime-era units on slabs and short blocks" plus workContext's "sometimes a unit that has been badly neglected" talks down about a specific low-income neighbourhood and its tenants rather than describing the work.

*Fix:* Neutral and factual: "Norwayne is the oldest of it — compact wartime units on slabs, no basements, short blocks." In workContext, say "units that need a full clear before any repair work starts" instead of characterising them as neglected.

**`detroit-mi.ts`** — workContext's "and whatever scrappers left behind" is an editorialising aside about the city rather than a description of scope, and it is the kind of line a Detroit reader notices on a page selling to them.

*Fix:* Replace with the concrete condition: "...and stripped fixtures or opened walls where copper and mechanicals were pulled."


### minor

**`westland-mi.ts`** — localAreas lists "Cherry Hill" while its sibling canton-mi.ts lists "Cherry Hill Village". Cherry Hill Road does run through Westland, but the district name is strongly identified with Canton's Cherry Hill Village, so the bare form reads as a borrowed area on the wrong page.

*Fix:* Disambiguate to "Cherry Hill Road corridor", or swap for an unambiguously Westland area such as "Hix Road" or "Palmer and Venoy".

**`canton-mi.ts`** — nearbySlugs includes novi-mi. Novi is in Oakland County and is not adjacent to Canton (Northville Township sits between them), while genuinely adjacent served cities are omitted. The slug is on the allowed list so this is not a hard contract break, but it weakens the internal-linking logic.

*Fix:* Replace "novi-mi" with a closer served city — "redford-mi" or "ann-arbor-mi" — or keep the list to the three genuine neighbours.

**`redford-mi.ts`** — cityName is "Redford" but housingContext correctly calls it "Redford Township"; the H1, metaDescription and primaryKeyword all render the bare city form for a place that has no city incorporation. Residents and searchers use "Redford Township" or "Redford, MI" interchangeably, but the page is internally inconsistent about which it is.

*Fix:* Pick one and use it throughout — most likely keep cityName "Redford" for URL/keyword purposes and change housingContext's opener to "Redford is small houses on narrow lots...", or set cityName to "Redford Township" and update metaDescription to match.
