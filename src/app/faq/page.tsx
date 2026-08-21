import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
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
        data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), faqPageJsonLd(faqs)]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" />
      <section className="container-page py-16">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="font-display text-2xl font-bold text-heritage-black">{category}</h2>
            <div className="mt-4">
              <FAQAccordion
                faqs={faqs.filter((f) => f.category === category)}
                idPrefix={`faq-${category.toLowerCase().replace(/\s+/g, "-")}`}
              />
            </div>
          </div>
        ))}
      </section>
      <CallToAction location="faq_cta" headline="Still have questions? Talk with us directly." variant="dark" />
    </>
  );
}
