import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { business } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Website-Use Notice",
  description: "Terms and website-use notice for Redemption Cleanout Services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
      <PageHero eyebrow="Legal" title="Terms & Website-Use Notice" />
      <article className="container-page max-w-3xl space-y-6 py-16 text-steel-gray">
        <h2 className="font-display text-xl font-bold text-heritage-black">Use of This Website</h2>
        <p>
          This website is provided for informational purposes to describe the services
          offered by {business.name}. Information on this site, including service
          descriptions and pricing factors, is general in nature. Actual project scope
          and pricing are confirmed through an on-site walkthrough, not this website.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">No Automated Quotes</h2>
        <p>
          Nothing on this website constitutes a binding quote or automated pricing.
          Full-property, commercial, and larger cleanouts require an on-site
          walkthrough before a scope or price is confirmed.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">Third-Party Request Form</h2>
        <p>
          Property walkthrough requests are processed through Jobber, a third-party
          service. Submitting a request through this site does not guarantee
          scheduling or availability.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">Changes</h2>
        <p>These terms may be updated from time to time without prior notice.</p>
      </article>
    </>
  );
}
