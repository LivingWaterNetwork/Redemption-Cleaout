"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const partnerPoints = [
  "One accountable point of contact",
  "Walkthrough and scope documentation",
  "Deadline awareness",
  "Residential and commercial capability",
  "Repeat-work readiness",
  "Photo documentation when approved",
  "Respectful client communication",
  "Real-estate understanding",
];

export function ProfessionalPartnerSection() {
  return (
    <section className="bg-heritage-black py-16 text-clean-white">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">For Professional Partners</p>
          <h2 className="mt-1 font-display text-3xl font-bold">
            Reliable cleanout execution for properties that need to move forward.
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {partnerPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-clean-white/85">
                <span aria-hidden="true" className="mt-0.5 text-redemption-red">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/who-we-serve"
              className="btn-ghost-on-dark"
              onClick={() =>
                trackEvent({ name: "click_professional_partner", params: { audience: "general" } })
              }
            >
              Discuss a Referral Partnership
            </Link>
            <Link href="/request-walkthrough" className="btn-primary">
              Request a Commercial Walkthrough
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
