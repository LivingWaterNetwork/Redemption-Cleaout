import Link from "next/link";
import { howItWorksSteps } from "@/content/process";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";

export function HowItWorksSection() {
  return (
    <section className="container-page py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
            From first call to a cleared property
          </h2>
        </div>
        <Link href="/how-it-works" className="font-semibold text-redemption-red hover:underline">
          See the full process &rarr;
        </Link>
      </div>
      <div className="mt-8">
        <ProcessTimeline steps={howItWorksSteps} />
      </div>
    </section>
  );
}
