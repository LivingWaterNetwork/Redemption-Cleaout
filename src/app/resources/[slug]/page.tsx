import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResourceBySlug, resources } from "@/content/resources";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
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
    title: resource.title,
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

  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: resource.title, path: `/resources/${resource.slug}` },
          ]),
          articleJsonLd(resource.title, resource.metaDescription, `/resources/${resource.slug}`, resource.publishedAt),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: resource.title, href: `/resources/${resource.slug}` },
        ]}
      />
      <PageHero eyebrow="Resource" title={resource.title} description={resource.summary} />
      <article className="container-page max-w-3xl py-16">
        {resource.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="font-display text-2xl font-bold text-heritage-black">{section.heading}</h2>
            <ul className="mt-4 space-y-3">
              {section.body.map((paragraph, index) => (
                <li key={index} className="text-steel-gray">
                  {paragraph}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </article>
      <CallToAction location={`resource_${resource.slug}_cta`} headline="Request a Property Walkthrough" variant="red" />
    </>
  );
}
