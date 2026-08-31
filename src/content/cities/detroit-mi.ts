import type { CityDefinition } from "@/types/content";

export const detroitMi: CityDefinition = {
  slug: "detroit-mi",
  cityName: "Detroit",
  countySlug: "wayne-county-mi",
  stateAbbr: "MI",
  localAreas: [
    "East English Village and Morningside",
    "Grandmont–Rosedale",
    "Southwest Detroit",
    "Boston-Edison and Palmer Woods",
    "Corktown and Woodbridge",
    "Jefferson–Chalmers",
    "Brightmoor",
  ],
  housingContext:
    "Most of Detroit was built before the war and it shows in the work: brick bungalows with a dormered half-storey, wood-frame two-family flats, and four-squares on narrow lots with a rear alley and a detached garage. Grander stock survives in Boston-Edison, Indian Village and Palmer Woods. Newer infill now sits alongside all of it, block by block.",
  workContext:
    "Two kinds of call dominate here. One is family: a parent’s bungalow of fifty years cleared for probate or a sale, with a Michigan basement, a floored attic and a garage nobody has opened in a decade. The other is investment — REO and long-vacant houses bought to rehab, which need everything stripped before trades can start: plaster and lath, old kitchens, water-damaged flooring, and whatever scrappers left behind. Demolition work skews to failed detached garages, rear sheds, porches and full interior gut-outs.",
  localConsiderations: [
    "Most older neighbourhoods are alley-loaded, so the crew often loads from the rear rather than the street — but alley condition varies block to block and we check it on the walkthrough",
    "Michigan basements are common: low headroom, stone walls and a steep straight stair, so the contents come out by hand rather than down a ramp",
    "A two-family flat puts half the job on an upper floor served by one narrow interior staircase, which changes the crew size more than the square footage does",
    "Vacant and REO houses usually need access and utilities established before anything moves; we walk the property first and tell you what is actually inside",
    "Rehab gut-outs and the cleanout are frequently the same visit — the debris from stripping plaster and cabinets is far more weight than the furniture left in the house",
  ],
  faqs: [
    {
      question: "I bought a vacant house in Detroit to rehab. Can you gut it as well as clear it out?",
      answer:
        "Yes — that is one job for us, not two. We clear whatever is left in the house, then take the interior back to studs and joists where you need it: plaster, lath, cabinets, flooring, ceilings and non-structural partitions. Tell us at the walkthrough what the trades need left in place.",
    },
    {
      question: "The detached garage behind my house is falling in. Can you take it down?",
      answer:
        "Garage teardowns are routine work, including the slab if you want it out. Access matters more than size in Detroit — we will look at whether the alley is usable or whether everything has to come around the side of the house, and price the job on what we find.",
    },
    {
      question: "I inherited a Detroit house and I live out of state. How do I get a price?",
      answer:
        "Send photos and we will give you an estimate over the phone, so you know the range before you travel. The final quote is given in person after we walk the property — for a house that has been closed up a while, that walkthrough usually changes what we find.",
    },
  ],
  metaDescription:
    "Property cleanouts and demolition in Detroit, Michigan — estate, foreclosure and REO clearing, interior gut-outs and garage teardowns across the city.",
  primaryKeyword: "property cleanout Detroit MI",
  nearbySlugs: ["dearborn-mi", "redford-mi", "southfield-mi", "warren-mi", "livonia-mi"],
};
