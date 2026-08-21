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
 * Stays empty until authentic before/after photography and verified project
 * details are supplied (see CONTENT_APPROVALS.md, "Final photography
 * permissions") and privacy-reviewed per the brief's photography rules.
 */
export const projects: Project[] = [];
