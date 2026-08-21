import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";

/**
 * Real job photography pulled from the service content layer, so the
 * homepage never shows an image that isn't already approved for a service
 * page. Renders nothing if no service has an image yet.
 */
export function RecentWork() {
  const withImages = services.filter((s) => s.image).slice(0, 3);
  if (withImages.length === 0) return null;

  return (
    <section className="bg-heritage-black py-16 text-clean-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The Work</p>
            <h2 className="mt-1 font-display text-3xl font-bold">
              Real properties, real scope
            </h2>
          </div>
          <Link href="/projects" className="font-semibold text-redemption-red hover:underline">
            See more work &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {withImages.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group block">
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={service.image!.src}
                  alt={service.image!.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-redemption-red">
                {service.shortName}
              </h3>
              <p className="mt-1 text-sm text-clean-white/70">{service.image!.caption}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
