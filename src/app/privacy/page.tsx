import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { business, siteUrl } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Redemption Cleanout Services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <article className="container-page max-w-3xl space-y-6 py-16 text-steel-gray">
        <p>
          This policy describes how {business.name} ({siteUrl}) handles information
          collected through this website.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">Information We Collect</h2>
        <p>
          This website does not operate its own lead-storage database. Property
          walkthrough and contact requests submitted through our request form are
          collected directly by Jobber, our scheduling and customer-management
          platform, under Jobber&apos;s own privacy practices. We do not store form
          submissions, uploaded photos, or lead data on our website server.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">Analytics</h2>
        <p>
          With your consent, we use Google Analytics to understand how visitors use
          this site. Analytics data does not include form contents, names, phone
          numbers, email addresses, or uploaded images. You can decline analytics
          cookies using the consent banner shown on your first visit.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">Third-Party Services</h2>
        <p>
          Requests submitted through this site are processed by Jobber
          (getjobber.com), a third-party service provider. Jobber&apos;s handling of
          your information is governed by Jobber&apos;s own privacy policy.
        </p>

        <h2 className="font-display text-xl font-bold text-heritage-black">Contact</h2>
        <p>
          Questions about this policy can be directed to us by phone or text at{" "}
          {business.phoneDisplay}.
        </p>
      </article>
    </>
  );
}
