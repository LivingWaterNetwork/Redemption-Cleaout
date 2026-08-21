"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";
import { trackEvent } from "@/lib/analytics";

export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("jobber-form-anchor");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setHidden(entry.isIntersecting);
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-warm-concrete bg-clean-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)] transition-transform duration-200 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-warm-concrete">
        <a
          href={formatPhoneTelHref()}
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-xs font-semibold text-heritage-black"
          onClick={() => trackEvent({ name: "click_call", params: { location: "mobile_action_bar" } })}
        >
          <span aria-hidden="true">📞</span>
          Call
        </a>
        <a
          href={formatPhoneSmsHref()}
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-xs font-semibold text-heritage-black"
          onClick={() => trackEvent({ name: "click_text", params: { location: "mobile_action_bar" } })}
        >
          <span aria-hidden="true">💬</span>
          Text
        </a>
        <Link
          href="/request-walkthrough"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-redemption-red text-xs font-semibold text-clean-white"
          onClick={() =>
            trackEvent({ name: "click_request_walkthrough", params: { location: "mobile_action_bar" } })
          }
        >
          <span aria-hidden="true">📋</span>
          Walkthrough
        </Link>
      </div>
      <span className="sr-only">Phone: {business.phoneDisplay}</span>
    </div>
  );
}
