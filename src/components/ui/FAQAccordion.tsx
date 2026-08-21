"use client";

import { useState } from "react";
import type { ServiceFAQ } from "@/types/content";

/**
 * Accessible accordion. The panel animates via a grid-template-rows
 * transition (which animates smoothly, unlike `height: auto`) and is kept out
 * of the accessibility tree and tab order while collapsed.
 */
export function FAQAccordion({
  faqs,
  idPrefix = "faq",
  onDark = false,
}: {
  faqs: ServiceFAQ[];
  idPrefix?: string;
  onDark?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const border = onDark ? "border-clean-white/15" : "border-heritage-black/12";
  const question = onDark ? "text-clean-white" : "text-heritage-black";
  const answer = onDark ? "text-clean-white/70" : "text-steel-gray";

  return (
    <div className={`border-t ${border}`}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <div key={buttonId} className={`border-b ${border}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`group flex w-full items-start justify-between gap-6 py-6 text-left font-display text-lg font-semibold transition-colors duration-micro ${question} hover:text-redemption-red`}
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="relative mt-2 block h-3 w-3 shrink-0"
                >
                  {/* Plus/minus drawn as two rules so it can rotate smoothly */}
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-redemption-red" />
                  <span
                    className={`absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-redemption-red transition-transform duration-standard ease-editorial ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-7"
            >
              <p className={`max-w-measure-lg text-body-base ${answer}`}>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
