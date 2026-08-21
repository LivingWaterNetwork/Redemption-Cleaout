import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { founderStory } from "@/content/founderStory";
import { business } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "About Redemption & Our Founder",
  description:
    "The story behind Redemption Cleanout Services and founder Dante Terracciano — 13 years of real-estate experience, a family background in home building, and a purpose-driven approach to property cleanouts in Rochester, Michigan.",
  path: "/about",
});

const values = [
  {
    term: "Redemption",
    detail: "We treat every property, and every project, as a second chance — not a write-off.",
  },
  {
    term: "Integrity",
    detail: "We quote honestly, show up when we say we will, and do the job the way we said we would.",
  },
  {
    term: "Stewardship",
    detail: "Client property, company equipment, and our team's time are things we're trusted to manage well.",
  },
  {
    term: "Responsiveness",
    detail: "We answer, quote, and schedule quickly — speed is part of the service, not an afterthought.",
  },
  {
    term: "Thoroughness",
    detail: "We finish the job completely and leave the space in better condition than we found it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <PageHero
        eyebrow="About"
        title="The name is not decoration. It is the strategy."
        description="A house buried in clutter, damage, or neglect can be restored to order. A person facing grief, overwhelm, or a hard transition deserves a dependable guide through it."
        variant="image"
        image={{
          src: "/images/photos/cleared-garage-bay-after.jpg",
          alt: "A cleared and swept space at the end of a Redemption cleanout.",
        }}
      />

      {/* Founder */}
      <section className="py-section">
        <div className="container-page grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <Reveal variant="mask" className="lg:col-span-5">
            <figure>
              <div className="img-frame aspect-portrait w-full">
                <Image
                  src="/images/photos/garage-cleanout-in-progress.jpg"
                  alt="Furniture and household items cleared from a garage during a Redemption cleanout."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-steel-gray">
                A Redemption cleanout in Southeast Michigan. Founder portrait to come.
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Founder</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                {business.founderName}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <blockquote className="mt-8 border-l-2 border-redemption-red pl-6">
                <p className="font-display text-subhead font-medium leading-snug text-heritage-black">
                  &ldquo;{founderStory.pullQuote}&rdquo;
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-measure-lg text-body-lg text-steel-gray">
                {founderStory.ourStoryVersion}
              </p>
            </Reveal>
            <Reveal delay={260}>
              <ul className="mt-10 grid gap-x-10 gap-y-4 border-t border-heritage-black/12 pt-8 sm:grid-cols-2">
                {founderStory.credibilityPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-body-base text-heritage-black">
                    <span aria-hidden="true" className="mt-1 shrink-0 text-redemption-red">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">How we operate</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-3xl text-section font-bold text-heritage-black">
              Five values, in operational language
            </h2>
          </Reveal>

          {/* Reveal renders the row itself, so each dt/dd pair sits in a
              single div directly inside the dl — required for valid markup. */}
          <dl className="mt-12 border-t border-heritage-black/12">
            {values.map((value, index) => (
              <Reveal
                key={value.term}
                delay={index * 70}
                className="grid gap-2 border-b border-heritage-black/12 py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10"
              >
                <dt className="font-condensed text-lg font-bold uppercase tracking-wide text-restoration-red-dark">
                  {value.term}
                </dt>
                <dd className="max-w-measure-lg text-body-base text-steel-gray">
                  {value.detail}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal>
            <p className="mt-8 max-w-measure-lg text-xs text-steel-gray">
              These values are drafted from the approved brand guide and are pending final
              leadership sign-off.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        location="about_cta"
        headline="Talk with Dante"
        primaryLabel="Request a Property Walkthrough"
        supportingText="Call or text and you'll reach the person accountable for the work, not a call center."
      />
    </>
  );
}
