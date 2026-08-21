import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reviews",
  description: "Authentic reviews for Redemption Cleanout Services in Rochester, Michigan.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }]} />
      <PageHero
        eyebrow="Reviews"
        title="What clients and partners say"
        description="Redemption has grown on referral relationships rather than review volume. We publish only what real clients actually wrote."
      />
      <ReviewSection />
      <CallToAction
        location="reviews_cta"
        headline="Judge us by the walkthrough"
        supportingText="You'll know within one conversation whether this is the right fit. No pressure to book."
      />
    </>
  );
}
