import Link from "next/link";
import { faqs } from "@/content/faqs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export function FAQPreview() {
  const preview = faqs.slice(0, 5);

  return (
    <section className="container-page py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
            Common questions, answered directly
          </h2>
        </div>
        <Link href="/faq" className="font-semibold text-redemption-red hover:underline">
          View all FAQs &rarr;
        </Link>
      </div>
      <div className="mt-8">
        <FAQAccordion faqs={preview} idPrefix="home-faq" />
      </div>
    </section>
  );
}
