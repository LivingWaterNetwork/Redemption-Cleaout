import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getResourceBySlug, resources } from "@/content/resources";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structuredData";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return pageMetadata({
    // seoTitle keeps the <title> tag inside SERP width; the editorial headline
    // in `title` still carries the page H1 and the /resources index.
    title: resource.seoTitle ?? resource.title,
    description: resource.metaDescription,
    path: `/resources/${resource.slug}`,
  });
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const others = resources.filter((r) => r.slug !== resource.slug);

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: resource.title, path: `/resources/${resource.slug}` },
          ]),
          articleJsonLd(
            resource.title,
            resource.metaDescription,
            `/resources/${resource.slug}`,
            resource.publishedAt,
          ),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: resource.title, href: `/resources/${resource.slug}` },
        ]}
      />

      <PageHero
        eyebrow="Guide"
        title={resource.title}
        description={resource.summary}
        variant="light"
      />

      <article className="py-section">
        <div className="container-page grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {resource.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 60}>
                <section className="mb-12">
                  <h2 className="text-section font-bold text-heritage-black">
                    {section.heading}
                  </h2>
                  <ul className="mt-6 border-t border-heritage-black/12">
                    {section.body.map((paragraph, i) => (
                      <li
                        key={i}
                        className="flex gap-4 border-b border-heritage-black/12 py-4 text-body-base text-steel-gray"
                      >
                        <span aria-hidden="true" className="mt-1 shrink-0 text-redemption-red">
                          •
                        </span>
                        <span className="max-w-measure-lg">{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Aside: other guides + CTA */}
          <aside className="lg:col-span-4">
            <Reveal delay={100}>
              <div className="sticky top-32">
                <div className="border-t-2 border-redemption-red pt-6">
                  <p className="eyebrow-plain text-steel-gray">Other guides</p>
                  <ul className="mt-5 space-y-4">
                    {others.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/resources/${other.slug}`}
                          className="font-display text-base font-semibold text-heritage-black transition-colors duration-micro hover:text-redemption-red"
                        >
                          {other.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 bg-heritage-black p-7 text-clean-white on-dark">
                  <p className="font-display text-lg font-semibold">
                    Every property is different
                  </p>
                  <p className="mt-3 text-sm text-clean-white/75">
                    This guide is general. For a real scope and price, we walk the property in
                    person.
                  </p>
                  <Link href="/request-walkthrough" className="btn-primary mt-6 w-full">
                    Request a Walkthrough
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </article>

      <CallToAction
        location={`resource_${resource.slug}_cta`}
        headline="Ready to talk through your property?"
        supportingText="Send the details and we'll follow up to schedule an on-site walkthrough."
      />
    </>
  );
}
