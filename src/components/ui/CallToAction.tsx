"use client";

import Link from "next/link";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";
import { trackEvent } from "@/lib/analytics";

type CallToActionProps = {
  variant?: "dark" | "light" | "red";
  headline: string;
  supportingText?: string;
  primaryHref?: string;
  primaryLabel?: string;
  showCallText?: boolean;
  location: string;
};

export function CallToAction({
  variant = "dark",
  headline,
  supportingText,
  primaryHref = "/request-walkthrough",
  primaryLabel = "Request a Property Walkthrough",
  showCallText = true,
  location,
}: CallToActionProps) {
  const bg =
    variant === "dark"
      ? "bg-heritage-black text-clean-white"
      : variant === "red"
        ? "bg-redemption-red text-clean-white"
        : "bg-warm-concrete text-heritage-black";

  return (
    <section className={`${bg} py-16`}>
      <div className="container-page flex flex-col items-start gap-6 text-left">
        <h2 className="text-3xl font-bold sm:text-4xl">{headline}</h2>
        {supportingText && <p className="max-w-2xl text-base opacity-90">{supportingText}</p>}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className={variant === "light" ? "btn-primary" : "btn-ghost-on-dark"}
            onClick={() => trackEvent({ name: "click_request_walkthrough", params: { location } })}
          >
            {primaryLabel}
          </Link>
          {showCallText && (
            <div className="flex gap-3">
              <a
                href={formatPhoneTelHref()}
                className={variant === "light" ? "btn-secondary" : "btn-ghost-on-dark"}
                onClick={() => trackEvent({ name: "click_call", params: { location } })}
              >
                Call {business.phoneDisplay}
              </a>
              <a
                href={formatPhoneSmsHref()}
                className={variant === "light" ? "btn-secondary" : "btn-ghost-on-dark"}
                onClick={() => trackEvent({ name: "click_text", params: { location } })}
              >
                Text Us
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
