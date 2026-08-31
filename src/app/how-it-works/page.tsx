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
    "How a Redemption Cleanout Services job works — a ballpark estimate from photos over the phone, the final quote given on site, then a clear scope and a dependable crew.",
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
        title="Photos first. Final quote on site."
        description="Send photos and we'll give you a ballpark estimate over the phone, usually the same day. The final quote is given in person, once we've walked the property. Here is exactly what happens at each step."
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
                Two numbers, and what each one means
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="max-w-measure-lg text-body-lg text-steel-gray">
                The <strong className="font-semibold text-heritage-black">estimate</strong> comes
                first: text or email photos, and we&apos;ll give you a ballpark range over the
                phone, usually the same day. It costs nothing, commits you to nothing, and it&apos;s
                enough to decide whether to go ahead.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-measure-lg text-body-base text-steel-gray">
                The <strong className="font-semibold text-heritage-black">quote</strong> comes at
                the property. Photos compress depth and hide what&apos;s behind a door or under a
                staircase — and they can&apos;t show a stair width, a blocked driveway, or how far
                a crew has to carry every load. Those are what move a price, so the final number
                is given on site, in person, and it&apos;s the number that holds.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CallToAction
        location="how_it_works_cta"
        headline="Start with photos"
        supportingText="Send the property details and a few photos, and we'll come back with a ballpark estimate. Nothing is booked until you've seen the final quote."
      />
    </>
  );
}
