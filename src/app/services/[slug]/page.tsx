import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, services } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/structuredData";

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
    .map((slug) => getServiceBySlug(slug))
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
      <PageHero eyebrow="Service" title={service.heroHeadline} description={service.situation} />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold text-heritage-black">What This Service Is</h2>
          <p className="mt-3 text-steel-gray">{service.definition}</p>

          <h2 className="mt-10 font-display text-2xl font-bold text-heritage-black">What Redemption Handles</h2>
          <ul className="mt-3 space-y-2">
            {service.weHandle.map((item) => (
              <li key={item} className="flex items-start gap-2 text-steel-gray">
                <span aria-hidden="true" className="mt-1 text-redemption-red">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {service.mayRequireSpecialist.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl font-bold text-heritage-black">
                What May Require Another Specialist
              </h2>
              <p className="mt-2 text-sm text-steel-gray">
                Some conditions fall outside standard cleanout scope and require a separately
                licensed specialist:
              </p>
              <ul className="mt-3 space-y-2">
                {service.mayRequireSpecialist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-steel-gray">
                    <span aria-hidden="true" className="mt-1 text-steel-gray">
                      –
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-10 font-display text-2xl font-bold text-heritage-black">Common Project Conditions</h2>
          <ul className="mt-3 space-y-2">
            {service.commonConditions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-steel-gray">
                <span aria-hidden="true" className="mt-1 text-redemption-red">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="border border-warm-concrete p-6">
          <h2 className="font-display text-lg font-bold text-heritage-black">Who This Is For</h2>
          <ul className="mt-3 space-y-2 text-sm text-steel-gray">
            {service.whoItsFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/request-walkthrough" className="btn-primary">
              Request a Property Walkthrough
            </Link>
            <a href="tel:+12483219609" className="btn-secondary">
              Call or Text (248) 321-9609
            </a>
          </div>
        </aside>
      </section>

      <section className="bg-warm-concrete/30 py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-heritage-black">Process</h2>
          <div className="mt-8">
            <ProcessTimeline steps={service.process} />
          </div>
        </div>
      </section>

      <ProjectGallery limit={2} />

      {relatedServices.length > 0 && (
        <section className="container-page py-16">
          <h2 className="font-display text-2xl font-bold text-heritage-black">Related Services</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="border border-warm-concrete px-5 py-3 font-semibold text-heritage-black hover:border-redemption-red hover:text-redemption-red"
              >
                {related.shortName}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-16">
        <h2 className="font-display text-2xl font-bold text-heritage-black">Frequently Asked Questions</h2>
        <div className="mt-6">
          <FAQAccordion faqs={service.faqs} idPrefix={`service-${service.slug}`} />
        </div>
      </section>

      <CallToAction
        location={`service_${service.slug}_cta`}
        headline={`Ready to talk through your ${service.shortName.toLowerCase()}?`}
        variant="red"
      />
    </>
  );
}
