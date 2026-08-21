"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { gaMeasurementId } from "@/content/business";

const CONSENT_KEY = "redemption-consent";

export function Analytics() {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    try {
      // localStorage isn't available during SSR, so consent must be read
      // after mount rather than in a lazy useState initializer.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsentGranted(window.localStorage.getItem(CONSENT_KEY) === "granted");
    } catch {
      setConsentGranted(false);
    }

    function handleConsentChange() {
      try {
        setConsentGranted(window.localStorage.getItem(CONSENT_KEY) === "granted");
      } catch {
        setConsentGranted(false);
      }
    }

    window.addEventListener("redemption-consent-change", handleConsentChange);
    return () => window.removeEventListener("redemption-consent-change", handleConsentChange);
  }, []);

  if (!gaMeasurementId || !consentGranted) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
