import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { audiences, getAudienceBySlug } from "@/content/audiences";
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
  return audiences.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudienceBySlug(slug);
  if (!audience) return {};
  return pageMetadata({
    title: audience.name,
    description: audience.metaDescription,
    path: `/who-we-serve/${audience.slug}`,
  });
}

export default async function AudienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audience = getAudienceBySlug(slug);
  if (!audience) notFound();

  const relatedServices = audience.relatedServiceSlugs
    .map((related) => getServiceBySlug(related))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Who We Serve", path: "/who-we-serve" },
            { name: audience.shortName, path: `/who-we-serve/${audience.slug}` },
          ]),
          faqPageJsonLd(audience.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Who We Serve", href: "/who-we-serve" },
          { name: audience.shortName, href: `/who-we-serve/${audience.slug}` },
        ]}
      />

      <PageHero
        eyebrow="Who We Serve"
        title={audience.heroHeadline}
        description={audience.summary}
      />

      {/* Needs vs. how we help — two columns, split by a rule */}
      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow">What you need</p>
            </Reveal>
            <ul className="mt-7 border-t border-heritage-black/12">
              {audience.needs.map((need, index) => (
                <Reveal
                  key={need}
                  as="li"
                  delay={index * 70}
                  className="flex gap-4 border-b border-heritage-black/12 py-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 font-condensed text-xs font-bold tabular-nums text-steel-gray"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body-base text-heritage-black">{need}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal delay={80}>
              <p className="eyebrow">How Redemption helps</p>
            </Reveal>
            <ul className="mt-7 border-t border-heritage-black/12">
              {audience.howRedemptionHelps.map((item, index) => (
                <Reveal
                  key={item}
                  as="li"
                  delay={index * 70}
                  className="flex gap-4 border-b border-heritage-black/12 py-4"
                >
                  <span aria-hidden="true" className="mt-1 shrink-0 text-redemption-red">
                    ✓
                  </span>
                  <span className="text-body-base text-steel-gray">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Services</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                Most relevant to you
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px border-t border-heritage-black/12 sm:grid-cols-2">
              {relatedServices.map((service, index) => (
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

      {/* FAQs */}
      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Questions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                Working with us
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-8">
            <FAQAccordion faqs={audience.faqs} idPrefix={`audience-${audience.slug}`} />
          </Reveal>
        </div>
      </section>

      <CallToAction
        location={`audience_${audience.slug}_cta`}
        headline={audience.ctaLabel}
        primaryLabel={audience.ctaLabel}
        supportingText="One accountable point of contact, a documented scope after the walkthrough, and deadlines built into the plan."
      />
    </>
  );
}
