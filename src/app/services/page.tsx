import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { flagshipServices, supportingServices } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Property Cleanout Services",
  description:
    "Full-property cleanouts, estate and inherited-property cleanouts, commercial cleanouts, foreclosure cleanouts, hoarding-related cleanouts, junk removal, move-out cleanouts, and light demolition in Rochester, Michigan.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />

      <PageHero
        eyebrow="Services"
        title="Full-property cleanouts, and everything around them"
        description="Redemption leads with complete-property work: estates, commercial spaces, foreclosures, and severe-clutter situations. We also handle the smaller jobs that come with them."
      />

      {/* Flagship — numbered editorial rows */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Flagship services</p>
          </Reveal>

          <div className="mt-12 border-t border-heritage-black/12">
            {flagshipServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 70}>
                <article className="group grid items-start gap-x-10 gap-y-6 border-b border-heritage-black/12 py-10 lg:grid-cols-12">
                  <div className="flex items-baseline gap-5 lg:col-span-5">
                    <span
                      aria-hidden="true"
                      className="font-display text-3xl font-bold leading-none tabular-nums text-heritage-black/45"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-heritage-black">
                      <Link
                        href={`/services/${service.slug}`}
                        className="transition-colors duration-micro hover:text-redemption-red"
                      >
                        {service.shortName}
                      </Link>
                    </h2>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="max-w-measure text-body-base text-steel-gray">
                      {service.situation}
                    </p>
                    <Link href={`/services/${service.slug}`} className="link-editorial mt-5">
                      Learn more
                      <span aria-hidden="true" className="btn-arrow">
                        &rarr;
                      </span>
                    </Link>
                  </div>

                  {service.image && (
                    <div className="lg:col-span-3">
                      <div className="img-frame aspect-editorial w-full">
                        <Image
                          src={service.image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 24vw, 100vw"
                          className="img-zoom object-cover"
                        />
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting */}
      <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Supporting services</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section font-bold text-heritage-black">
              Smaller jobs, same standard
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px border-t border-heritage-black/12 sm:grid-cols-2">
            {supportingServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 80}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col border-b border-heritage-black/12 py-8 sm:pr-10"
                >
                  <h3 className="font-display text-xl font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                    {service.shortName}
                  </h3>
                  <p className="mt-3 max-w-measure text-body-base text-steel-gray">
                    {service.situation}
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
            <p className="mt-12 max-w-measure-lg text-body-base text-steel-gray">
              Not sure which fits your situation?{" "}
              <Link
                href="/how-it-works"
                className="font-semibold text-heritage-black underline decoration-redemption-red decoration-2 underline-offset-4"
              >
                See how the process works
              </Link>{" "}
              — or request a walkthrough and we&apos;ll scope it with you.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        location="services_overview_cta"
        headline="Every property is scoped in person"
        supportingText="Photos alone misrepresent scope. An on-site walkthrough is how you get a number that holds."
      />
    </>
  );
}
