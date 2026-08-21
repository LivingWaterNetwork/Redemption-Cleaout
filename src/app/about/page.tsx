import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { founderStory } from "@/content/founderStory";
import { business } from "@/content/business";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "About Redemption & Our Founder",
  description:
    "The story behind Redemption Cleanout Services and founder Dante Terracciano — 13 years of real-estate experience, a family background in home building, and a purpose-driven approach to property cleanouts in Rochester, Michigan.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <PageHero eyebrow="About" title="A modern heritage service brand, built on purpose" />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[280px_1fr]">
        <PhotoPlaceholder label={`${business.founderName} photo coming soon`} aspect="aspect-square" />
        <div>
          <h2 className="font-display text-2xl font-bold text-heritage-black">Our Story</h2>
          <p className="mt-4 max-w-2xl text-steel-gray">{founderStory.ourStoryVersion}</p>

          <h2 className="mt-10 font-display text-2xl font-bold text-heritage-black">
            Why &ldquo;Redemption&rdquo;
          </h2>
          <p className="mt-4 max-w-2xl text-steel-gray">
            The name isn&apos;t decoration — it&apos;s the strategy. A house or space
            buried in clutter, damage, or neglect can be restored to order and usable
            condition. A person facing grief, overwhelm, or a hard transition deserves a
            dependable guide through it, not judgment. That idea shapes how every
            project is handled, for every property and every family Redemption works
            with.
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold text-heritage-black">Our Approach</h2>
          <ul className="mt-4 space-y-2">
            {founderStory.credibilityPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-steel-gray">
                <span aria-hidden="true" className="mt-1 text-redemption-red">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction location="about_cta" headline="Talk With Dante" primaryLabel="Request a Property Walkthrough" variant="red" />
    </>
  );
}
