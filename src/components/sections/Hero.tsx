import Link from "next/link";
import { formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-heritage-black text-clean-white">
      {/* Thin red rule + starburst accent, per the brand guide's restrained
          graphic language — used once here, not repeated down the page. */}
      <div aria-hidden="true" className="h-1 w-full bg-redemption-red" />

      <div className="container-page py-20 lg:py-28">
        <p className="eyebrow">Rochester, Michigan &middot; Full-Property Cleanouts</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-7xl">
          Clear the Property.
          <br />
          Reclaim What Comes Next.
        </h1>

        <div aria-hidden="true" className="mt-8 flex items-center gap-3">
          <span className="h-px w-16 bg-redemption-red" />
          <span className="text-redemption-red">✳</span>
          <span className="h-px w-16 bg-redemption-red" />
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-clean-white/85">
          Complete residential and commercial cleanouts for estates, inherited homes,
          distressed properties, severe clutter, and time-sensitive real-estate
          transitions throughout Rochester and surrounding Southeast Michigan
          communities.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/request-walkthrough" className="btn-primary">
            Request a Property Walkthrough
          </Link>
          <a href={formatPhoneTelHref()} className="btn-ghost-on-dark">
            Call (248) 321-9609
          </a>
          <a href={formatPhoneSmsHref()} className="btn-ghost-on-dark">
            Text Dante
          </a>
        </div>
      </div>
    </section>
  );
}
