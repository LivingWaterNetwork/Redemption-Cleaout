import Link from "next/link";
import Image from "next/image";
import { projects } from "@/content/projects";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Before-and-after proof. When matched same-angle pairs exist, this is the
 * page's biggest visual moment. Until then it shows the real work photos we
 * do have alongside an honest note about what is still being documented —
 * never a stock "transformation" pair.
 */
export function BeforeAfterSection() {
  const featured = projects[0];

  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHeader
          label="Proof"
          title="The condition it was in. The condition we leave it in."
          intro="Authentic documentation from real Redemption projects — no stock imagery, and nothing published without permission."
        />

        {featured ? (
          <Reveal className="mt-14">
            <BeforeAfterComparison
              beforeSrc={featured.beforeImage}
              afterSrc={featured.afterImage}
              beforeAlt={featured.beforeAlt}
              afterAlt={featured.afterAlt}
              label={featured.title}
            />
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
            <Reveal variant="mask" className="lg:col-span-7">
              <figure>
                <div className="img-frame aspect-panel w-full">
                  <Image
                    src="/images/photos/severe-clutter-basement-before.jpg"
                    alt="A basement filled with stored household goods and shelving before a severe-clutter cleanout."
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-steel-gray">
                  <span className="bg-heritage-black px-2 py-1 font-bold text-clean-white">
                    Before
                  </span>
                  A severe-clutter basement, scoped in person before any work began.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="frame-double">
                <div className="bg-warm-concrete p-8">
                  <p className="eyebrow-plain text-steel-gray">Asset needed</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-heritage-black">
                    Matched after-photos are being documented
                  </h3>
                  <p className="mt-4 text-body-base text-steel-gray">
                    Same-angle before and after pairs are the strongest proof this page can
                    carry. They&apos;ll appear here once each client&apos;s photo permission is
                    confirmed. We won&apos;t substitute stock transformations in the meantime.
                  </p>
                  <Link href="/projects" className="link-editorial mt-6">
                    See current work
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
