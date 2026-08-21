import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { audiences } from "@/content/audiences";

export const metadata: Metadata = pageMetadata({
  title: "Who We Serve",
  description:
    "Redemption Cleanout Services works with homeowners and families, realtors, estate-sale and probate professionals, property managers, investors, and commercial property professionals across Rochester, Michigan.",
  path: "/who-we-serve",
});

export default function WhoWeServePage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve" }])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Who We Serve", href: "/who-we-serve" }]} />
      <PageHero
        eyebrow="Who We Serve"
        title="Two audiences. Two very different conversations."
        description="Property owners and families living the situation, and the professionals who refer the work — realtors, estate-sale companies, probate attorneys, property managers, investors, and more."
      />
      <section className="container-page grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience) => (
          <Link
            key={audience.slug}
            href={`/who-we-serve/${audience.slug}`}
            className="group flex flex-col justify-between border border-warm-concrete p-6 hover:border-redemption-red"
          >
            <div>
              <h2 className="font-display text-xl font-semibold text-heritage-black group-hover:text-redemption-red">
                {audience.shortName}
              </h2>
              <p className="mt-2 text-sm text-steel-gray">{audience.summary}</p>
            </div>
            <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-redemption-red">
              Learn more &rarr;
            </span>
          </Link>
        ))}
      </section>
      <CallToAction location="who_we_serve_overview_cta" headline="Discuss a Referral Partnership" variant="dark" />
    </>
  );
}
