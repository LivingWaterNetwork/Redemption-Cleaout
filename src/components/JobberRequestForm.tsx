"use client";

import { useEffect, useState } from "react";
import { jobberEmbedUrl, jobberRequestFormUrl } from "@/content/business";
import { trackEvent } from "@/lib/analytics";

export function JobberRequestForm() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (jobberEmbedUrl) {
      trackEvent({ name: "jobber_form_view" });
    }
  }, []);

  if (!jobberEmbedUrl) {
    return (
      <div
        id="jobber-form-anchor"
        className="border border-dashed border-steel-gray/40 bg-warm-concrete/30 p-8 text-center"
      >
        <p className="font-display text-lg font-semibold text-heritage-black">
          Online request form is being connected.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-steel-gray">
          The embedded request form isn&apos;t configured yet
          (<code>NEXT_PUBLIC_JOBBER_EMBED_URL</code>). Call or text{" "}
          <a href="tel:+12483219609" className="font-semibold text-redemption-red">
            (248) 321-9609
          </a>{" "}
          and we&apos;ll get your walkthrough scheduled directly.
        </p>
      </div>
    );
  }

  return (
    <div id="jobber-form-anchor" className="flex flex-col gap-4">
      {!loaded && (
        <div
          aria-hidden="true"
          className="flex h-[600px] w-full animate-pulse items-center justify-center border border-warm-concrete bg-warm-concrete/40 text-sm text-steel-gray"
        >
          Loading request form…
        </div>
      )}
      <iframe
        src={jobberEmbedUrl}
        title="Redemption Cleanout Services — Request a Property Walkthrough"
        className={loaded ? "h-[900px] w-full border border-warm-concrete" : "hidden"}
        onLoad={() => setLoaded(true)}
      />
      {jobberRequestFormUrl && (
        <p className="text-sm text-steel-gray">
          Form not loading?{" "}
          <a
            href={jobberRequestFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-redemption-red underline"
          >
            Open the request form in a new tab
          </a>
          .
        </p>
      )}
    </div>
  );
}
