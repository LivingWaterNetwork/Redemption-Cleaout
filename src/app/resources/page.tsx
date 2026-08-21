import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
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
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }]}
      />

      <PageHero
        eyebrow="Resources"
        title="Guides for property owners and families"
        description="Practical, no-sales-pitch explanations of how cleanouts actually work — written for people handling one for the first time."
      />

      <section className="py-section">
        <div className="container-page border-t border-heritage-black/12">
          {resources.map((resource, index) => (
            <Reveal key={resource.slug} delay={index * 80}>
              <Link
                href={`/resources/${resource.slug}`}
                className="group grid gap-x-12 gap-y-4 border-b border-heritage-black/12 py-10 lg:grid-cols-12"
              >
                <div className="flex items-baseline gap-5 lg:col-span-1">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-bold tabular-nums text-heritage-black/45"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="lg:col-span-7">
                  <h2 className="font-display text-2xl font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                    {resource.title}
                  </h2>
                  <p className="mt-3 max-w-measure-lg text-body-base text-steel-gray">
                    {resource.summary}
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <span className="link-editorial">
                    Read the guide
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction
        location="resources_cta"
        headline="Have a question a guide didn't answer?"
        supportingText="Call or text and we'll answer it directly — no obligation to book anything."
        variant="band"
      />
    </>
  );
}
