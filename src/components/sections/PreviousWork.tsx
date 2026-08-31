import Link from "next/link";
import Image from "next/image";
import { galleryPhotos } from "@/content/gallery";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Home-page strip pulling the first six photos from the gallery. The full set
 * lives on /projects — this is a preview, not a second library to maintain.
 */
export function PreviousWork() {
  const photos = galleryPhotos.slice(0, 6);
  if (photos.length === 0) return null;

  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHeader
          label="Previous Work"
          title="Properties we've cleared and structures we've taken down"
          intro="Photographs from completed Redemption jobs across Metro Detroit."
          action={
            <Link href="/projects" className="link-editorial">
              See the full gallery
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} variant="mask" delay={index * 70}>
              <Link href="/projects" className="group block">
                <div className="img-frame aspect-editorial w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-steel-gray">{photo.caption}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
