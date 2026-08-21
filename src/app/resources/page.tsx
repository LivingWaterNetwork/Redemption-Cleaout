import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { resources } from "@/content/resources";

export const metadata: Metadata = pageMetadata({
  title: "Resources & Guides",
  description:
    "Educational guides on estate cleanouts, preparing for a property cleanout, and how cleanout pricing works, from Redemption Cleanout Services.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }]} />
      <PageHero eyebrow="Resources" title="Guides for property owners and families" />
      <section className="container-page grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Link
            key={resource.slug}
            href={`/resources/${resource.slug}`}
            className="group border border-warm-concrete p-6 hover:border-redemption-red"
          >
            <h2 className="font-display text-lg font-semibold text-heritage-black group-hover:text-redemption-red">
              {resource.title}
            </h2>
            <p className="mt-2 text-sm text-steel-gray">{resource.summary}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
