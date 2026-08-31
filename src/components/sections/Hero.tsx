import Link from "next/link";
import Image from "next/image";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Near-full-viewport editorial hero. Photography sits behind an asymmetric
 * text column with a scrim for legibility; the headline reveals line by line,
 * then supporting copy, CTAs, and the credibility row.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[clamp(600px,92svh,980px)] items-end overflow-hidden bg-heritage-black text-clean-white on-dark">
      {/* Background photography */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-media absolute inset-0">
          <Image
            src="/images/photos/branded-truck-and-dump-trailer-residential-drive.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.42]"
          />
        </div>
        {/* Directional scrim: dark at bottom-left where the copy sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,13,14,0.97) 0%, rgba(11,13,14,0.86) 34%, rgba(11,13,14,0.62) 62%, rgba(11,13,14,0.55) 100%)",
          }}
        />
        <div aria-hidden="true" className="texture-concrete absolute inset-0 opacity-70" />
      </div>

      {/* Top hairline, echoing the logo's frame */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-redemption-red" />

      <div className="container-page relative w-full pb-[clamp(4rem,9vh,7rem)] pt-[clamp(7rem,18vh,12rem)]">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Asymmetric: copy occupies 8 of 12 columns, offset from the right edge */}
          <div className="lg:col-span-9 xl:col-span-8">
            <Reveal>
              <p className="eyebrow">
                {business.address.publicAreaDescription} &middot; Full Property Cleanouts &amp;
                Demolition
              </p>
            </Reveal>

            <Reveal variant="lines" delay={140} as="h1" className="mt-7 text-hero font-bold">
              <span className="block">Redeem Your Property.</span>
              <span className="block text-clean-white/95">Redeem Your Space.</span>
            </Reveal>

            <Reveal delay={420}>
              <p className="mt-8 max-w-measure-lg text-body-lg text-clean-white/80">
                Full property cleanouts and demolition across all of Metro Detroit — estates,
                foreclosures, commercial spaces, severe clutter, interior gut-outs, and full
                structure teardowns. Estimates start from photos over the phone; the final
                quote is given on site, in person.
              </p>
            </Reveal>

            <Reveal delay={540}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/request-walkthrough" className="btn-primary">
                  Get a Free Estimate
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
                <a href={formatPhoneTelHref()} className="btn-on-dark">
                  Call {business.phoneDisplay}
                </a>
                <a href={formatPhoneSmsHref()} className="btn-on-dark">
                  Text Dante
                </a>
              </div>
            </Reveal>

            {/* Credibility row — verified facts only, no invented metrics. */}
            <Reveal delay={660}>
              <div className="mt-14 border-t border-clean-white/15 pt-6">
                <dl className="flex flex-wrap gap-x-12 gap-y-5">
                  <div>
                    <dt className="eyebrow-plain">Experience</dt>
                    <dd className="mt-1.5 font-condensed text-base font-bold">
                      13 years in real estate
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow-plain">Coverage</dt>
                    <dd className="mt-1.5 font-condensed text-base font-bold">
                      All 7 Metro Detroit counties
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow-plain">Quoting</dt>
                    <dd className="mt-1.5 font-condensed text-base font-bold">
                      Photo estimate, on-site final
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="scroll-cue absolute bottom-6 right-gutter hidden flex-col items-center gap-2 lg:flex"
      >
        <span className="font-condensed text-[11px] uppercase tracking-[0.24em] text-clean-white/50">
          Scroll
        </span>
        <span className="text-clean-white/50">&darr;</span>
      </div>
    </section>
  );
}
