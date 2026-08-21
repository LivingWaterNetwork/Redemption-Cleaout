import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { howItWorksSteps } from "@/content/process";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description:
    "How a Redemption Cleanout Services project works, from your first call to a final walkthrough — on-site quoting, clear scope, and a dependable crew.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/how-it-works" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "How It Works", href: "/how-it-works" }]}
      />

      <PageHero
        eyebrow="Process"
        title="From first call to a cleared property"
        description="On-site quoting is required for accuracy — photos alone misrepresent scope. Here is exactly what happens at each step."
      />

      <section className="py-section">
        <div className="container-page">
          <ProcessTimeline steps={howItWorksSteps} />
        </div>
      </section>

      <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
        <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Quoting</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                Why we quote on-site
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="max-w-measure-lg text-body-lg text-steel-gray">
                Photos compress depth and hide what&apos;s behind a door or under a staircase.
                That&apos;s the single biggest reason phone estimates run inaccurate on job day.
                Full-property and commercial cleanouts are scoped in person so the number we
                give you is the number that holds.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-measure-lg text-body-base text-steel-gray">
                For very small jobs, a phone or text description is often enough to schedule
                directly. We&apos;ll tell you which applies to your situation when you reach
                out — we won&apos;t send someone out if you don&apos;t need it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CallToAction
        location="how_it_works_cta"
        headline="Start with a walkthrough"
        supportingText="Send the property details and we'll follow up to schedule. You'll have a clear scope and price before anything is booked."
      />
    </>
  );
}
