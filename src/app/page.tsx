import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FlagshipServices } from "@/components/sections/FlagshipServices";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyRedemption } from "@/components/sections/WhyRedemption";
import { PreviousWork } from "@/components/sections/PreviousWork";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { webPageJsonLd } from "@/lib/structuredData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Property Cleanouts & Demolition | Metro Detroit",
  description:
    "Full property cleanouts and demolition across Metro Detroit — Macomb, Oakland, St. Clair, Wayne, Monroe, Washtenaw, and Livingston counties. Estimates from photos, final quote on site.",
  path: "/",
});

/**
 * Deliberately short. The page runs hero, the two services, how quoting works,
 * why us, work, reviews, coverage, CTA — and nothing else. Sections were cut
 * (a trust strip, a situation picker, a partner block, a founder blurb, an FAQ
 * preview) because each one added a decision to make before reaching a phone
 * number. Add a section here only if it earns that cost.
 */
export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webPageJsonLd(
          "Redemption Cleanout Services",
          "/",
          "Full property cleanouts and demolition throughout Metro Detroit.",
        )}
      />
      <Hero />
      <FlagshipServices />
      <HowItWorksSection />
      <WhyRedemption />
      <PreviousWork />
      <ReviewSection />
      <ServiceAreaSection />
      <CallToAction
        location="homepage_final_cta"
        headline="Redeem your property."
        supportingText="Send us photos and we'll give you a ballpark estimate over the phone. Then we come out, walk the property, and give you the final quote in person."
      />
    </>
  );
}
