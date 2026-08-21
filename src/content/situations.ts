export type Situation = {
  id: string;
  /** First-person framing, so a visitor recognizes themselves immediately. */
  label: string;
  headline: string;
  body: string;
  serviceSlug: string;
  ctaLabel: string;
};

export const situations: Situation[] = [
  {
    id: "estate",
    label: "I'm managing an estate or inherited property",
    headline: "Estate and inherited-property cleanouts",
    body: "We work at the pace the situation calls for, coordinate around probate deadlines, estate sales, and closings, and set aside anything your family still needs to review.",
    serviceSlug: "estate-cleanouts",
    ctaLabel: "Estate cleanouts",
  },
  {
    id: "pre-sale",
    label: "I'm preparing a property for sale",
    headline: "Cleared, and ready to list",
    body: "A property full of contents can't be shown. We clear it completely and leave it broom-swept, so staging, repairs, or listing photos can start on schedule.",
    serviceSlug: "full-property-cleanouts",
    ctaLabel: "Full-property cleanouts",
  },
  {
    id: "distressed",
    label: "I'm clearing a distressed or foreclosed property",
    headline: "Distressed and foreclosure cleanouts",
    body: "Abandoned contents, debris, and fast turnarounds for lenders, asset managers, and investors — with before-and-after documentation when your file needs it.",
    serviceSlug: "foreclosure-cleanouts",
    ctaLabel: "Foreclosure cleanouts",
  },
  {
    id: "out-of-state",
    label: "I'm coordinating from out of state",
    headline: "Handled while you're away",
    body: "We walk the property, scope the work, and keep you updated by phone, text, and photos — one accountable point of contact, so you don't have to fly in to manage it.",
    serviceSlug: "estate-cleanouts",
    ctaLabel: "How we coordinate",
  },
  {
    id: "clutter",
    label: "I'm dealing with severe clutter",
    headline: "Severe-clutter and hoarding-related cleanouts",
    body: "Handled privately and without judgment. We scope the real condition in person, work methodically, and set aside anything that needs to be reviewed first.",
    serviceSlug: "hoarding-cleanouts",
    ctaLabel: "Severe-clutter cleanouts",
  },
  {
    id: "commercial",
    label: "I'm preparing a commercial property",
    headline: "Commercial property cleanouts",
    body: "Offices, retail, and warehouse space cleared around your operating hours and lease dates, with the property manager, broker, and ownership all kept in the loop.",
    serviceSlug: "commercial-cleanouts",
    ctaLabel: "Commercial cleanouts",
  },
];
