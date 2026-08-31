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
  title: "Service Areas — All of Metro Detroit",
  description:
    "Redemption Cleanout Services covers all of Metro Detroit: Macomb, Oakland, St. Clair, Wayne, Monroe, Washtenaw, and Livingston counties.",
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
        title="All of Metro Detroit"
        description={`Redemption works across all seven Metro Detroit counties — ${business.serviceRegionSummary}. Pick your county for the communities we cover and what the work usually looks like there.`}
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
                      {area.countyName} County
                    </h2>
                    <p className="mt-1 font-condensed text-sm font-bold uppercase tracking-[0.16em] text-steel-gray">
                      {area.cities.slice(0, 4).join(" · ")}
                    </p>
                    <p className="mt-6 max-w-measure text-body-base text-steel-gray">
                      {area.localIntroduction}
                    </p>
                  </div>
                  <span className="link-editorial mt-8">
                    {area.countyName} County
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
                Don&apos;t see your city? The lists on each county page aren&apos;t
                exhaustive — we cover all seven counties in full, townships included.{" "}
                <Link
                  href="/request-walkthrough"
                  className="font-semibold text-heritage-black underline decoration-redemption-red decoration-2 underline-offset-4"
                >
                  Send us the address
                </Link>{" "}
                and we&apos;ll confirm coverage.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction
        location="service_areas_overview_cta"
        headline="Tell us where the property is"
        supportingText="Send photos for a ballpark estimate over the phone. We'll come out and give you the final quote on site."
      />
    </>
  );
}
