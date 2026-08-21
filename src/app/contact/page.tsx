import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Redemption Cleanout Services in Rochester, Michigan — call, text, or request a walkthrough.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <PageHero eyebrow="Contact" title="Get in touch" description={business.address.publicAreaDescription} />

      <section className="container-page grid gap-8 py-16 sm:grid-cols-3">
        <div className="border border-warm-concrete p-6 text-center">
          <h2 className="font-display text-lg font-bold text-heritage-black">Call</h2>
          <a href={formatPhoneTelHref()} className="mt-2 block font-semibold text-redemption-red">
            {business.phoneDisplay}
          </a>
        </div>
        <div className="border border-warm-concrete p-6 text-center">
          <h2 className="font-display text-lg font-bold text-heritage-black">Text</h2>
          <a href={formatPhoneSmsHref()} className="mt-2 block font-semibold text-redemption-red">
            {business.phoneDisplay}
          </a>
        </div>
        <div className="border border-warm-concrete p-6 text-center">
          <h2 className="font-display text-lg font-bold text-heritage-black">Request Online</h2>
          <Link href="/request-walkthrough" className="mt-2 block font-semibold text-redemption-red">
            Request a Walkthrough
          </Link>
        </div>
      </section>

      <section className="container-page pb-16 text-sm text-steel-gray">
        <p>
          Follow along on Instagram at{" "}
          <a href={business.instagramUrl} className="font-semibold text-redemption-red hover:underline">
            {business.instagramHandle}
          </a>
          .
        </p>
      </section>
    </>
  );
}
