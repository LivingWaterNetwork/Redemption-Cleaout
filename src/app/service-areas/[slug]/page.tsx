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
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/structuredData";

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
    title: `${area.countyName} County Cleanouts & Demolition`,
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
    .map((related) => getServiceBySlug(related))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: `${area.countyName} County`, path: `/service-areas/${area.slug}` },
          ]),
          faqPageJsonLd(area.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: `${area.countyName} County`, href: `/service-areas/${area.slug}` },
        ]}
      />

      <PageHero eyebrow="Service Area" title={area.heroHeadline} />

      {/* Local context, in a two-column editorial split */}
      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-body-lg text-heritage-black">{area.localIntroduction}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-6 max-w-measure-lg text-body-base text-steel-gray">
                {area.propertyContext}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="frame-double">
              <div className="bg-warm-concrete p-7">
                <p className="eyebrow-plain text-steel-gray">Coverage</p>
                <p className="mt-4 text-body-base text-heritage-black">
                  {area.countyName} County is part of our full Metro Detroit coverage —
                  Macomb, Oakland, St. Clair, Wayne, Monroe, Washtenaw, and Livingston.
                </p>
                <p className="mt-4 text-sm text-steel-gray">
                  We don&apos;t operate a public office in {area.countyName} County. Estimates
                  start from photos over the phone, and the final quote is given on site.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services in this area */}
      {relevantServices.length > 0 && (
        <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Services</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                In {area.countyName} County
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px border-t border-heritage-black/12 sm:grid-cols-2">
              {relevantServices.map((service, index) => (
                <Reveal key={service.slug} delay={index * 90}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col border-b border-heritage-black/12 py-8 sm:pr-10"
                  >
                    <h3 className="font-display text-xl font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                      {service.shortName}
                    </h3>
                    <p className="mt-3 max-w-measure text-body-base text-steel-gray">
                      {service.situation}
                    </p>
                    <span className="link-editorial mt-6">
                      Learn more
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
      )}

      {/* Cities and communities covered — the local-search surface for this county */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Communities</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section font-bold text-heritage-black">
              Where we work in {area.countyName} County
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-heritage-black/12 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {area.cities.map((city) => (
                <li key={city} className="flex items-baseline gap-3 text-body-base text-steel-gray">
                  <span aria-hidden="true" className="text-redemption-red">
                    &#8212;
                  </span>
                  {city}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-measure-lg text-body-base text-steel-gray">
              This list isn&apos;t exhaustive — we cover {area.countyName} County in full,
              including the surrounding townships. If your address isn&apos;t named here, send
              it over and we&apos;ll confirm.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Questions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                {area.countyName} County cleanouts
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-8">
            <FAQAccordion faqs={area.faqs} idPrefix={`area-${area.slug}`} />
          </Reveal>
        </div>
      </section>

      <CallToAction
        location={`area_${area.slug}_cta`}
        headline={`Get a quote in ${area.countyName} County`}
        supportingText="Send photos for a ballpark estimate over the phone, then we'll come out and give you the final quote on site."
      />
    </>
  );
}
