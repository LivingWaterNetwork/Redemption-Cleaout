import type { ServiceAreaDefinition } from "@/types/content";

/**
 * COUNTY-LEVEL COVERAGE.
 *
 * Redemption serves all of Metro Detroit. This file previously held two city
 * pages (Rochester and Rochester Hills), which tied the whole site to one
 * corner of Oakland County; those slugs are 301'd to oakland-county-mi in
 * next.config.mjs.
 *
 * Each county gets its own landing page rather than one combined list, because
 * "cleanout company in <city>" is how this work is actually searched for. That
 * only holds up if every entry stays genuinely distinct — real city lists, real
 * property context. Do not add a county by copying another and swapping names.
 */
export const serviceAreas: ServiceAreaDefinition[] = [
  {
    slug: "oakland-county-mi",
    countyName: "Oakland",
    stateAbbr: "MI",
    cities: [
      "Rochester",
      "Rochester Hills",
      "Troy",
      "Auburn Hills",
      "Pontiac",
      "Royal Oak",
      "Birmingham",
      "Bloomfield Hills",
      "Farmington Hills",
      "Southfield",
      "Novi",
      "Waterford",
      "West Bloomfield",
      "Clarkston",
      "Lake Orion",
      "Oxford",
      "Ferndale",
      "Madison Heights",
      "Commerce Township",
      "Milford",
      "Wixom",
      "South Lyon",
    ],
    heroHeadline: "Property Cleanouts and Demolition in Oakland County",
    metaDescription:
      "Full property cleanouts and demolition throughout Oakland County, Michigan — Rochester, Troy, Royal Oak, Farmington Hills, Novi, Pontiac, and the surrounding communities.",
    localIntroduction:
      "Oakland County is where Redemption started and still runs the most jobs. The county's range is unusual — mid-century ranches in Royal Oak and Ferndale, large estate properties in Bloomfield Hills and Birmingham, subdivision homes across Troy, Novi, and Rochester Hills, lake properties around Waterford and West Bloomfield, and commercial corridors through Southfield, Auburn Hills, and Pontiac. A cleanout here can be a two-bedroom condo or a forty-year family home with a full basement, attic, and pole barn.",
    propertyContext:
      "A large share of Oakland County work is estate and inherited property — long-held family homes changing hands after a death, a downsize, or a move into care, often with heirs coordinating from out of state. The rest splits between pre-listing clearing for realtors and investors, tenant turnover for landlords and property managers, and demolition ahead of the renovation work that's constant across the county's older housing stock.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Do you cover all of Oakland County?",
        answer:
          "Yes — from Ferndale and Royal Oak in the south through Rochester, Troy, and Auburn Hills, out to Novi, Milford, and South Lyon on the west side, and up through Clarkston, Oxford, and Lake Orion.",
      },
      {
        question: "Can you handle an Oakland County estate property with heirs out of state?",
        answer:
          "Regularly. We walk the property, send photos, and keep one point of contact by phone and text so nobody has to fly in to get the job scoped or done.",
      },
    ],
    approved: true,
  },
  {
    slug: "macomb-county-mi",
    countyName: "Macomb",
    stateAbbr: "MI",
    cities: [
      "Warren",
      "Sterling Heights",
      "Clinton Township",
      "Shelby Township",
      "Macomb Township",
      "St. Clair Shores",
      "Roseville",
      "Eastpointe",
      "Chesterfield",
      "Mount Clemens",
      "Utica",
      "Washington Township",
      "Romeo",
      "New Baltimore",
      "Fraser",
      "Harrison Township",
      "Richmond",
      "Armada",
    ],
    heroHeadline: "Property Cleanouts and Demolition in Macomb County",
    metaDescription:
      "Full property cleanouts and demolition across Macomb County, Michigan — Warren, Sterling Heights, Clinton Township, Shelby Township, St. Clair Shores, Mount Clemens, and surrounding communities.",
    localIntroduction:
      "Macomb County runs from dense postwar neighborhoods in Warren, Roseville, and Eastpointe up through the newer subdivisions of Shelby and Macomb townships and out to the farmland and acreage around Romeo, Armada, and Richmond. Redemption works the whole county, and the job changes with the geography — a Warren bungalow with a packed basement and detached garage is a different scope from a five-acre Washington Township property with a pole barn and outbuildings to clear.",
    propertyContext:
      "Northern Macomb brings a steady volume of garage, barn, and outbuilding work along with the house itself, plus demolition on failing sheds, decks, and detached garages. South county is heavier on rental turnover, estate clearing in long-held family homes, and distressed and foreclosure property for asset managers. Along the lake in St. Clair Shores and Harrison Township, seasonal properties and boat-and-dock-adjacent storage add their own kind of accumulation.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Do you go as far north as Romeo, Armada, and Richmond?",
        answer:
          "Yes. Northern Macomb acreage — pole barns, outbuildings, and equipment left on the property — is regular work for us, not an exception we charge a premium for.",
      },
      {
        question: "Can you take down a garage or barn in Macomb County?",
        answer:
          "Yes. Detached garages, sheds, pole barns, and decks are core demolition work, and the same crew hauls the debris out so you're not left with a pile.",
      },
    ],
    approved: true,
  },
  {
    slug: "wayne-county-mi",
    countyName: "Wayne",
    stateAbbr: "MI",
    cities: [
      "Detroit",
      "Livonia",
      "Dearborn",
      "Westland",
      "Canton",
      "Taylor",
      "Redford",
      "Plymouth",
      "Northville",
      "Wyandotte",
      "Trenton",
      "Garden City",
      "Southgate",
      "Romulus",
      "Belleville",
      "Allen Park",
      "Lincoln Park",
      "Woodhaven",
      "Grosse Pointe",
      "Grosse Ile",
    ],
    heroHeadline: "Property Cleanouts and Demolition in Wayne County",
    metaDescription:
      "Full property cleanouts and demolition throughout Wayne County, Michigan — Detroit, Livonia, Dearborn, Canton, Westland, Plymouth, the Grosse Pointes, and Downriver.",
    localIntroduction:
      "Wayne County covers Detroit itself, the western suburbs through Livonia, Canton, Plymouth, and Northville, the Grosse Pointes on the lake, and the Downriver communities from Wyandotte to Woodhaven. It's the county with the widest spread of property condition in the region — century-old Detroit housing stock, tight Downriver bungalows, and large Canton and Northville subdivision homes all in the same service area.",
    propertyContext:
      "Wayne County brings the heaviest concentration of distressed and vacant property work in Metro Detroit: foreclosure and REO clearing for banks and asset managers, investor properties being cleared before a rehab, and structures that are past saving and need to come down. Alongside that runs the ordinary volume — estate clearing in the Grosse Pointes and Redford, rental turnover across Westland, Taylor, and Romulus, and pre-listing cleanouts for realtors countywide.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Do you work in the city of Detroit?",
        answer:
          "Yes. Detroit property — occupied, vacant, or distressed — is part of our regular Wayne County work, residential and commercial alike.",
      },
      {
        question: "Can you clear a property and then demolish the structure?",
        answer:
          "Yes, and in Wayne County that's a common combination. Running both through one company means one scope and one schedule instead of two contractors waiting on each other.",
      },
    ],
    approved: true,
  },
  {
    slug: "st-clair-county-mi",
    countyName: "St. Clair",
    stateAbbr: "MI",
    cities: [
      "Port Huron",
      "Fort Gratiot",
      "Marysville",
      "St. Clair",
      "Algonac",
      "Marine City",
      "Yale",
      "Capac",
      "China Township",
      "Clay Township",
      "Kimball",
      "Casco",
    ],
    heroHeadline: "Property Cleanouts and Demolition in St. Clair County",
    metaDescription:
      "Full property cleanouts and demolition in St. Clair County, Michigan — Port Huron, Marysville, St. Clair, Algonac, Marine City, Fort Gratiot, and surrounding communities.",
    localIntroduction:
      "St. Clair County stretches along the river from Algonac and Marine City up through St. Clair and Marysville to Port Huron, with farmland and small towns like Yale and Capac inland. Redemption serves the county in full. Properties here skew older and larger-lotted than the inner suburbs, and a job often includes a detached garage, a barn, or a boathouse alongside the main structure.",
    propertyContext:
      "River and lakefront property brings seasonal and second-home clearing — cottages being sold, decades of stored equipment, docks and boathouses. Inland, the work is closer to farm clearing: outbuildings, machinery, and scrap accumulated on acreage over many years. Estate clearing is steady throughout, and demolition demand runs high on aging garages, sheds, and river-property structures that weather hard.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Is St. Clair County too far out for you?",
        answer:
          "No. Port Huron, Marysville, Algonac, and the surrounding townships are inside our normal service area — send photos and we'll get you an estimate the same as anywhere else in Metro Detroit.",
      },
      {
        question: "Can you clear a cottage or river property that's been sitting for years?",
        answer:
          "Yes. Long-vacant seasonal property, stored equipment, and outbuildings are exactly the kind of scope a full property cleanout is built for.",
      },
    ],
    approved: true,
  },
  {
    slug: "livingston-county-mi",
    countyName: "Livingston",
    stateAbbr: "MI",
    cities: [
      "Brighton",
      "Howell",
      "Hartland",
      "Fowlerville",
      "Pinckney",
      "Hamburg Township",
      "Green Oak Township",
      "Genoa Township",
      "Deerfield Township",
    ],
    heroHeadline: "Property Cleanouts and Demolition in Livingston County",
    metaDescription:
      "Full property cleanouts and demolition in Livingston County, Michigan — Brighton, Howell, Hartland, Fowlerville, Pinckney, and the surrounding townships.",
    localIntroduction:
      "Livingston County sits on the western edge of Metro Detroit, built around Brighton and Howell with lake communities through Pinckney and Hamburg Township and working farmland out toward Fowlerville. Lots are large, outbuildings are common, and the distance between properties means scheduling matters — we scope Livingston jobs to be done in as few trips as possible.",
    propertyContext:
      "Most Livingston work involves more than the house: pole barns, detached shops, horse property, and equipment or vehicles left on acreage. Lake properties around Pinckney and Hamburg bring seasonal storage and cottage clearing. Demolition is a bigger share here than in the inner suburbs — aging barns, sheds, and outbuildings that have outlived their use and need to come down and be hauled off in one pass.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Do you clear pole barns and acreage in Livingston County?",
        answer:
          "Yes. Barns, shops, and everything accumulated on the land around them are standard scope for us, and we can take the structure down too if it's coming out.",
      },
      {
        question: "How does scheduling work out in Brighton, Howell, or Fowlerville?",
        answer:
          "The same as anywhere else — photos for a ballpark estimate, then an on-site walkthrough for the final quote. We plan Livingston jobs to be completed in as few trips as the scope allows.",
      },
    ],
    approved: true,
  },
  {
    slug: "washtenaw-county-mi",
    countyName: "Washtenaw",
    stateAbbr: "MI",
    cities: [
      "Ann Arbor",
      "Ypsilanti",
      "Saline",
      "Chelsea",
      "Dexter",
      "Manchester",
      "Milan",
      "Pittsfield Township",
      "Superior Township",
      "Whitmore Lake",
    ],
    heroHeadline: "Property Cleanouts and Demolition in Washtenaw County",
    metaDescription:
      "Full property cleanouts and demolition in Washtenaw County, Michigan — Ann Arbor, Ypsilanti, Saline, Chelsea, Dexter, Milan, and surrounding communities.",
    localIntroduction:
      "Washtenaw County centers on Ann Arbor and Ypsilanti, with smaller towns — Saline, Chelsea, Dexter, Manchester, Milan — and township acreage filling in around them. Redemption covers the county in full. Ann Arbor's older neighborhoods and dense rental stock create a different set of access problems than the region's subdivisions: narrow streets, tight driveways, upper-floor units, and no easy place to put a trailer.",
    propertyContext:
      "Rental turnover is a constant in Ann Arbor and Ypsilanti, with student-housing cycles clustering move-out work into short windows. Alongside that runs estate clearing in long-held homes, pre-listing cleanouts, and interior gut-outs for the renovation work that older Washtenaw housing stock generates. In the outlying townships the job looks more rural — barns, outbuildings, and equipment on acreage.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Can you handle a tight Ann Arbor property with no driveway access?",
        answer:
          "Yes, and it's why the final quote is given on site. Limited access — narrow streets, upper floors, no place to stage a trailer — changes crew size and time, so we confirm it in person rather than guessing from photos.",
      },
      {
        question: "Do you handle student rental turnovers in Ypsilanti and Ann Arbor?",
        answer:
          "Yes. Tell us the lease-end dates and we'll build the schedule around the turnover window, including multiple units.",
      },
    ],
    approved: true,
  },
  {
    slug: "monroe-county-mi",
    countyName: "Monroe",
    stateAbbr: "MI",
    cities: [
      "Monroe",
      "Temperance",
      "Bedford Township",
      "Dundee",
      "Carleton",
      "South Rockwood",
      "Newport",
      "Ida",
      "Erie",
      "Luna Pier",
    ],
    heroHeadline: "Property Cleanouts and Demolition in Monroe County",
    metaDescription:
      "Full property cleanouts and demolition in Monroe County, Michigan — Monroe, Temperance, Bedford Township, Dundee, Carleton, Newport, and surrounding communities.",
    localIntroduction:
      "Monroe County anchors the southern end of Metro Detroit, from the city of Monroe and the lakeshore at Luna Pier and Erie across to Dundee and Ida, and north through Carleton, Newport, and South Rockwood toward the Wayne County line. Redemption serves the whole county, including the Bedford Township and Temperance communities on the Ohio border.",
    propertyContext:
      "Monroe County property tends toward older homes on generous lots with detached garages, sheds, and pole barns — which means a cleanout here often includes the outbuildings and whatever has been stored in them for decades. Lakeshore property adds seasonal and cottage clearing, and the county's farm parcels bring equipment, scrap, and barn structures that are frequently better demolished than repaired.",
    relevantServiceSlugs: ["full-property-cleanouts", "demolition"],
    faqs: [
      {
        question: "Do you come as far south as Monroe and Temperance?",
        answer:
          "Yes. Monroe County is part of our Metro Detroit service area, all the way down to Erie, Luna Pier, and the Bedford Township line.",
      },
      {
        question: "Can you demolish a barn or outbuilding on a Monroe County property?",
        answer:
          "Yes. Barns, sheds, garages, and other outbuildings are standard demolition scope, and we clear the debris and the site in the same job.",
      },
    ],
    approved: true,
  },
];

export const approvedServiceAreas = serviceAreas.filter((a) => a.approved);

export function getServiceAreaBySlug(slug: string): ServiceAreaDefinition | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}

/** Plain-language county list used in copy and schema. */
export const countyNames = serviceAreas.map((a) => a.countyName);
