"use client";

import Link from "next/link";
import { audiences } from "@/content/audiences";
import { Reveal } from "@/components/motion/Reveal";
import { trackEvent } from "@/lib/analytics";

/**
 * Professional-partner band. Given a deliberately different treatment from
 * the consumer sections — red field, framed capability table, tighter
 * condensed type — so a realtor or attorney recognizes it as addressed to
 * them. No referral-payment promises anywhere.
 */
const capabilities = [
  { term: "Accountability", detail: "One point of contact from walkthrough to completion." },
  { term: "Communication", detail: "Proactive updates, so you never explain a surprise to your client." },
  { term: "Deadlines", detail: "Closings, lease-ends, and listing dates scoped in from the start." },
  { term: "Scope documentation", detail: "Written scope after the walkthrough, before work begins." },
  { term: "Real-estate understanding", detail: "Listing prep, distressed property, and investor timelines." },
  { term: "Repeat-work readiness", detail: "Crew capacity for ongoing volume across a portfolio." },
];

export function ProfessionalPartnerSection() {
  return (
    <section className="relative overflow-hidden bg-redemption-red py-section text-clean-white on-dark">
      <div aria-hidden="true" className="texture-concrete absolute inset-0 opacity-60" />

      <div className="container-page relative">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-clean-white before:bg-clean-white/70">
                For Professional Partners
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold">
                Reliable cleanout execution for properties that need to move forward.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-measure text-body-base text-clean-white/85">
                Realtors, probate attorneys, estate-sale companies, property managers,
                investors, and commercial owners work with Redemption because the boring
                parts get done right: answering fast, showing up on time, and finishing
                what was scoped.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/who-we-serve"
                  className="btn-base bg-clean-white text-heritage-black hover:bg-heritage-black hover:text-clean-white"
                  onClick={() =>
                    trackEvent({
                      name: "click_professional_partner",
                      params: { audience: "homepage_band" },
                    })
                  }
                >
                  Discuss a Referral Partnership
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Capability table */}
          <div className="lg:col-span-7">
            <Reveal>
              <dl className="border-t border-clean-white/25">
                {capabilities.map((item) => (
                  <div
                    key={item.term}
                    className="grid gap-1 border-b border-clean-white/25 py-5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6"
                  >
                    <dt className="font-condensed text-base font-bold uppercase tracking-wide">
                      {item.term}
                    </dt>
                    <dd className="text-sm leading-relaxed text-clean-white/80">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {audiences.map((audience) => (
                  <li key={audience.slug}>
                    <Link
                      href={`/who-we-serve/${audience.slug}`}
                      className="font-condensed text-sm font-bold uppercase tracking-wide text-clean-white/75 underline decoration-clean-white/30 underline-offset-[6px] transition-colors duration-micro hover:text-clean-white hover:decoration-clean-white"
                      onClick={() =>
                        trackEvent({
                          name: "click_professional_partner",
                          params: { audience: audience.slug },
                        })
                      }
                    >
                      {audience.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
