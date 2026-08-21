import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { flagshipServices, supportingServices } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Property Cleanout Services",
  description:
    "Full-property cleanouts, estate and inherited-property cleanouts, commercial cleanouts, foreclosure cleanouts, hoarding-related cleanouts, junk removal, move-out cleanouts, and light demolition in Rochester, Michigan.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <PageHero
        eyebrow="Services"
        title="Full-property cleanouts, done right — and everything around them"
        description="Redemption leads with complete-property work: estates, commercial spaces, foreclosures, and severe-clutter situations. We also handle the smaller jobs that come with them."
      />
      <section className="container-page py-16">
        <h2 className="font-display text-2xl font-bold text-heritage-black">Flagship Services</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <h2 className="mt-14 font-display text-2xl font-bold text-heritage-black">Supporting Services</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supportingServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <p className="mt-8 text-sm text-steel-gray">
          Need help figuring out which service fits your situation?{" "}
          <Link href="/how-it-works" className="font-semibold text-redemption-red hover:underline">
            See how the process works
          </Link>{" "}
          or request a walkthrough and we&apos;ll help you scope it.
        </p>
      </section>
      <CallToAction location="services_overview_cta" headline="Request a Property Walkthrough" variant="dark" />
    </>
  );
}
