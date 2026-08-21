export type Project = {
  slug: string;
  title: string;
  city: string;
  propertyType: string;
  serviceSlug: string;
  challenge: string;
  outcome: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
};

/**
 * PLACEHOLDER POLICY: no fabricated project photos, results, or timelines.
 *
 * Matched before/after photography now EXISTS in public/images/photos (the
 * garage pair, *-crew-sorting-before / *-cleared-bay-after, and the townhouse
 * pair, townhouse-contents-staged-before / townhouse-patio-cleared-after) and
 * the garage pair is shown side by side by BeforeAfterSection.
 *
 * This array stays empty because an entry additionally requires the things a
 * photo cannot supply: the city, property type, challenge and outcome must be
 * verified with Dante rather than inferred from the image, and each property
 * needs written owner permission (CONTENT_APPROVALS.md, "Final photography
 * permissions"). Fill both in and the identical-angle slider turns on by
 * itself — no template changes needed.
 */
export const projects: Project[] = [];
