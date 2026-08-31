import type { GalleryPhoto } from "@/types/content";

/**
 * Every approved job photograph, in display order, shown in full on /projects.
 *
 * This is the single source of truth for job photography — the home page strip
 * and the projects gallery both read from here, so adding a photo to this array
 * is the only step needed to publish it.
 *
 * Adding a photo:
 *   1. Drop the file in public/images/photos (see IMAGE_REQUIREMENTS.md).
 *   2. Add an entry here with real alt text describing what is actually shown.
 *   3. Put it in the position you want it to appear — newest work reads best
 *      near the top.
 *
 * Alt text is not optional and must not be padded with keywords; it is what a
 * screen-reader user gets instead of the image.
 */
export const galleryPhotos: GalleryPhoto[] = [
  // ---- Commercial interior gut-out, August 2026 -------------------------
  // The largest job documented on the site: a fully partitioned office suite
  // taken back to bare block and slab. Shot 21 August (before) and 27 August
  // (after), so the pairing is the same building six days apart.
  {
    src: "/images/photos/demolition-teardown-before-02.jpg",
    alt: "A Redemption crew member walking the main corridor of a carpeted commercial office suite during the walkthrough before demolition.",
    caption: "Commercial gut-out — walking the suite before work began.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-05.jpg",
    alt: "The main corridor of a commercial office suite, lined with doorways and a built-in counter, before demolition.",
    caption: "The corridor and offices as we found them.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-04.jpg",
    alt: "A wide carpeted office area opening onto a corridor beneath a suspended tile ceiling, with a lit exit sign, before demolition.",
    caption: "Open office area, suspended ceiling still in place.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-01.jpg",
    alt: "A carpeted commercial office with painted wall paneling and a suspended tile ceiling, before demolition.",
    caption: "One of the private offices, before.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-03.jpg",
    alt: "A carpeted office seen through its doorway, with a window looking out to the parking lot, before demolition.",
    caption: "Looking into an office off the corridor.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-07.jpg",
    alt: "A private office with painted paneling, a wall vent and carpet, before the interior was stripped.",
    caption: "Painted paneling and carpet throughout.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-08.jpg",
    alt: "A second private office with a ceiling vent and carpeted floor, before the interior was stripped.",
    caption: "Every room came out, floor to ceiling.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-before-06.jpg",
    alt: "A tiled washroom with a vanity, mirror and toilet inside the commercial suite, before demolition.",
    caption: "Fixtures and fittings included.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-after-01.jpg",
    alt: "The same commercial interior stripped to bare block walls, exposed ductwork and a concrete slab after the gut-out.",
    caption: "The same building, gutted to bare block and slab.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-after-05.jpg",
    alt: "The gutted commercial interior looking back toward the entrance, with services and a water heater left standing against bare block.",
    caption: "Partitions, ceilings and flooring all removed.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-after-03.jpg",
    alt: "A long open span of bare block wall and concrete floor where the corridor and offices used to be.",
    caption: "Where the corridor and offices used to be.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-after-04.jpg",
    alt: "The stripped commercial interior showing the full depth of the building, with framing openings left in place.",
    caption: "Full depth of the building, opened up.",
    category: "demolition",
  },
  {
    src: "/images/photos/demolition-teardown-after-02.jpg",
    alt: "The gutted suite looking toward the rear windows, with the concrete slab exposed and the ceiling structure open.",
    caption: "Left clean and ready for the next build-out.",
    category: "demolition",
  },
  // ---- end of the August 2026 gut-out -----------------------------------
  {
    src: "/images/photos/full-property-cleanout-removal.jpg",
    alt: "Furniture, mattresses, and bagged household contents staged for removal alongside a home during a full property cleanout.",
    caption: "Full property cleanout — contents staged for removal.",
    category: "cleanout",
  },
  {
    src: "/images/photos/light-demolition-deck-removal.jpg",
    alt: "A Redemption crew member cutting apart a rotted deck frame with a reciprocating saw during a demolition job.",
    caption: "Deck demolition — cut down and hauled out.",
    category: "demolition",
  },
  {
    src: "/images/photos/garage-cleanout-crew-sorting-before.jpg",
    alt: "A Redemption crew sorting stored contents in a packed garage before clearing it out.",
    caption: "Garage cleanout — before.",
    category: "cleanout",
  },
  {
    src: "/images/photos/garage-cleanout-cleared-bay-after.jpg",
    alt: "A garage bay emptied and swept at the end of a full garage cleanout.",
    caption: "The same garage — after.",
    category: "cleanout",
  },
  {
    src: "/images/photos/estate-cleanout-driveway-staging.jpg",
    alt: "Household furniture, shelving, and equipment sorted and staged on a driveway during an estate cleanout.",
    caption: "Estate cleanout — contents sorted before anything leaves.",
    category: "cleanout",
  },
  {
    src: "/images/photos/commercial-forklift-pallet-loading.jpg",
    alt: "A forklift loading shrink-wrapped pallets of office equipment into a Redemption dump trailer during a commercial cleanout.",
    caption: "Commercial cleanout — palletised equipment loaded out.",
    category: "cleanout",
  },
  {
    src: "/images/photos/severe-clutter-living-room-before.jpg",
    alt: "A living room filled with accumulated household contents and debris before a severe-clutter cleanout.",
    caption: "Severe clutter — a living room before work began.",
    category: "cleanout",
  },
  {
    src: "/images/photos/pole-barn-cleared-interior.jpg",
    alt: "The interior of a pole barn cleared of stored contents and equipment.",
    caption: "Pole barn cleared out, floor to rafters.",
    category: "cleanout",
  },
  {
    src: "/images/photos/townhouse-contents-staged-before.jpg",
    alt: "Townhouse contents carried out and staged on the patio before removal during a move-out cleanout.",
    caption: "Move-out cleanout — before.",
    category: "cleanout",
  },
  {
    src: "/images/photos/townhouse-patio-cleared-after.jpg",
    alt: "A townhouse patio cleared and swept after a move-out cleanout, ready for the next occupant.",
    caption: "The same townhouse — after.",
    category: "cleanout",
  },
  {
    src: "/images/photos/severe-clutter-basement-before.jpg",
    alt: "A basement packed with accumulated household contents before a severe-clutter cleanout.",
    caption: "A full basement, before clearing.",
    category: "cleanout",
  },
  {
    src: "/images/photos/yard-debris-and-equipment-removal.jpg",
    alt: "Derelict mowers, a rusted utility trailer, and bagged debris left behind in the yard of a vacated property.",
    caption: "Exterior clearing on a distressed property.",
    category: "cleanout",
  },
  {
    src: "/images/photos/cleared-garage-bay-after.jpg",
    alt: "A swept, completely emptied garage bay at the end of a cleanout.",
    caption: "Garage bay, cleared and swept.",
    category: "cleanout",
  },
  {
    src: "/images/photos/garage-cleanout-in-progress.jpg",
    alt: "Furniture and household items moved out of a garage during a residential cleanout.",
    caption: "A garage cleanout in progress.",
    category: "cleanout",
  },
  {
    src: "/images/photos/crew-branded-shirts-yard-clearing.jpg",
    alt: "Two Redemption crew members in branded shirts clearing overgrowth from a backyard pergola.",
    caption: "The crew on site.",
    category: "crew",
  },
  {
    src: "/images/photos/branded-truck-and-dump-trailer-residential-drive.jpg",
    alt: "Redemption's branded truck and dump trailer staged in a residential driveway at the start of a cleanout.",
    caption: "Truck and trailer on site.",
    category: "crew",
  },
  {
    src: "/images/photos/branded-truck-dump-trailer-driveway.jpg",
    alt: "A Redemption truck and dump trailer backed into a driveway and loaded during a property cleanout.",
    caption: "Loaded and ready to haul.",
    category: "crew",
  },
  {
    src: "/images/photos/branded-dump-trailer-curbside.jpg",
    alt: "A Redemption branded dump trailer parked curbside outside a residential property during a cleanout.",
    caption: "Curbside during a residential job.",
    category: "crew",
  },
  {
    src: "/images/photos/metal-recycling-load-dropoff.jpg",
    alt: "A loaded Redemption trailer at a scrap-metal recycling facility during disposal of cleanout material.",
    caption: "Scrap metal diverted to recycling rather than landfill.",
    category: "crew",
  },
];
