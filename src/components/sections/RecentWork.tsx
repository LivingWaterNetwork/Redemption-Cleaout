import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Documented work, drawn from the service content layer so an image never
 * appears here before it is approved for a service page. Varied tile sizes
 * keep it reading as documentation rather than a uniform photo grid.
 */
export function RecentWork() {
  const withImages = services.filter((s) => s.image);
  if (withImages.length === 0) return null;

  // Three tiles keep the composition tight and avoid re-showing every image
  // already used by the flagship service rows above.
  const [lead, ...rest] = withImages.slice(0, 3);

  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHeader
          label="The Work"
          title="Real properties, real scope"
          intro="Photographs from completed Redemption projects across Southeast Michigan. Nothing staged, and nothing published without permission."
          action={
            <Link href="/projects" className="link-editorial">
              All projects
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Lead tile, deliberately larger */}
          {lead && (
            <Reveal variant="mask" className="lg:col-span-7">
              <Link href={`/services/${lead.slug}`} className="group block">
                <div className="img-frame aspect-panel w-full">
                  <Image
                    src={lead.image!.src}
                    alt={lead.image!.alt}
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                  {lead.shortName}
                </h3>
                <p className="mt-2 max-w-measure-lg text-body-base text-steel-gray">
                  {lead.image!.caption}
                </p>
              </Link>
            </Reveal>
          )}

          {/* Supporting tiles */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:content-between">
            {rest.map((service, index) => (
              <Reveal key={service.slug} delay={120 + index * 100}>
                <Link href={`/services/${service.slug}`} className="group block">
                  <div className="img-frame aspect-editorial w-full">
                    <Image
                      src={service.image!.src}
                      alt={service.image!.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                      className="img-zoom object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-heritage-black transition-colors duration-micro group-hover:text-redemption-red">
                    {service.shortName}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-gray">
                    {service.image!.caption}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Honest note on the limits of the current photo library. */}
        <Reveal>
          <p className="mt-12 max-w-measure-lg border-t border-heritage-black/12 pt-6 text-sm text-steel-gray">
            More project documentation — including matched before-and-after pairs — is being
            gathered and will be published here as client permissions are confirmed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
