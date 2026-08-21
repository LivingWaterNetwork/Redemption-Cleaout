import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
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
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "How It Works", href: "/how-it-works" }]} />
      <PageHero
        eyebrow="Process"
        title="From first call to a cleared property"
        description="On-site quoting is required for accuracy — pictures alone misrepresent scope. Here's exactly what happens at each step."
      />
      <section className="container-page py-16">
        <ProcessTimeline steps={howItWorksSteps} />
      </section>
      <section className="container-page py-16">
        <h2 className="font-display text-2xl font-bold text-heritage-black">
          A note on quoting and qualification
        </h2>
        <p className="mt-3 max-w-2xl text-steel-gray">
          Full-property and commercial cleanouts are scoped on-site, not from a photo or a
          form — that&apos;s how we give you a number that holds. For very small jobs, a
          phone or text description may be enough to schedule; we&apos;ll tell you which
          applies to your situation when you reach out.
        </p>
      </section>
      <CallToAction location="how_it_works_cta" headline="Ready to start with a walkthrough?" variant="dark" />
    </>
  );
}
