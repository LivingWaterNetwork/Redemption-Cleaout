import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/structuredData";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Redemption Cleanout Services: quoting, scheduling, service areas, what we handle, and how we work with sensitive situations.",
  path: "/faq",
});

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FAQPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqPageJsonLd(faqs),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />

      <PageHero
        eyebrow="FAQ"
        title="Answered directly"
        description="No hedging and no fine print. If your question isn't here, call or text and we'll answer it straight."
      />

      <section className="py-section">
        <div className="container-page">
          {categories.map((category, index) => (
            <div
              key={category}
              className="grid gap-x-14 gap-y-8 border-b border-heritage-black/12 py-14 first:pt-0 last:border-b-0 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold text-heritage-black">
                    {category}
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={80} className="lg:col-span-8">
                <FAQAccordion
                  faqs={faqs.filter((f) => f.category === category)}
                  idPrefix={`faq-${index}`}
                />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CallToAction
        location="faq_cta"
        headline="Still have a question?"
        supportingText="Call or text and you'll reach the person accountable for the work. Most questions get answered in one conversation."
      />
    </>
  );
}
