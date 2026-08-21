import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
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
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }]} />
      <PageHero
        eyebrow="Service Areas"
        title={`Serving ${business.serviceRegionSummary}`}
        description="We publish detailed pages only for areas with real, useful local content — not a page for every nearby zip code."
      />
      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {approvedServiceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group border border-warm-concrete p-6 hover:border-redemption-red"
            >
              <h2 className="font-display text-xl font-semibold text-heritage-black group-hover:text-redemption-red">
                {area.cityName}, {area.stateAbbr}
              </h2>
              <p className="mt-2 text-sm text-steel-gray">{area.localIntroduction}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-steel-gray">
          Don&apos;t see your city listed? We may still serve your area as part of our
          Oakland County and Southeast Michigan coverage —{" "}
          <Link href="/request-walkthrough" className="font-semibold text-redemption-red hover:underline">
            request a walkthrough
          </Link>{" "}
          and we&apos;ll confirm.
        </p>
      </section>
      <CallToAction location="service_areas_overview_cta" headline="Request a Property Walkthrough" variant="dark" />
    </>
  );
}
