import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Image-led alternating editorial rows for the four flagship services, then a
 * compact list for the supporting ones. Deliberately not a three-column card
 * grid — the top four services carry the positioning and get the space.
 */
const FLAGSHIP_SLUGS = [
  "full-property-cleanouts",
  "estate-cleanouts",
  "commercial-cleanouts",
  "foreclosure-cleanouts",
];

export function FlagshipServices() {
  const flagship = FLAGSHIP_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );
  const supporting = services.filter((s) => !FLAGSHIP_SLUGS.includes(s.slug));

  return (
    <section className="bg-heritage-black py-section text-clean-white on-dark">
      <div className="container-page">
        <SectionHeader
          label="Flagship Services"
          title="Built for the properties other companies pass on"
          intro="Redemption leads with complete-property work — whole homes, estates, commercial spaces, and distressed properties, handled end to end."
          onDark
          action={
            <Link href="/services" className="link-editorial">
              All services
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          }
        />

        <div className="mt-16 space-y-px">
          {flagship.map((service, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <Reveal key={service.slug}>
                <article className="group grid items-center gap-x-12 gap-y-8 border-t border-clean-white/12 py-12 lg:grid-cols-12">
                  <div
                    className={`lg:col-span-5 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                  >
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

                  <div
                    className={`lg:col-span-7 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}
                  >
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
                      {service.weHandle.slice(0, 4).map((item) => (
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

        {/* Supporting services — compact, clearly secondary */}
        <Reveal>
          <div className="mt-16 border-t border-clean-white/12 pt-10">
            <p className="eyebrow-plain">Also handled</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {supporting.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-display text-base font-semibold text-clean-white/80 underline decoration-clean-white/20 decoration-1 underline-offset-[6px] transition-colors duration-micro hover:text-redemption-red hover:decoration-redemption-red"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
