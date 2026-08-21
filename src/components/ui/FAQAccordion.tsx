"use client";

import { useState } from "react";
import type { ServiceFAQ } from "@/types/content";

export function FAQAccordion({ faqs, idPrefix = "faq" }: { faqs: ServiceFAQ[]; idPrefix?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-warm-concrete border-y border-warm-concrete">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;
        return (
          <div key={buttonId}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-heritage-black"
              >
                <span>{faq.question}</span>
                <span aria-hidden="true" className="shrink-0 text-2xl text-redemption-red">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-steel-gray"
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
