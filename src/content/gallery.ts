import type { BeforeAfterSet } from "@/types/content";

/**
 * Before & After — the only job photography published on /projects and in the
 * home-page preview. Both read from here.
 *
 * Rules for adding a set:
 *   - A "pair" is one Before and one After of the SAME view of the same
 *     property. Only pair two photos when the match is visible in the frames
 *     themselves (same walls, windows, fixtures, garage door), never on the
 *     strength of a folder name or a date alone.
 *   - A "project" set is Before and After photos from the same job where the
 *     individual shots are not matched view for view (e.g. the interior was
 *     taken out so completely that no before angle survives). It is labelled
 *     as a group, and must never be laid out as if frame N matched frame N.
 *   - No captions are shown under the photos, but alt text is required and
 *     must describe what is actually in the frame.
 *   - Team, family, and equipment photos do not belong here.
 *
 * Sources (client Google Drive, "Photo/Video" folder):
 *   - driveway: IMG_0629 2.PNG (before) / IMG_0630 2.PNG (after), phone
 *     screenshots cropped to the photo area. Same beige garage, coach lamps,
 *     and neighboring porch flag in both frames.
 *   - townhouse, garage: matched pairs already in the library (see
 *     IMAGE_REQUIREMENTS.md, "Before/after pairs").
 *   - demolition: "Demolition 1" project, Before folder IMG_7067–IMG_7082
 *     (21 Aug 2026) and After folder IMG_7121–IMG_7126 (27 Aug 2026).
 */
export const beforeAfterSets: BeforeAfterSet[] = [
  {
    id: "driveway-cleanout",
    kind: "pair",
    before: {
      src: "/images/photos/driveway-cleanout-before.jpg",
      alt: "Furniture, tarps, boxes, and household contents piled across a driveway and front lawn in front of a beige garage.",
      width: 1170,
      height: 1556,
    },
    after: {
      src: "/images/photos/driveway-cleanout-after.jpg",
      alt: "The same driveway and beige garage completely cleared, with only a shop vacuum left on the concrete.",
      width: 1170,
      height: 1556,
    },
  },
  {
    id: "townhouse-patio",
    kind: "pair",
    before: {
      src: "/images/photos/townhouse-contents-staged-before.jpg",
      alt: "Boxes, storage bins, and household contents piled on a townhouse patio beside a wooden privacy fence.",
      width: 1600,
      height: 1067,
    },
    after: {
      src: "/images/photos/townhouse-patio-cleared-after.jpg",
      alt: "The same townhouse patio cleared and swept, with the brick wall, windows, and fence unchanged.",
      width: 1600,
      height: 1067,
    },
  },
  {
    id: "garage-cleanout",
    kind: "pair",
    before: {
      src: "/images/photos/garage-cleanout-crew-sorting-before.jpg",
      alt: "Two workers sorting through a garage packed to the door line with lumber, bins, tools, and stored goods.",
      width: 1600,
      height: 1067,
    },
    after: {
      src: "/images/photos/garage-cleanout-cleared-bay-after.jpg",
      alt: "The same garage emptied to a bare floor, with a red tool chest, cabinets, and a shelf left in place.",
      width: 1600,
      height: 1067,
    },
  },
  {
    id: "commercial-interior-demolition",
    kind: "project",
    before: [
      {
        src: "/images/photos/demolition-teardown-before-04.jpg",
        alt: "A carpeted open office area with a suspended tile ceiling and a lit exit sign, before demolition.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/photos/demolition-teardown-before-05.jpg",
        alt: "A carpeted office corridor lined with doorways and a built-in counter, before demolition.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/photos/demolition-teardown-before-01.jpg",
        alt: "A carpeted private office with painted wall paneling and a suspended tile ceiling, before demolition.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/photos/demolition-teardown-before-07.jpg",
        alt: "A private office with painted paneling, a wall vent, and carpet, before the interior was torn out.",
        width: 1200,
        height: 1600,
      },
    ],
    after: [
      {
        src: "/images/photos/demolition-teardown-after-01.jpg",
        alt: "The same building's interior stripped to bare block walls, exposed ductwork, and a concrete slab.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/photos/demolition-teardown-after-02.jpg",
        alt: "The stripped interior looking toward the rear windows, with the slab exposed and the ceiling open.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/photos/demolition-teardown-after-03.jpg",
        alt: "A long open span of bare block wall and concrete floor where partitions and offices were removed.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/photos/demolition-teardown-after-04.jpg",
        alt: "The stripped interior showing the full depth of the building, with wall openings left in the block.",
        width: 1200,
        height: 1600,
      },
    ],
  },
];

/** Every photograph on the Before & After page, in display order. */
export const beforeAfterPhotos = beforeAfterSets.flatMap((set) =>
  set.kind === "pair" ? [set.before, set.after] : [...set.before, ...set.after],
);
