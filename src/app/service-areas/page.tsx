import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { approvedServiceAreas } from "@/content/serviceAreas";
import { business } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "Service Areas",
  description:
    "Redemption Cleanout Services serves Rochester, Rochester Hills, Oakland County, and approved surrounding Southeast Michigan communities.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }]}
      />

      <PageHero
        eyebrow="Service Areas"
        title={`Serving ${business.serviceRegionSummary}`}
        description="We publish detailed pages only for areas where we have real local context to share — not a page for every nearby zip code."
      />

      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-px border-t border-heritage-black/12 sm:grid-cols-2">
            {approvedServiceAreas.map((area, index) => (
              <Reveal key={area.slug} delay={index * 90}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex h-full flex-col justify-between border-b border-heritage-black/12 py-10 sm:pr-10"
                >
                  <div>
                    <h2 className="font-display text-section font-bold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                      {area.cityName}
                    </h2>
                    <p className="mt-1 font-condensed text-sm font-bold uppercase tracking-[0.16em] text-steel-gray">
                      {area.stateAbbr}
                    </p>
                    <p className="mt-6 max-w-measure text-body-base text-steel-gray">
                      {area.localIntroduction}
                    </p>
                  </div>
                  <span className="link-editorial mt-8">
                    {area.cityName} cleanouts
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 max-w-measure-lg border-l-2 border-redemption-red pl-6">
              <p className="text-body-base text-steel-gray">
                Don&apos;t see your city? We may still serve it as part of our Oakland County
                and Southeast Michigan coverage.{" "}
                <Link
                  href="/request-walkthrough"
                  className="font-semibold text-heritage-black underline decoration-redemption-red decoration-2 underline-offset-4"
                >
                  Request a walkthrough
                </Link>{" "}
                with your address and we&apos;ll confirm.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction
        location="service_areas_overview_cta"
        headline="Tell us where the property is"
        supportingText="Send the address and property details and we'll confirm coverage and scheduling."
      />
    </>
  );
}
