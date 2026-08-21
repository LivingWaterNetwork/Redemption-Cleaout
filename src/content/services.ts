import type { ServiceDefinition } from "@/types/content";

export const services: ServiceDefinition[] = [
  {
    slug: "full-property-cleanouts",
    name: "Full-Property Cleanouts",
    shortName: "Full-Property Cleanouts",
    priority: 1,
    image: {
      src: "/images/photos/full-property-cleanout-removal.jpg",
      alt: "Furniture, mattresses, and bagged household contents staged for removal alongside a home during a full-property cleanout.",
      caption: "A full-property cleanout staged for removal — every room, top to bottom.",
    },
    primaryKeyword: "full property cleanout",
    heroHeadline: "Full-Property Cleanouts",
    metaDescription:
      "Complete full-property cleanouts in Rochester, Rochester Hills, and Oakland County — every room, garage, basement, attic, and outbuilding cleared and left ready for what's next.",
    situation:
      "You need an entire property emptied — every room, closet, garage, basement, attic, and outbuilding — not just a single room or a curbside pickup.",
    definition:
      "A full-property cleanout is a complete, top-to-bottom removal of a property's contents. It's the flagship service Redemption is built around: on-site scoping, a real crew, and a plan for what gets donated, recycled, or hauled away.",
    weHandle: [
      "Full interior clearing — every room, closet, and storage area",
      "Garages, basements, attics, and outbuildings",
      "Furniture, appliances, and bulk household goods",
      "Sorting for donation, recycling, and disposal",
      "Broom-swept final condition on completion",
    ],
    mayRequireSpecialist: [
      "Regulated asbestos abatement",
      "Mold or water-damage remediation",
      "Biohazard or crime-scene cleanup",
    ],
    whoItsFor: [
      "Homeowners clearing a property before listing or renovation",
      "Families managing an inherited or estate property",
      "Landlords and property managers after a tenant move-out",
      "Investors and flippers prepping a property for the next phase",
    ],
    commonConditions: [
      "Years of accumulated belongings across every room",
      "A mix of items to keep, donate, and discard",
      "Limited access — stairs, tight hallways, or no working elevator",
      "A closing date, listing date, or renovation start date driving the timeline",
    ],
    process: [
      { title: "Walkthrough", description: "We assess the property in person and scope the full job before quoting." },
      { title: "Clear Plan", description: "You get a clear scope, timeline, and what's included before work begins." },
      { title: "Full Clearing", description: "Our crew clears the entire property, room by room, safely and completely." },
      { title: "Sort & Divert", description: "Items are sorted for donation and recycling where possible, not just landfilled by default." },
      { title: "Final Walkthrough", description: "We walk the property with you at completion to confirm the job matches what was promised." },
    ],
    relatedServiceSlugs: ["estate-cleanouts", "foreclosure-cleanouts", "hoarding-cleanouts"],
    faqs: [
      {
        question: "How long does a full-property cleanout take?",
        answer:
          "It depends on the property's size and condition. A typical single-family home is scoped and scheduled after an on-site walkthrough, which is how we give you a real timeline instead of a guess.",
      },
      {
        question: "Do you sort items for donation?",
        answer:
          "Yes. Where it's practical, we separate usable items for donation and materials for recycling rather than sending everything to a landfill by default.",
      },
      {
        question: "Can you work around a closing or listing date?",
        answer:
          "Deadline awareness is part of how we scope every full-property job. Tell us your date during the walkthrough and we'll build the plan around it.",
      },
    ],
  },
  {
    slug: "estate-cleanouts",
    name: "Estate and Inherited-Property Cleanouts",
    shortName: "Estate Cleanouts",
    priority: 2,
    image: {
      src: "/images/photos/estate-cleanout-driveway-staging.jpg",
      alt: "Household furniture, shelving, and equipment sorted and staged on a driveway during an estate cleanout.",
      caption: "Contents sorted and staged during an estate cleanout, so nothing leaves before it's reviewed.",
    },
    primaryKeyword: "estate cleanout",
    heroHeadline: "Estate and Inherited-Property Cleanouts",
    metaDescription:
      "Judgment-free estate and inherited-property cleanouts for families, executors, and out-of-state heirs across Rochester and Oakland County, Michigan.",
    situation:
      "You're settling an estate or handling a property you've inherited — often while managing grief, distance, probate deadlines, or family coordination at the same time.",
    definition:
      "An estate cleanout clears a property's contents after a loss, an inheritance, or a move into senior care — handled with the pace and privacy the situation calls for, and coordinated with executors, attorneys, or estate-sale companies when needed.",
    weHandle: [
      "Full-property clearing for estate and inherited homes",
      "Coordination around estate-sale companies when items are being sold first",
      "Careful handling of sentimental or valuable items you flag to keep",
      "Flexible scheduling around probate and closing timelines",
      "Out-of-state coordination by phone, text, and photo updates",
    ],
    mayRequireSpecialist: [
      "Appraisal or sale of valuable antiques, art, or collectibles",
      "Legal or probate guidance",
      "Estate-sale execution (we work alongside estate-sale companies, not in place of them)",
    ],
    whoItsFor: [
      "Families managing an estate after a loss",
      "Executors and personal representatives",
      "Out-of-state family members managing Michigan property",
      "Heirs preparing an inherited property for sale",
    ],
    commonConditions: [
      "A lifetime of belongings to sort through under time pressure",
      "Family members who disagree on what to keep",
      "A property that's been vacant and needs a full clearing before it can be shown or sold",
      "Coordination needed with an attorney, executor, or estate-sale company",
    ],
    process: [
      { title: "Initial Conversation", description: "We talk through the situation, timeline, and who's involved in the decision." },
      { title: "Walkthrough", description: "An on-site walkthrough scopes the work and flags anything that needs special handling." },
      { title: "Coordinated Clearing", description: "We clear the property on the schedule that works for your family, estate sale, or closing date." },
      { title: "Respectful Handling", description: "Sentimental and valuable items you flag are set aside, never discarded by default." },
      { title: "Property Ready", description: "The property is left ready for its next step — sale, renovation, or handoff." },
    ],
    relatedServiceSlugs: ["full-property-cleanouts", "move-out-cleanouts", "hoarding-cleanouts"],
    faqs: [
      {
        question: "Can you work with our estate-sale company?",
        answer:
          "Yes. We regularly coordinate with estate-sale companies — clearing what remains after a sale, or working around a sale's schedule.",
      },
      {
        question: "I live out of state. Can this be handled without me being there?",
        answer:
          "Yes. We can walk the property, scope the job, and keep you updated by phone, text, and photos throughout, with one accountable point of contact.",
      },
      {
        question: "What if some items need to be kept or given to family members first?",
        answer:
          "Tell us during the walkthrough or before work begins. We'll set those items aside and confirm with you before anything is removed.",
      },
    ],
  },
  {
    slug: "commercial-cleanouts",
    name: "Commercial Property Cleanouts",
    shortName: "Commercial Cleanouts",
    priority: 3,
    image: {
      src: "/images/photos/commercial-forklift-pallet-loading.jpg",
      alt: "A forklift loading shrink-wrapped pallets of office equipment into a Redemption dump trailer during a commercial cleanout.",
      caption: "Palletised commercial equipment loaded out — scaled to the site, not to a pickup truck.",
    },
    primaryKeyword: "commercial property cleanout",
    heroHeadline: "Commercial Property Cleanouts",
    metaDescription:
      "Commercial cleanouts for offices, retail, and warehouse space in Rochester, Rochester Hills, and Oakland County — scheduled around your operating hours.",
    situation:
      "You're closing, relocating, or turning over a commercial space and need furniture, fixtures, equipment, or inventory cleared out on a business timeline.",
    definition:
      "A commercial property cleanout clears office, retail, warehouse, or industrial space of furniture, fixtures, equipment, and leftover inventory — scheduled around your operating hours and lease deadlines.",
    weHandle: [
      "Office furniture, cubicles, and fixtures",
      "Retail fixtures, shelving, and leftover inventory",
      "Warehouse racking and miscellaneous equipment",
      "Scheduling around business hours, tenant turnover, or lease-end dates",
      "Coordination with property managers and commercial brokers",
    ],
    mayRequireSpecialist: [
      "Regulated demolition or structural work",
      "Hazardous-materials handling",
      "IT equipment data destruction (coordinate with your own IT vendor first)",
    ],
    whoItsFor: [
      "Commercial property owners and landlords",
      "Property managers handling tenant turnover",
      "Businesses relocating or closing a location",
      "Commercial brokers preparing space for a new tenant",
    ],
    commonConditions: [
      "A lease-end or turnover date driving the schedule",
      "After-hours or weekend access requirements",
      "A mix of furniture, fixtures, and inventory to clear",
      "Multiple stakeholders — owner, tenant, and broker — needing the same information",
    ],
    process: [
      { title: "Walkthrough", description: "We scope the space in person, including access and scheduling constraints." },
      { title: "Scope & Schedule", description: "You get a clear plan built around your lease dates and operating hours." },
      { title: "Clearing", description: "Our crew clears the space efficiently, with minimal disruption to ongoing operations." },
      { title: "Turnover-Ready", description: "The space is left ready for the next tenant, sale, or renovation phase." },
    ],
    relatedServiceSlugs: ["light-demolition", "full-property-cleanouts", "foreclosure-cleanouts"],
    faqs: [
      {
        question: "Can this be scheduled after hours or on weekends?",
        answer:
          "In many cases, yes. Tell us your operating hours and constraints during the walkthrough and we'll build the schedule around them.",
      },
      {
        question: "Do you work directly with property managers and brokers?",
        answer:
          "Yes. We're set up to communicate with the property manager, broker, or ownership group directly, with one accountable point of contact.",
      },
    ],
  },
  {
    slug: "foreclosure-cleanouts",
    name: "Foreclosure and Distressed-Property Cleanouts",
    shortName: "Foreclosure Cleanouts",
    priority: 4,
    image: {
      src: "/images/photos/yard-debris-and-equipment-removal.jpg",
      alt: "Derelict mowers, a rusted utility trailer, and bagged debris left behind in the yard of a vacated property.",
      caption: "A distressed property cleared of everything the previous occupant left behind.",
    },
    primaryKeyword: "foreclosure cleanout",
    heroHeadline: "Foreclosure and Distressed-Property Cleanouts",
    metaDescription:
      "Foreclosure and distressed-property cleanouts for banks, asset managers, investors, and foreclosure companies across Rochester and Oakland County, Michigan.",
    situation:
      "A property has been vacated, abandoned, or repossessed and needs to be cleared quickly and documented for a lender, investor, or asset manager.",
    definition:
      "A foreclosure or distressed-property cleanout clears an abandoned or repossessed property — including any tenant or owner belongings left behind — and prepares it for inspection, listing, or renovation, on the fast timeline these situations usually require.",
    weHandle: [
      "Full clearing of abandoned or repossessed property contents",
      "Debris and damaged-material removal",
      "Photo documentation of before-and-after condition when requested",
      "Fast turnaround for lender and asset-manager timelines",
      "Repeat-volume capacity for ongoing foreclosure or REO work",
    ],
    mayRequireSpecialist: [
      "Legal notice or eviction process (must be completed before cleanout)",
      "Regulated hazardous-material remediation",
      "Structural repair or code-violation resolution",
    ],
    whoItsFor: [
      "Foreclosure and REO companies",
      "Banks and asset managers",
      "Investors and house flippers",
      "Property managers handling abandoned units",
    ],
    commonConditions: [
      "Property abandoned with contents left behind by a prior owner or tenant",
      "A fast turnaround needed for listing, inspection, or auction",
      "Ongoing, repeat volume across multiple properties",
      "A need for documentation before and after the work",
    ],
    process: [
      { title: "Request & Access", description: "We confirm legal access and scope the property, often from a single point of contact." },
      { title: "Walkthrough", description: "An on-site assessment confirms scope, condition, and any documentation needs." },
      { title: "Clearing", description: "The property is cleared quickly and completely, ready for the next step in the process." },
      { title: "Documentation", description: "Before-and-after photos are provided when requested, for your file or client." },
    ],
    relatedServiceSlugs: ["commercial-cleanouts", "hoarding-cleanouts", "light-demolition"],
    faqs: [
      {
        question: "Can you handle repeat volume across multiple properties?",
        answer:
          "Yes — repeat-work capacity for foreclosure and REO partners is part of what Redemption is built for, not an exception.",
      },
      {
        question: "Do you provide before-and-after documentation?",
        answer:
          "Yes, when requested. We can provide photo documentation of condition before and after the cleanout for your records.",
      },
      {
        question: "What if the property still has an eviction or legal process pending?",
        answer:
          "Legal access must be confirmed before we begin. We'll coordinate scheduling once that process is complete.",
      },
    ],
  },
  {
    slug: "hoarding-cleanouts",
    name: "Hoarding-Related Cleanouts",
    shortName: "Hoarding-Related Cleanouts",
    priority: 5,
    image: {
      src: "/images/photos/severe-clutter-living-room-before.jpg",
      alt: "A living room filled with accumulated household contents and debris before a severe-clutter cleanout.",
      caption: "A severe-clutter room before work begins — scoped in person, handled without judgment.",
    },
    primaryKeyword: "hoarding cleanout",
    heroHeadline: "Hoarding-Related Cleanouts",
    metaDescription:
      "Judgment-free, severe-clutter and hoarding-related cleanouts in Rochester and Oakland County, Michigan — handled with respect, privacy, and a clear plan.",
    situation:
      "Severe clutter has made a property difficult or unsafe to live in or sell, and the situation needs to be handled without judgment or unnecessary exposure.",
    definition:
      "A hoarding-related cleanout clears a severely cluttered property in a way that respects the person connected to it — a private, judgment-free process focused on getting the space back to safe, usable condition.",
    weHandle: [
      "Full clearing of severely cluttered interiors and exteriors",
      "Careful sorting when specific items need to be kept or reviewed first",
      "Debris and damaged-material removal",
      "Discreet scheduling and crew conduct",
      "Coordination with family members, caseworkers, or property managers when appropriate",
    ],
    mayRequireSpecialist: [
      "Mold or biohazard remediation beyond general debris",
      "Structural repair from long-term neglect",
      "Mental-health or social-work support for the person connected to the property",
    ],
    whoItsFor: [
      "Families managing severe clutter for a loved one",
      "Property owners preparing a severely cluttered home for sale",
      "Landlords and property managers after a severe-clutter tenancy",
      "Adult protective services and caseworkers coordinating a property resolution",
    ],
    commonConditions: [
      "Clutter that limits safe movement through the property",
      "Structural or sanitation concerns tied to the volume of items",
      "A family or individual who needs the process handled privately",
      "Uncertainty about which items should be kept, reviewed, or removed",
    ],
    process: [
      { title: "Private Conversation", description: "We talk through the situation directly, without judgment, before anything is scheduled." },
      { title: "Walkthrough", description: "An on-site walkthrough scopes the real condition of the property, not a guess from photos." },
      { title: "Clear Plan", description: "You get a straightforward plan — what's involved, what it costs, and what to expect." },
      { title: "Careful Clearing", description: "Our crew clears the property methodically, setting aside anything flagged to review." },
      { title: "Space Restored", description: "The property is left safe, cleared, and ready for its next use." },
    ],
    relatedServiceSlugs: ["full-property-cleanouts", "estate-cleanouts", "residential-junk-removal"],
    faqs: [
      {
        question: "Will the crew be respectful and discreet?",
        answer:
          "Yes. This is handled the same way as any other property in transition — professionally, privately, and without judgment.",
      },
      {
        question: "Can specific items be kept or reviewed before removal?",
        answer:
          "Yes. Tell us during the walkthrough or before work begins, and we'll set those items aside for review.",
      },
      {
        question: "Do you use the term \"hoarder\"?",
        answer:
          "No. We refer to these as hoarding-related or severe-clutter cleanouts — describing the property's condition, not labeling the person.",
      },
    ],
  },
  {
    slug: "residential-junk-removal",
    name: "Residential Junk Removal",
    shortName: "Residential Junk Removal",
    priority: 6,
    image: {
      src: "/images/photos/garage-cleanout-in-progress.jpg",
      alt: "Furniture and household items moved out of a garage during a residential cleanout.",
      caption: "A garage cleanout in progress — furniture and bulk items cleared in one visit.",
    },
    primaryKeyword: "residential junk removal",
    heroHeadline: "Residential Junk Removal",
    metaDescription:
      "Residential junk removal for garages, basements, attics, and single-room cleanouts in Rochester and Rochester Hills, Michigan.",
    situation:
      "You need a specific area cleared — a garage, basement, attic, single room, or a batch of furniture and appliances — without a full-property cleanout.",
    definition:
      "Residential junk removal clears a defined area or specific items — furniture, appliances, yard debris, or a single overloaded space — for homeowners who don't need a full-property cleanout.",
    weHandle: [
      "Garage, basement, and attic clearing",
      "Furniture and appliance removal",
      "Yard and garage debris",
      "Single-room or partial-property cleanouts",
    ],
    mayRequireSpecialist: [
      "Appliance refrigerant recovery (handled per applicable regulations)",
      "Hazardous household chemical disposal",
    ],
    whoItsFor: [
      "Homeowners decluttering a specific space",
      "Renters clearing items before a move",
      "Anyone with a defined pickup rather than a whole-property job",
    ],
    commonConditions: [
      "One or two rooms, a garage, or a basement needing clearing",
      "A specific list of furniture or appliances to remove",
      "A quick turnaround for a smaller job",
    ],
    process: [
      { title: "Quick Scope", description: "Tell us what needs to go — we'll confirm scope by phone, text, or a short on-site look." },
      { title: "Schedule", description: "We schedule a pickup window that works for you." },
      { title: "Removal", description: "Our crew removes the items and leaves the space clean." },
    ],
    relatedServiceSlugs: ["move-out-cleanouts", "full-property-cleanouts", "hoarding-cleanouts"],
    faqs: [
      {
        question: "Do you take single items, like a couch or old appliance?",
        answer:
          "Yes, for defined pickups. Full-property and larger cleanouts remain our priority focus, but we do take on smaller jobs.",
      },
      {
        question: "Do I need to be present for the pickup?",
        answer: "In most cases, yes, or we'll confirm access arrangements with you in advance.",
      },
    ],
  },
  {
    slug: "move-out-cleanouts",
    name: "Move-Out and Downsizing Cleanouts",
    shortName: "Move-Out Cleanouts",
    priority: 7,
    image: {
      src: "/images/photos/townhouse-patio-cleared-after.jpg",
      alt: "A townhouse patio cleared and swept after a move-out cleanout, ready for the next occupant.",
      caption: "A unit cleared and swept after a move-out — ready to hand back or list.",
    },
    primaryKeyword: "move-out cleanout",
    heroHeadline: "Move-Out and Downsizing Cleanouts",
    metaDescription:
      "Move-out and downsizing cleanouts for homeowners, renters, and families relocating or transitioning to senior living in Rochester and Oakland County, Michigan.",
    situation:
      "You're moving, downsizing, or transitioning to a smaller space or senior living, and need to clear out what isn't coming with you.",
    definition:
      "A move-out or downsizing cleanout removes furniture, belongings, and household items being left behind during a relocation, downsize, or transition — clearing the way for movers, closing, or a new tenant.",
    weHandle: [
      "Furniture and belongings not moving to the new location",
      "Full or partial property clearing tied to a move-out date",
      "Coordination with senior-move and transition professionals",
      "Donation sorting for items in good condition",
    ],
    mayRequireSpecialist: [
      "Professional moving and packing of items you're keeping (we handle removal, not relocation moves)",
      "Senior-transition placement services",
    ],
    whoItsFor: [
      "Homeowners downsizing to a smaller home",
      "Families coordinating a senior-living transition",
      "Renters clearing a unit at lease-end",
      "Landlords preparing a unit after a move-out",
    ],
    commonConditions: [
      "A move date or lease-end date setting the timeline",
      "A mix of items moving, being donated, and being discarded",
      "Coordination with a senior-move manager or family members",
    ],
    process: [
      { title: "Walkthrough", description: "We scope what's staying and what's going, on-site." },
      { title: "Schedule Around Your Move", description: "We build the timeline around your move date or lease-end date." },
      { title: "Clearing", description: "We clear everything that isn't moving with you." },
      { title: "Ready for Handoff", description: "The property is left ready for movers, a landlord walkthrough, or the next tenant." },
    ],
    relatedServiceSlugs: ["residential-junk-removal", "estate-cleanouts", "full-property-cleanouts"],
    faqs: [
      {
        question: "Can you work around our moving company's schedule?",
        answer:
          "Yes — tell us your move date and we'll coordinate our timeline around it.",
      },
      {
        question: "Do you help with senior-living transitions?",
        answer:
          "Yes. We regularly coordinate with families and senior-move professionals managing a transition to a smaller space or care setting.",
      },
    ],
  },
  {
    slug: "light-demolition",
    name: "Light Demolition and Site Preparation",
    shortName: "Light Demolition",
    priority: 8,
    image: {
      src: "/images/photos/light-demolition-deck-removal.jpg",
      alt: "A Redemption crew member cutting apart a rotted deck frame with a reciprocating saw during a light demolition job.",
      caption: "A rotted deck cut down and removed — light demolition, scoped to site conditions.",
    },
    primaryKeyword: "light demolition",
    heroHeadline: "Light Demolition and Site Preparation",
    metaDescription:
      "Light demolition and site preparation — interior tear-outs and small-scale demolition — in Rochester and Oakland County, Michigan. Scope subject to site conditions and approval.",
    situation:
      "A property needs interior tear-out or small-scale demolition work before renovation, sale, or reuse — beyond removing contents.",
    definition:
      "Light demolition and site preparation covers interior tear-outs and small-scale demolition work that prepares a space for renovation or its next use. Scope is subject to site conditions and approval on a case-by-case basis — this is not regulated structural demolition or asbestos abatement.",
    weHandle: [
      "Interior tear-outs (non-structural walls, fixtures, flooring)",
      "Removal of damaged or outdated interior materials",
      "Site clearing and debris removal after tear-out",
      "Preparation for renovation, occupancy, or resale",
    ],
    mayRequireSpecialist: [
      "Structural demolition or load-bearing wall removal",
      "Asbestos or lead abatement",
      "Permitted demolition requiring licensed contractors",
    ],
    whoItsFor: [
      "Homeowners and investors renovating a property",
      "Builders and contractors needing site prep before their crew starts",
      "Property owners clearing damaged materials before repair",
    ],
    commonConditions: [
      "Outdated or damaged interior materials needing removal before renovation",
      "A property that needs to be site-ready for a contractor's next phase",
      "Uncertainty about what falls inside a light-demolition scope versus a licensed contractor's scope",
    ],
    process: [
      { title: "Site Walkthrough", description: "We assess the site in person to confirm what falls within a light-demolition scope." },
      { title: "Scope & Approval", description: "Scope is confirmed and approved before any tear-out work begins — nothing assumed in advance." },
      { title: "Tear-Out & Clearing", description: "We complete the approved tear-out work and clear resulting debris." },
      { title: "Site-Ready Handoff", description: "The space is left ready for the next phase of renovation or use." },
    ],
    relatedServiceSlugs: ["commercial-cleanouts", "full-property-cleanouts", "foreclosure-cleanouts"],
    faqs: [
      {
        question: "Does this include structural or permitted demolition?",
        answer:
          "No. Light demolition covers interior tear-outs and small-scale work only. Structural demolition and asbestos abatement require licensed specialists, and scope is confirmed on-site before any work begins.",
      },
      {
        question: "Can you coordinate with our contractor or builder?",
        answer:
          "Yes. We regularly prepare sites ahead of a contractor's next phase and can coordinate timing directly with them.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}

export const flagshipServices = services.filter((s) => s.priority <= 5);
export const supportingServices = services.filter((s) => s.priority > 5);
