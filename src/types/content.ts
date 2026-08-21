export type AddressConfig = {
  /**
   * Master switch for publicly displaying the full street address (footer,
   * contact page, map embeds, LocalBusiness schema). Leadership must confirm
   * all conditions in CONTENT_APPROVALS.md before this becomes true.
   */
  publicAddressEnabled: boolean;
  /** Internal only — never rendered while publicAddressEnabled is false. */
  street: string;
  city: string;
  state: string;
  zip: string;
  /** Safe to show publicly regardless of publicAddressEnabled. */
  publicAreaDescription: string;
};

export type BusinessInfo = {
  name: string;
  legalTagline: string;
  founderName: string;
  phoneDisplay: string;
  phoneHref: string;
  primaryDomain: string;
  instagramHandle: string;
  instagramUrl: string;
  address: AddressConfig;
  serviceRegionSummary: string;
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceImage = {
  src: string;
  alt: string;
  /** Short caption shown under the image. Must describe real work only. */
  caption: string;
};

export type ServiceDefinition = {
  slug: string;
  name: string;
  shortName: string;
  priority: number;
  /** Authentic job photography. Omit when no approved photo exists yet. */
  image?: ServiceImage;
  heroHeadline: string;
  metaDescription: string;
  situation: string;
  definition: string;
  weHandle: string[];
  mayRequireSpecialist: string[];
  whoItsFor: string[];
  commonConditions: string[];
  process: ProcessStep[];
  relatedServiceSlugs: string[];
  faqs: ServiceFAQ[];
  primaryKeyword: string;
};

export type AudienceDefinition = {
  slug: string;
  name: string;
  shortName: string;
  heroHeadline: string;
  metaDescription: string;
  summary: string;
  needs: string[];
  howRedemptionHelps: string[];
  relatedServiceSlugs: string[];
  faqs: ServiceFAQ[];
  ctaLabel: string;
  primaryKeyword: string;
};

export type ServiceAreaDefinition = {
  slug: string;
  cityName: string;
  stateAbbr: string;
  heroHeadline: string;
  metaDescription: string;
  localIntroduction: string;
  propertyContext: string;
  relevantServiceSlugs: string[];
  faqs: ServiceFAQ[];
  approved: boolean;
};

export type ResourceDefinition = {
  slug: string;
  /** Editorial headline. Rendered as the page H1 and in the /resources index. */
  title: string;
  /**
   * Shorter title for the <title> tag only. The root template appends
   * " | Redemption Cleanout Services" (31 characters), so a full editorial
   * headline pushes the tag well past the ~60 characters a SERP displays and
   * the keyword gets truncated away. Set this to a front-loaded short form and
   * leave `title` as the headline. Falls back to `title` when omitted.
   */
  seoTitle?: string;
  metaDescription: string;
  summary: string;
  publishedAt: string;
  sections: { heading: string; body: string[] }[];
};

export type FAQEntry = ServiceFAQ & {
  category: string;
};

export type Testimonial = {
  id: string;
  authorLabel: string;
  role: string | null;
  quote: string;
  projectType: string | null;
  city: string | null;
  verified: boolean;
};

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};
