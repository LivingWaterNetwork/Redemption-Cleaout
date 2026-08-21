import Link from "next/link";
import { faqs } from "@/content/faqs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/motion/Reveal";

export function FAQPreview() {
  const preview = faqs.slice(0, 5);

  return (
    <section className="py-section">
      <div className="container-page">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Questions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                Answered directly
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-measure text-body-base text-steel-gray">
                No hedging and no fine print. If your question isn&apos;t here, call or text and
                we&apos;ll answer it straight.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link href="/faq" className="link-editorial mt-7">
                All questions
                <span aria-hidden="true" className="btn-arrow">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-8">
            <FAQAccordion faqs={preview} idPrefix="home-faq" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
