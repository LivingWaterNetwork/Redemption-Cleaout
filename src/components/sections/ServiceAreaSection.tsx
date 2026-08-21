import Link from "next/link";
import { approvedServiceAreas } from "@/content/serviceAreas";
import { business } from "@/content/business";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Service coverage. Named pages exist only for approved areas; everything
 * else is described as coverage, never implied as an office location. No map
 * graphic is drawn, since an accurate one would need verified boundaries.
 */
export function ServiceAreaSection() {
  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHeader
          label="Service Areas"
          title="Rochester, Rochester Hills, and Oakland County"
          intro={`${business.address.publicAreaDescription}. We serve surrounding Southeast Michigan communities as part of our regular coverage — we don't operate an office in every city we work in.`}
          action={
            <Link href="/service-areas" className="link-editorial">
              All service areas
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          }
        />

        <div className="mt-14 grid gap-px border-t border-heritage-black/12 sm:grid-cols-2">
          {approvedServiceAreas.map((area, index) => (
            <Reveal key={area.slug} delay={index * 100}>
              <Link
                href={`/service-areas/${area.slug}`}
                className="group flex h-full flex-col justify-between border-b border-heritage-black/12 py-9 transition-colors duration-micro sm:pr-10"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                    {area.cityName}, {area.stateAbbr}
                  </h3>
                  <p className="mt-4 max-w-measure text-body-base text-steel-gray">
                    {area.propertyContext}
                  </p>
                </div>
                <span className="link-editorial mt-7">
                  {area.cityName} cleanouts
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
