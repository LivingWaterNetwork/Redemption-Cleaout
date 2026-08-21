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
    .map((slug) => getServiceBySlug(slug))
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
      <PageHero eyebrow="Who We Serve" title={audience.heroHeadline} description={audience.summary} />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-heritage-black">What You Need</h2>
          <ul className="mt-3 space-y-2">
            {audience.needs.map((need) => (
              <li key={need} className="flex items-start gap-2 text-steel-gray">
                <span aria-hidden="true" className="mt-1 text-redemption-red">
                  •
                </span>
                {need}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-heritage-black">How Redemption Helps</h2>
          <ul className="mt-3 space-y-2">
            {audience.howRedemptionHelps.map((item) => (
              <li key={item} className="flex items-start gap-2 text-steel-gray">
                <span aria-hidden="true" className="mt-1 text-redemption-red">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-warm-concrete/30 py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-heritage-black">Related Services</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {relatedServices.map((service) => (
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
          <FAQAccordion faqs={audience.faqs} idPrefix={`audience-${audience.slug}`} />
        </div>
      </section>

      <CallToAction
        location={`audience_${audience.slug}_cta`}
        headline={audience.ctaLabel}
        primaryLabel={audience.ctaLabel}
        variant="red"
      />
    </>
  );
}
