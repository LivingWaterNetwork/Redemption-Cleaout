"use client";

import { business, formatPhoneTelHref } from "@/content/business";
import { trackEvent } from "@/lib/analytics";

export function UtilityBar() {
  return (
    <div className="hidden bg-heritage-black text-clean-white sm:block">
      <div className="container-page flex items-center justify-between py-2 text-xs">
        <span>{business.address.publicAreaDescription}</span>
        <a
          href={formatPhoneTelHref()}
          className="font-semibold hover:text-redemption-red"
          onClick={() => trackEvent({ name: "click_call", params: { location: "utility_bar" } })}
        >
          {business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
