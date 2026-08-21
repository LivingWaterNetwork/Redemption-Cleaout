import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { approvedServiceAreas, getServiceAreaBySlug } from "@/content/serviceAreas";
import { getServiceBySlug } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/structuredData";
import { business } from "@/content/business";

export function generateStaticParams() {
  return approvedServiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};
  return pageMetadata({
    title: `${area.cityName}, ${area.stateAbbr} Property Cleanouts`,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const relevantServices = area.relevantServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: area.cityName, path: `/service-areas/${area.slug}` },
          ]),
          faqPageJsonLd(area.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: area.cityName, href: `/service-areas/${area.slug}` },
        ]}
      />
      <PageHero eyebrow="Service Area" title={area.heroHeadline} />

      <section className="container-page py-16">
        <p className="max-w-2xl text-steel-gray">{area.localIntroduction}</p>
        <p className="mt-4 max-w-2xl text-steel-gray">{area.propertyContext}</p>
        <p className="mt-4 max-w-2xl text-sm text-steel-gray">
          {business.address.publicAreaDescription}. We serve {area.cityName} as part of
          our regular coverage — we don&apos;t operate a public office in every city we
          serve.
        </p>
      </section>

      {relevantServices.length > 0 && (
        <section className="bg-warm-concrete/30 py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-heritage-black">
              Services in {area.cityName}
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {relevantServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="border border-warm-concrete bg-clean-white px-5 py-3 font-semibold text-heritage-black hover:border-redemption-red hover:text-redemption-red"
                >
                  {service.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16">
        <h2 className="font-display text-2xl font-bold text-heritage-black">Frequently Asked Questions</h2>
        <div className="mt-6">
          <FAQAccordion faqs={area.faqs} idPrefix={`area-${area.slug}`} />
        </div>
      </section>

      <CallToAction
        location={`area_${area.slug}_cta`}
        headline={`Request a Walkthrough in ${area.cityName}`}
        variant="red"
      />
    </>
  );
}
