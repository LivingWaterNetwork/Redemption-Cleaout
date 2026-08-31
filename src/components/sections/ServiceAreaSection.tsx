import Link from "next/link";
import { approvedServiceAreas } from "@/content/serviceAreas";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Coverage across all seven Metro Detroit counties. Kept to a compact list on
 * the home page — the county pages carry the local detail. No map graphic is
 * drawn, since an accurate one would need verified boundaries.
 */
export function ServiceAreaSection() {
  return (
    <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
      <div className="container-page">
        <SectionHeader
          label="Service Areas"
          title="All of Metro Detroit"
          intro="Seven counties, one crew. We don't operate an office in every city we work in — the quote happens at your property."
          action={
            <Link href="/service-areas" className="link-editorial">
              All service areas
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          }
        />

        <div className="mt-14 grid gap-px border-t border-heritage-black/12 sm:grid-cols-2 lg:grid-cols-3">
          {approvedServiceAreas.map((area, index) => (
            <Reveal key={area.slug} delay={index * 60}>
              <Link
                href={`/service-areas/${area.slug}`}
                className="group flex h-full flex-col justify-between border-b border-heritage-black/12 py-8 transition-colors duration-micro sm:pr-8"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                    {area.countyName} County
                  </h3>
                  <p className="mt-3 max-w-measure text-body-base text-steel-gray">
                    {area.cities.slice(0, 5).join(", ")}, and the surrounding communities.
                  </p>
                </div>
                <span className="link-editorial mt-6">
                  {area.countyName} County
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
