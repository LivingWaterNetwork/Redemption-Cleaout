"use client";

import { useEffect, useState } from "react";
import { jobberEmbedUrl, jobberRequestFormUrl, business } from "@/content/business";
import { formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";
import { trackEvent } from "@/lib/analytics";

/**
 * Embeds Jobber's own request form. Jobber remains the system of record —
 * nothing is stored on this site, and the component never implies a
 * submission happened. When the embed isn't configured it renders an honest
 * unavailable state with working call/text alternatives, rather than a form
 * that looks functional but isn't.
 */
export function JobberRequestForm() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!jobberEmbedUrl) return;
    trackEvent({ name: "jobber_form_view" });

    // If the iframe hasn't loaded in a reasonable window, surface the
    // fallback rather than leaving a spinner up indefinitely.
    const timer = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current));
    }, 12_000);
    return () => clearTimeout(timer);
  }, []);

  // ---- Not configured -----------------------------------------------------
  if (!jobberEmbedUrl) {
    return (
      <div id="jobber-form-anchor" className="frame-double">
        <div className="bg-warm-concrete p-8">
          <p className="eyebrow-plain text-steel-gray">Online form being connected</p>
          <h3 className="mt-3 font-display text-xl font-semibold text-heritage-black">
            Right now, the fastest way to reach us is directly
          </h3>
          <p className="mt-4 max-w-measure-lg text-body-base text-steel-gray">
            Our online request form is being connected to our scheduling system. Until it&apos;s
            live, call or text and we&apos;ll take the property details and get your
            walkthrough on the calendar — usually in the same conversation.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={formatPhoneTelHref()}
              className="btn-primary"
              onClick={() =>
                trackEvent({ name: "click_call", params: { location: "jobber_fallback" } })
              }
            >
              Call {business.phoneDisplay}
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </a>
            <a
              href={formatPhoneSmsHref()}
              className="btn-secondary"
              onClick={() =>
                trackEvent({ name: "click_text", params: { location: "jobber_fallback" } })
              }
            >
              Text {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---- Configured ---------------------------------------------------------
  return (
    <div id="jobber-form-anchor">
      {status === "loading" && (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[520px] w-full flex-col items-center justify-center gap-4 border border-heritage-black/12 bg-warm-concrete/60"
        >
          <span
            aria-hidden="true"
            className="h-8 w-8 animate-spin rounded-full border-2 border-redemption-red border-t-transparent motion-reduce:animate-none"
          />
          <p className="font-condensed text-sm font-bold uppercase tracking-[0.16em] text-steel-gray">
            Loading the request form
          </p>
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="frame-double">
          <div className="bg-warm-concrete p-8">
            <p className="eyebrow-plain text-steel-gray">Form didn&apos;t load</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-heritage-black">
              The request form couldn&apos;t be reached
            </h3>
            <p className="mt-4 max-w-measure-lg text-body-base text-steel-gray">
              This is usually a browser or connection issue, not your request. Open the form in
              a new tab, or call or text us and we&apos;ll handle it directly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {jobberRequestFormUrl && (
                <a
                  href={jobberRequestFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open the form in a new tab
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </a>
              )}
              <a href={formatPhoneTelHref()} className="btn-secondary">
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}

      <iframe
        src={jobberEmbedUrl}
        title="Redemption Cleanout Services — request a property walkthrough"
        loading="lazy"
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
        className={
          status === "ready"
            ? "h-[960px] w-full border border-heritage-black/12 bg-clean-white"
            : "sr-only"
        }
      />

      {status === "ready" && jobberRequestFormUrl && (
        <p className="mt-4 text-sm text-steel-gray">
          Trouble with the form above?{" "}
          <a
            href={jobberRequestFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-heritage-black underline decoration-redemption-red decoration-2 underline-offset-4"
          >
            Open it in a new tab
          </a>{" "}
          or call {business.phoneDisplay}.
        </p>
      )}
    </div>
  );
}
