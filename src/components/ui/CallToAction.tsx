"use client";

import Link from "next/link";
import Image from "next/image";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";
import { trackEvent } from "@/lib/analytics";
import { Reveal } from "@/components/motion/Reveal";

type CallToActionProps = {
  headline: string;
  supportingText?: string;
  primaryHref?: string;
  primaryLabel?: string;
  showCallText?: boolean;
  location: string;
  /**
   * "feature" is the full-bleed photographic closer used at the end of a page
   * narrative. "band" is the lighter interior-page variant.
   */
  variant?: "feature" | "band";
};

const nextSteps = [
  "We review your request and reach out to confirm details.",
  "We schedule an on-site walkthrough around your date.",
  "You get a clear scope and price before anything is booked.",
];

export function CallToAction({
  headline,
  supportingText,
  primaryHref = "/request-walkthrough",
  primaryLabel = "Request a Property Walkthrough",
  showCallText = true,
  location,
  variant = "feature",
}: CallToActionProps) {
  if (variant === "band") {
    return (
      <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
        <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal className="max-w-measure-lg">
            <h2 className="text-section font-bold text-heritage-black">{headline}</h2>
            {supportingText && (
              <p className="mt-5 text-body-lg text-steel-gray">{supportingText}</p>
            )}
          </Reveal>
          <Reveal delay={100} className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="btn-primary"
              onClick={() =>
                trackEvent({ name: "click_request_walkthrough", params: { location } })
              }
            >
              {primaryLabel}
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
            {showCallText && (
              <a
                href={formatPhoneTelHref()}
                className="btn-secondary"
                onClick={() => trackEvent({ name: "click_call", params: { location } })}
              >
                Call {business.phoneDisplay}
              </a>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-heritage-black py-section-lg text-clean-white on-dark">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/photos/branded-dump-trailer-curbside.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(11,13,14,0.97) 0%, rgba(11,13,14,0.88) 48%, rgba(11,13,14,0.6) 100%)",
          }}
        />
        <div aria-hidden="true" className="texture-concrete absolute inset-0 opacity-70" />
      </div>

      <div className="container-page">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Get a clear next step</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section-xl font-bold">{headline}</h2>
            </Reveal>
            {supportingText && (
              <Reveal delay={160}>
                <p className="mt-7 max-w-measure-lg text-body-lg text-clean-white/80">
                  {supportingText}
                </p>
              </Reveal>
            )}
            <Reveal delay={240}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={primaryHref}
                  className="btn-primary"
                  onClick={() =>
                    trackEvent({ name: "click_request_walkthrough", params: { location } })
                  }
                >
                  {primaryLabel}
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
                {showCallText && (
                  <>
                    <a
                      href={formatPhoneTelHref()}
                      className="btn-on-dark"
                      onClick={() => trackEvent({ name: "click_call", params: { location } })}
                    >
                      Call {business.phoneDisplay}
                    </a>
                    <a
                      href={formatPhoneSmsHref()}
                      className="btn-on-dark"
                      onClick={() => trackEvent({ name: "click_text", params: { location } })}
                    >
                      Text Dante
                    </a>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          {/* What happens next — sets expectations before the Jobber handoff */}
          <Reveal delay={200} className="lg:col-span-5 lg:pt-16">
            <p className="eyebrow-plain">What happens next</p>
            <ol className="mt-6 border-t border-clean-white/15">
              {nextSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-5 border-b border-clean-white/15 py-5 text-sm text-clean-white/75"
                >
                  <span
                    aria-hidden="true"
                    className="font-condensed font-bold tabular-nums text-clean-white/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
