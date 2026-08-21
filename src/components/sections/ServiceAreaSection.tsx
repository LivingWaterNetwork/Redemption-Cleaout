import Link from "next/link";
import { approvedServiceAreas } from "@/content/serviceAreas";
import { business } from "@/content/business";

export function ServiceAreaSection() {
  return (
    <section className="container-page py-16">
      <p className="eyebrow">Service Areas</p>
      <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
        Serving {business.serviceRegionSummary}
      </h2>
      <div className="mt-8 flex flex-wrap gap-3">
        {approvedServiceAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/service-areas/${area.slug}`}
            className="border border-warm-concrete px-5 py-3 font-semibold text-heritage-black hover:border-redemption-red hover:text-redemption-red"
          >
            {area.cityName}, {area.stateAbbr}
          </Link>
        ))}
        <Link
          href="/service-areas"
          className="border border-warm-concrete px-5 py-3 font-semibold text-redemption-red hover:border-redemption-red"
        >
          View all service areas &rarr;
        </Link>
      </div>
    </section>
  );
}
