import Link from "next/link";
import { howItWorksSteps } from "@/content/process";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { business, formatPhoneTelHref } from "@/content/business";

export function HowItWorksSection() {
  return (
    <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
      <div className="container-page">
        <SectionHeader
          label="How It Works"
          title="Photos first. Final quote on site."
          intro="Send photos and we'll give you a ballpark estimate over the phone, usually the same day. The final quote is given in person, once we've walked the property. Here is exactly what happens at each step."
          action={
            <Link href="/how-it-works" className="link-editorial">
              Full process
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          }
        />

        <div className="mt-16">
          <ProcessTimeline steps={howItWorksSteps} />
        </div>

        {/* Jobber path, integrated into the process rather than bolted on */}
        <Reveal>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-heritage-black/12 pt-10 md:flex-row md:items-center">
            <p className="max-w-measure-lg text-body-base text-steel-gray">
              Step one takes about two minutes. Send the property details and a few photos,
              and we&apos;ll come back to you with an estimate.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href="/request-walkthrough" className="btn-primary">
                Get a Free Estimate
                <span aria-hidden="true" className="btn-arrow">
                  &rarr;
                </span>
              </Link>
              <a href={formatPhoneTelHref()} className="btn-secondary">
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
