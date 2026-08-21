import Link from "next/link";
import { business } from "@/content/business";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Verified-facts credibility band. No ratings, project counts, years in
 * business, or certifications — only claims the brief and brand guide
 * establish as true.
 */
const facts = [
  {
    label: "Based in",
    value: "Rochester, Michigan",
    detail: "Serving Rochester, Rochester Hills, and Oakland County.",
  },
  {
    label: "Capability",
    value: "Residential & commercial",
    detail: "Whole properties and commercial spaces, not isolated pickups.",
  },
  {
    label: "Informed by",
    value: "Real-estate experience",
    detail: "Closings, listing prep, and investor timelines understood.",
  },
];

export function TrustBand() {
  return (
    <section
      aria-label="Why property owners and professionals choose Redemption"
      className="border-b border-heritage-black/10 bg-warm-concrete"
    >
      <div className="container-page">
        <div className="grid divide-y divide-heritage-black/10 lg:grid-cols-[1fr_1fr_1fr_auto] lg:divide-x lg:divide-y-0">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 90}
              className="py-9 lg:px-9 lg:first:pl-0"
            >
              <p className="eyebrow-plain text-steel-gray">{fact.label}</p>
              <p className="mt-2.5 font-display text-xl font-semibold text-heritage-black">
                {fact.value}
              </p>
              <p className="mt-2 max-w-measure text-sm leading-relaxed text-steel-gray">
                {fact.detail}
              </p>
            </Reveal>
          ))}

          <Reveal delay={270} className="flex items-center py-9 lg:pl-9">
            <div>
              <p className="eyebrow-plain text-steel-gray">Get started</p>
              <Link href="/request-walkthrough" className="link-editorial mt-2.5">
                Request a walkthrough
                <span aria-hidden="true" className="btn-arrow">
                  &rarr;
                </span>
              </Link>
              <p className="mt-3 text-sm text-steel-gray">
                Or call or text{" "}
                <a
                  href={`tel:${business.phoneHref}`}
                  className="font-semibold text-heritage-black underline decoration-redemption-red decoration-2 underline-offset-4"
                >
                  {business.phoneDisplay}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
