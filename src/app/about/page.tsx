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
    "Meet the people behind Redemption Cleanout Services — founder Dante Terracciano, his family, and the crew — and why every property deserves a fresh start. Estate cleanouts, junk removal, and demolition across Metro Detroit.",
  path: "/about",
});

const teamApproach = [
  {
    term: "Dependable communication",
    detail:
      "Calls and texts get answered, and you know what is happening from the walkthrough to the final cleanup.",
  },
  {
    term: "Respect for people and property",
    detail:
      "Your home or building is handled with care, and difficult situations are handled privately and without judgment.",
  },
  {
    term: "Thorough work",
    detail:
      "The job is finished completely, and the space is left in better condition than we found it.",
  },
];

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
        title="Every property deserves a fresh start."
        description="A house buried in clutter, damage, or neglect can be restored to order. A person facing grief, overwhelm, or a hard transition deserves a dependable guide through it."
        variant="image"
        image={{
          src: "/images/photos/branded-truck-dump-trailer-driveway.jpg",
          alt: "The Redemption truck and dump trailer staged in a residential driveway at the start of a cleanout.",
        }}
      />

      {/* Founder and family */}
      <section className="py-section">
        <div className="container-page grid items-start gap-x-14 gap-y-12 lg:grid-cols-12">
          <Reveal variant="mask" className="lg:col-span-5">
            <div className="img-frame aspect-[3/4] w-full">
              <Image
                src="/images/photos/about-family-portrait.jpg"
                alt="A smiling couple standing together indoors, the man in a Redemption Cleanout Services cap and shirt."
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Our story</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold text-heritage-black">
                {business.founderName}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 max-w-measure-lg text-body-lg text-heritage-black">
                {founderStory.ourStoryVersion}
              </p>
            </Reveal>
            {founderStory.whyRedemption.map((paragraph, index) => (
              <Reveal key={paragraph} delay={200 + index * 60}>
                <p className="mt-6 max-w-measure-lg text-body-lg text-steel-gray">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            <Reveal delay={320}>
              <ul className="border-heritage-black/12 mt-10 grid gap-x-10 gap-y-4 border-t pt-8 sm:grid-cols-2">
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

      {/* Team */}
      <section className="on-dark bg-heritage-black py-section text-clean-white">
        <div className="container-page grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">The crew</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section font-bold">The people who do the work</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-measure text-body-lg text-clean-white/80">
                The people in Redemption shirts at your property are the crew that clears
                it and hauls it away. Giving that crew real opportunity and room to grow
                is part of why Dante started the company.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-9 space-y-5 border-t border-clean-white/15 pt-8">
                {teamApproach.map((item) => (
                  <li key={item.term}>
                    <p className="font-condensed text-base font-bold uppercase tracking-wide">
                      {item.term}
                    </p>
                    <p className="mt-1.5 max-w-measure text-body-base text-clean-white/70">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="mask" delay={100} className="lg:col-span-7">
            <div className="img-frame aspect-[4/3] w-full">
              <Image
                src="/images/photos/about-team-at-trailer.jpg"
                alt="Two men in Redemption Cleanout Services shirts and caps standing in front of a branded Redemption dump trailer."
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
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
              What we hold ourselves to
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
        </div>
      </section>

      <CallToAction
        location="about_cta"
        headline="Talk with Dante"
        primaryLabel="Get a Free Estimate"
        supportingText="Call or text and you'll reach the person accountable for the work, not a call center."
      />
    </>
  );
}
