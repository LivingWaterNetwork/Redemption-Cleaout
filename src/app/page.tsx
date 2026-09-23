import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FlagshipServices } from "@/components/sections/FlagshipServices";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyRedemption } from "@/components/sections/WhyRedemption";
import { PreviousWork } from "@/components/sections/PreviousWork";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { webPageJsonLd } from "@/lib/structuredData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Fast, Reliable Cleanouts & Demolition | Metro Detroit",
  description:
    "Estate cleanouts, junk removal, and demolition across Metro Detroit — Macomb, Oakland, St. Clair, Wayne, Monroe, Washtenaw, and Livingston counties. Estimates from photos, final quote on site.",
  path: "/",
});

/**
 * Deliberately short. The page runs hero, services, how quoting works, why us,
 * before & after, reviews, CTA — and nothing else. Sections were cut (a trust
 * strip, a situation picker, a partner block, a founder blurb, an FAQ preview,
 * the county grid) because each one added a decision to make before reaching a
 * phone number. Coverage lives in the footer and on /service-areas. Add a
 * section here only if it earns that cost.
 */
export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webPageJsonLd(
          "Redemption Cleanout Services",
          "/",
          "Estate cleanouts, junk removal, and demolition throughout Metro Detroit.",
        )}
      />
      <Hero />
      <FlagshipServices />
      <HowItWorksSection />
      <WhyRedemption />
      <PreviousWork />
      <ReviewSection />
      <CallToAction
        location="homepage_final_cta"
        headline="Redeem your property."
        supportingText="Send us photos and we'll give you a ballpark estimate over the phone. Then we come out, walk the property, and give you the final quote in person."
      />
    </>
  );
}
