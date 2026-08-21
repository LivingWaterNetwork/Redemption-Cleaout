import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { SituationSelector } from "@/components/sections/SituationSelector";
import { FlagshipServices } from "@/components/sections/FlagshipServices";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { WhyRedemption } from "@/components/sections/WhyRedemption";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProfessionalPartnerSection } from "@/components/sections/ProfessionalPartnerSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { RecentWork } from "@/components/sections/RecentWork";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { webPageJsonLd } from "@/lib/structuredData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Redemption Cleanout Services | Full-Property Cleanouts in Rochester, MI",
  description:
    "Complete residential and commercial property cleanouts for estates, inherited homes, distressed properties, severe clutter, and time-sensitive real-estate transitions in Rochester, Michigan.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webPageJsonLd(
          "Redemption Cleanout Services",
          "/",
          "Complete residential and commercial property cleanouts throughout Rochester and Southeast Michigan.",
        )}
      />
      <Hero />
      <TrustBand />
      <SituationSelector />
      <FlagshipServices />
      <BeforeAfterSection />
      <WhyRedemption />
      <HowItWorksSection />
      <ProfessionalPartnerSection />
      <FounderSection />
      <RecentWork />
      <ReviewSection />
      <ServiceAreaSection />
      <FAQPreview />
      <CallToAction
        location="homepage_final_cta"
        headline="Reclaim the property. Then move forward."
        supportingText="Tell us about the property and we'll schedule an on-site walkthrough. You'll get a clear scope, a real timeline, and a price that holds — before anything is booked."
      />
    </>
  );
}
