import Link from "next/link";
import Image from "next/image";
import { founderStory } from "@/content/founderStory";
import { business, formatPhoneSmsHref } from "@/content/business";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Founder credibility. Uses work imagery rather than a portrait until an
 * approved photo of Dante exists (see IMAGE_REQUIREMENTS.md) — an honest
 * substitute rather than an empty placeholder box.
 */
export function FounderSection() {
  const firstName = business.founderName.split(" ")[0];

  return (
    <section className="bg-heritage-black py-section text-clean-white on-dark">
      <div className="container-page">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12 lg:items-center">
          <Reveal variant="mask" className="lg:col-span-5">
            <figure>
              <div className="img-frame aspect-portrait w-full">
                <Image
                  src="/images/photos/cleared-garage-bay-after.jpg"
                  alt="A Redemption crew member finishing a cleared bay at the end of a cleanout."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-clean-white/45">
                A Redemption cleanout in Southeast Michigan. Founder portrait to come.
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Founder</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold">{business.founderName}</h2>
            </Reveal>

            <Reveal delay={140}>
              <blockquote className="mt-9 border-l-2 border-redemption-red pl-6">
                <p className="font-display text-subhead font-medium leading-snug text-clean-white">
                  &ldquo;{founderStory.pullQuote}&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-measure-lg text-body-base text-clean-white/72">
                {founderStory.shortVersion}
              </p>
            </Reveal>

            <Reveal delay={260}>
              {/* A plain list, not a description list — these are single
                  points with no paired definition. */}
              <ul className="mt-10 grid gap-x-10 gap-y-5 border-t border-clean-white/15 pt-8 sm:grid-cols-2">
                {founderStory.credibilityPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-redemption-red">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-clean-white/75">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={formatPhoneSmsHref()} className="btn-primary">
                  Talk With {firstName}
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </a>
                <Link href="/about" className="btn-on-dark">
                  Read the full story
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
