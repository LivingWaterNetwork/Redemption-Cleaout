import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug, services } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/structuredData";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = service.relatedServiceSlugs
    .map((related) => getServiceBySlug(related))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortName, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd(service),
          faqPageJsonLd(service.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortName, href: `/services/${service.slug}` },
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={service.heroHeadline}
        description={service.situation}
        variant={service.image ? "image" : "dark"}
        image={service.image ? { src: service.image.src, alt: service.image.alt } : undefined}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/request-walkthrough" className="btn-primary">
            Get a Free Estimate
            <span aria-hidden="true" className="btn-arrow">
              &rarr;
            </span>
          </Link>
          <a href={formatPhoneTelHref()} className="btn-on-dark">
            Call {business.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* Definition + scope */}
      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">What this service is</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-measure-lg text-body-lg text-heritage-black">
                {service.definition}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="mt-14 text-section font-bold text-heritage-black">
                What Redemption handles
              </h2>
            </Reveal>
            <ul className="mt-7 border-t border-heritage-black/12">
              {service.weHandle.map((item, index) => (
                <Reveal
                  key={item}
                  as="li"
                  delay={index * 60}
                  className="flex gap-4 border-b border-heritage-black/12 py-4 text-body-base text-steel-gray"
                >
                  <span aria-hidden="true" className="mt-1 shrink-0 text-redemption-red">
                    ✓
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>

            {service.mayRequireSpecialist.length > 0 && (
              <Reveal>
                <div className="mt-14 border-l-2 border-steel-gray/40 pl-6">
                  <h2 className="font-display text-xl font-semibold text-heritage-black">
                    What may require another specialist
                  </h2>
                  <p className="mt-3 max-w-measure text-sm text-steel-gray">
                    Some conditions fall outside standard cleanout scope and need a separately
                    licensed specialist. We&apos;ll tell you plainly if we find one.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.mayRequireSpecialist.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-steel-gray">
                        <span aria-hidden="true" className="text-steel-gray/60">
                          &mdash;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="frame-double sticky top-32">
                <div className="bg-warm-concrete p-8">
                  <p className="eyebrow-plain text-steel-gray">Who this is for</p>
                  <ul className="mt-5 space-y-3">
                    {service.whoItsFor.map((item) => (
                      <li key={item} className="text-body-base text-heritage-black">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-heritage-black/12 pt-7">
                    <p className="eyebrow-plain text-steel-gray">Common conditions</p>
                    <ul className="mt-4 space-y-2.5">
                      {service.commonConditions.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-steel-gray">
                          <span aria-hidden="true" className="mt-1 shrink-0 text-redemption-red">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-heritage-black/12 pt-7">
                    <Link href="/request-walkthrough" className="btn-primary w-full">
                      Get a Free Estimate
                      <span aria-hidden="true" className="btn-arrow">
                        &rarr;
                      </span>
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                      <a href={formatPhoneTelHref()} className="btn-secondary !px-3">
                        Call
                      </a>
                      <a href={formatPhoneSmsHref()} className="btn-secondary !px-3">
                        Text
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
        <div className="container-page">
          <SectionHeader label="Process" title="How this project runs" />
          <div className="mt-14">
            <ProcessTimeline steps={service.process} />
          </div>
        </div>
      </section>

      {/* Categories — the retired standalone service pages, as anchored sections.
          Each id matches the old slug so the 301s land on the right one. */}
      {service.categories && service.categories.length > 0 && (
        <section className="py-section">
          <div className="container-page">
            <SectionHeader
              label="Types of cleanout"
              title="Same crew, same scope, different situation"
              intro="Estate, foreclosure, commercial, hoarding-related, move-out, and single-area jobs are all handled under this service. What changes is the timeline, who we coordinate with, and how the property gets handled."
            />

            <div className="mt-14 grid gap-x-14 gap-y-12 border-t border-heritage-black/12 pt-12 lg:grid-cols-2">
              {service.categories.map((category, index) => (
                <Reveal key={category.id} id={category.id} delay={index * 70} className="scroll-mt-32">
                  <h3 className="font-display text-2xl font-semibold text-heritage-black">
                    {category.name}
                  </h3>
                  <p className="mt-3 max-w-measure text-body-base text-steel-gray">
                    {category.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {category.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm text-steel-gray">
                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-redemption-red">
                          &#8212;
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proof image */}
      {service.image && (
        <section className="py-section">
          <div className="container-page">
            <Reveal variant="mask">
              <figure>
                <div className="img-frame aspect-panel w-full">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1440px) 1440px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 max-w-measure-lg text-sm text-steel-gray">
                  {service.image.caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="pb-section">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Questions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                About this service
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-8">
            <FAQAccordion faqs={service.faqs} idPrefix={`service-${service.slug}`} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {relatedServices.length > 0 && (
        <section className="border-t border-heritage-black/10 pb-section pt-14">
          <div className="container-page">
            <p className="eyebrow-plain text-steel-gray">Related services</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {relatedServices.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/services/${related.slug}`}
                    className="font-display text-lg font-semibold text-heritage-black underline decoration-heritage-black/20 underline-offset-[6px] transition-colors duration-micro hover:text-redemption-red hover:decoration-redemption-red"
                  >
                    {related.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CallToAction
        location={`service_${service.slug}_cta`}
        headline={`Ready to scope your ${service.shortName.toLowerCase()}?`}
        supportingText="Send photos for a ballpark estimate over the phone. We'll come out, walk the property, and give you the final quote in person — before anything is booked."
      />
    </>
  );
}
