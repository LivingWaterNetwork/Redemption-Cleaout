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
      <PageHero eyebrow="Reviews" title="What clients and partners say" />
      <ReviewSection />
      <CallToAction location="reviews_cta" headline="Request a Property Walkthrough" variant="dark" />
    </>
  );
}
