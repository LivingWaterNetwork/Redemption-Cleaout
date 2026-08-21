import Link from "next/link";
import { formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-heritage-black text-clean-white">
      <div className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">Rochester, Michigan &middot; Full-Property Cleanouts</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Clear the Property. Reclaim What Comes Next.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-clean-white/85">
            Complete residential and commercial cleanouts for estates, inherited homes,
            distressed properties, severe clutter, and time-sensitive real-estate
            transitions throughout Rochester and surrounding Southeast Michigan
            communities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/request-walkthrough" className="btn-primary">
              Request a Property Walkthrough
            </Link>
            <a href={formatPhoneTelHref()} className="btn-ghost-on-dark">
              Call {"("}248{")"} 321-9609
            </a>
            <a href={formatPhoneSmsHref()} className="btn-ghost-on-dark">
              Text Dante
            </a>
          </div>
        </div>
        <div className="hidden lg:block">
          <PhotoPlaceholder label="Redemption crew photography coming soon" aspect="aspect-square" />
        </div>
      </div>
    </section>
  );
}
