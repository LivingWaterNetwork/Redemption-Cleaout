"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "redemption-consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // localStorage isn't available during SSR, so this must be read
      // after mount rather than in a lazy useState initializer.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(window.localStorage.getItem(CONSENT_KEY) === null);
    } catch {
      setVisible(false);
    }
  }, []);

  function setConsent(value: "granted" | "denied") {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
      window.dispatchEvent(new Event("redemption-consent-change"));
    } catch {
      // localStorage unavailable — proceed without persisting the choice
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-warm-concrete bg-clean-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded sm:border"
    >
      <p className="text-sm text-heritage-black">
        We use analytics to understand how visitors use this site. We don&apos;t collect
        form contents, names, phone numbers, or emails in analytics.
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => setConsent("granted")} className="btn-primary flex-1 !py-2 text-xs">
          Accept
        </button>
        <button type="button" onClick={() => setConsent("denied")} className="btn-secondary flex-1 !py-2 text-xs">
          Decline
        </button>
      </div>
    </div>
  );
}
