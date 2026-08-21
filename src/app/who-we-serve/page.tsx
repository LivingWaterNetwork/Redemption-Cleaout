import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { audiences } from "@/content/audiences";

export const metadata: Metadata = pageMetadata({
  title: "Who We Serve",
  description:
    "Redemption Cleanout Services works with homeowners and families, realtors, estate-sale and probate professionals, property managers, investors, and commercial property professionals across Rochester, Michigan.",
  path: "/who-we-serve",
});

/** Consumer audiences read first; professional partners are grouped after. */
const CONSUMER_SLUGS = ["homeowners-and-families"];

export default function WhoWeServePage() {
  const consumer = audiences.filter((a) => CONSUMER_SLUGS.includes(a.slug));
  const professional = audiences.filter((a) => !CONSUMER_SLUGS.includes(a.slug));

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Who We Serve", path: "/who-we-serve" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Who We Serve", href: "/who-we-serve" }]}
      />

      <PageHero
        eyebrow="Who We Serve"
        title="Two audiences. Two very different conversations."
        description="The people living the situation, and the professionals who refer the work. Both need something different from a cleanout company."
      />

      {/* Consumer */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">The people living the situation</p>
          </Reveal>

          {consumer.map((audience) => (
            <Reveal key={audience.slug} delay={80}>
              <Link
                href={`/who-we-serve/${audience.slug}`}
                className="group mt-10 block border-y border-heritage-black/12 py-10"
              >
                <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
                  <h2 className="font-display text-section font-bold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red lg:col-span-5">
                    {audience.shortName}
                  </h2>
                  <div className="lg:col-span-7">
                    <p className="max-w-measure-lg text-body-lg text-steel-gray">
                      {audience.summary}
                    </p>
                    <span className="link-editorial mt-6">
                      How we help
                      <span aria-hidden="true" className="btn-arrow">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Professional partners */}
      <section className="bg-heritage-black py-section text-clean-white on-dark">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">The people who refer the work</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-3xl text-section font-bold">
              Reliable cleanout execution for properties that need to move forward.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-clean-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {professional.map((audience, index) => (
              <Reveal key={audience.slug} delay={index * 80}>
                <Link
                  href={`/who-we-serve/${audience.slug}`}
                  className="group flex h-full flex-col border-b border-clean-white/15 py-8 sm:pr-8"
                >
                  <h3 className="font-display text-xl font-semibold transition-colors duration-micro group-hover:text-redemption-red">
                    {audience.shortName}
                  </h3>
                  <p className="mt-3 flex-1 max-w-measure text-body-base text-clean-white/65">
                    {audience.summary}
                  </p>
                  <span className="link-editorial mt-6">
                    Learn more
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-12 max-w-measure-lg text-sm text-clean-white/60">
              Redemption doesn&apos;t pay referral fees. What partners get is a vendor who
              answers fast, documents scope, hits deadlines, and never leaves them explaining
              a problem to their own client.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        location="who_we_serve_overview_cta"
        headline="Discuss a referral partnership"
        primaryLabel="Discuss a Referral Partnership"
        supportingText="Tell us the kind of properties you handle and how you'd want the work coordinated. One accountable point of contact, from walkthrough to completion."
      />
    </>
  );
}
