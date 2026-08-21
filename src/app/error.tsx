"use client";

import Link from "next/link";
import { useEffect } from "react";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";

/**
 * Route-level error boundary. A runtime error on a lead-generation site is a
 * lost lead, so this never leaves the visitor on an unbranded stack trace —
 * it keeps the phone and text paths in front of them, which work whether or
 * not the rest of the page recovered.
 *
 * Deliberately does not import Header or Footer: if the failure came from a
 * layout-adjacent component, re-rendering the chrome risks throwing again.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // No error-reporting service is configured (see ANALYTICS.md — analytics
    // is GA4 only, and never receives PII). The console keeps it diagnosable
    // without adding a third-party dependency or a CSP exception.
    console.error("Route error boundary caught an error.");
  }, []);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-4 py-16">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="text-3xl font-bold text-heritage-black sm:text-4xl">
        This page didn&apos;t load correctly.
      </h1>
      <p className="max-w-measure-lg text-body-base text-steel-gray">
        That&apos;s on us, not on you. Try again below — or call or text and we&apos;ll take
        the property details directly. Most questions get answered in one conversation.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
          <span aria-hidden="true" className="btn-arrow">
            &rarr;
          </span>
        </button>
        <a href={formatPhoneTelHref()} className="btn-secondary">
          Call {business.phoneDisplay}
        </a>
        <a href={formatPhoneSmsHref()} className="btn-secondary">
          Text {business.phoneDisplay}
        </a>
      </div>
      <Link href="/" className="link-editorial mt-4">
        Back to home
        <span aria-hidden="true" className="btn-arrow">
          &rarr;
        </span>
      </Link>
    </div>
  );
}
