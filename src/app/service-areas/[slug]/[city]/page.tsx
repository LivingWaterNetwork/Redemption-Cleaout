import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCityBySlug, getCitiesByCounty } from "@/content/cities";
import { getServiceAreaBySlug } from "@/content/serviceAreas";
import { services } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqPageJsonLd, cityServiceJsonLd } from "@/lib/structuredData";

/**
 * localAreas are written lowercase ("the Woodward Avenue corridor") so they read
 * correctly mid-sentence elsewhere. Here the joined list opens a sentence, so the
 * first letter is lifted — without touching the rest, which carries proper nouns.
 */
function sentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.countySlug, city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || city.countySlug !== slug) return {};
  return pageMetadata({
    title: `${city.cityName}, MI Cleanouts & Demolition`,
    description: city.metaDescription,
    path: `/service-areas/${city.countySlug}/${city.slug}`,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  // The county in the URL has to be the city's real county, or the same page
  // would be reachable at seven addresses — duplicate content, self-inflicted.
  if (!city || city.countySlug !== slug) notFound();

  const county = getServiceAreaBySlug(city.countySlug);
  if (!county) notFound();

  const nearby = city.nearbySlugs
    .map((s) => getCityBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const siblings = getCitiesByCounty(city.countySlug).filter((c) => c.slug !== city.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: `${county.countyName} County`, path: `/service-areas/${county.slug}` },
    { name: city.cityName, path: `/service-areas/${county.slug}/${city.slug}` },
  ];

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd(crumbs),
          cityServiceJsonLd(city.cityName, `/service-areas/${county.slug}/${city.slug}`),
          faqPageJsonLd(city.faqs),
        ]}
      />
      <Breadcrumbs items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />

      <PageHero
        eyebrow={`${county.countyName} County`}
        title={`Property Cleanouts and Demolition in ${city.cityName}, Michigan`}
        description={city.housingContext}
      />

      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">The work here</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-measure-lg text-body-lg text-heritage-black">
                {city.workContext}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="mt-14 text-section font-bold text-heritage-black">
                What tends to matter in {city.cityName}
              </h2>
            </Reveal>
            <ul className="mt-7 border-t border-heritage-black/12">
              {city.localConsiderations.map((item, index) => (
                <Reveal
                  key={item}
                  as="li"
                  delay={index * 60}
                  className="flex gap-4 border-b border-heritage-black/12 py-4 text-body-base text-steel-gray"
                >
                  <span aria-hidden="true" className="mt-1 shrink-0 text-redemption-red">
                    &#8212;
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>

            {city.localAreas.length > 0 && (
              <Reveal>
                <div className="mt-12">
                  <p className="eyebrow-plain text-steel-gray">Areas we cover</p>
                  <p className="mt-4 max-w-measure-lg text-body-base text-steel-gray">
                    {sentenceCase(city.localAreas.join(" · "))} &mdash; and everywhere else
                    in {city.cityName}.
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="frame-double sticky top-32">
                <div className="bg-warm-concrete p-8">
                  <p className="eyebrow-plain text-steel-gray">Services in {city.cityName}</p>
                  <ul className="mt-5 space-y-4">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="link-editorial text-heritage-black"
                        >
                          {service.shortName}
                          <span aria-hidden="true" className="btn-arrow">
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-heritage-black/12 pt-7">
                    <p className="eyebrow-plain text-steel-gray">Quoting</p>
                    <p className="mt-3 text-body-base text-heritage-black">
                      Send photos for a ballpark estimate over the phone. The final quote is
                      given on site, at the property.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-heritage-black/12 pt-7">
                    <Link href="/request-walkthrough" className="btn-primary w-full">
                      Get a Free Estimate
                      <span aria-hidden="true" className="btn-arrow">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Questions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                {city.cityName} cleanouts
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-8">
            <FAQAccordion faqs={city.faqs} idPrefix={`city-${city.slug}`} />
          </Reveal>
        </div>
      </section>

      {(nearby.length > 0 || siblings.length > 0) && (
        <section className="py-section">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Nearby</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                We also work in
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
                {(nearby.length > 0 ? nearby : siblings).map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/service-areas/${other.countySlug}/${other.slug}`}
                      className="font-display text-lg font-semibold text-heritage-black underline decoration-heritage-black/20 underline-offset-[6px] transition-colors duration-micro hover:text-redemption-red hover:decoration-redemption-red"
                    >
                      {other.cityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 text-body-base text-steel-gray">
                See everywhere we cover in{" "}
                <Link
                  href={`/service-areas/${county.slug}`}
                  className="font-semibold text-heritage-black underline decoration-redemption-red decoration-2 underline-offset-4"
                >
                  {county.countyName} County
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <CallToAction
        location={`city_${city.slug}_cta`}
        headline={`Clearing a property in ${city.cityName}?`}
        supportingText="Send photos for a ballpark estimate over the phone. We'll come out, walk the property, and give you the final quote in person."
      />
    </>
  );
}
