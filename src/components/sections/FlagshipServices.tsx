import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * The two things Redemption does, as full-width alternating editorial rows.
 *
 * Previously eight services in a flagship/supporting split. The business is two
 * offerings — cleanouts and demolition — and the page now says so; the cleanout
 * types (estate, foreclosure, commercial, hoarding, move-out, junk removal) are
 * listed inside the cleanouts row rather than competing with it.
 */
export function FlagshipServices() {
  return (
    <section className="bg-heritage-black py-section text-clean-white on-dark">
      <div className="container-page">
        <SectionHeader
          label="What We Do"
          title="Two things, done completely"
          intro="Full property cleanouts and demolition — residential and commercial, anywhere in Metro Detroit. If a property needs to be emptied and then torn down, that's one job with one crew, not two contractors."
          onDark
        />

        <div className="mt-16 space-y-px">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 1;
            const highlights = service.categories
              ? service.categories.map((category) => category.name)
              : service.weHandle.slice(0, 6);

            return (
              <Reveal key={service.slug}>
                <article className="group grid items-center gap-x-12 gap-y-8 border-t border-clean-white/12 py-12 lg:grid-cols-12">
                  <div className={`lg:col-span-5 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                    <Link
                      href={`/services/${service.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="block"
                    >
                      <div className="img-frame aspect-editorial w-full">
                        {service.image ? (
                          <Image
                            src={service.image.src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="img-zoom object-cover"
                          />
                        ) : (
                          <div className="texture-concrete absolute inset-0 grid place-items-center border border-clean-white/10">
                            <span aria-hidden="true" className="text-2xl text-redemption-red">
                              ✳
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>

                  <div className={`lg:col-span-7 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-baseline gap-5">
                      <span
                        aria-hidden="true"
                        className="font-display text-numeral font-bold leading-none text-clean-white/35"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-subhead font-semibold">
                        <Link
                          href={`/services/${service.slug}`}
                          className="transition-colors duration-micro hover:text-redemption-red"
                        >
                          {service.shortName}
                        </Link>
                      </h3>
                    </div>

                    <p className="mt-5 max-w-measure-lg text-body-base text-clean-white/70">
                      {service.situation}
                    </p>

                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {highlights.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-clean-white/60">
                          <span aria-hidden="true" className="mt-0.5 text-redemption-red">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={`/services/${service.slug}`} className="link-editorial mt-8">
                      {service.shortName}
                      <span aria-hidden="true" className="btn-arrow">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
