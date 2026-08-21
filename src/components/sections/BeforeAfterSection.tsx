import Link from "next/link";
import Image from "next/image";
import { projects } from "@/content/projects";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Before-and-after proof. Once projects.ts carries verified entries this
 * renders the identical-angle slider. Until then it shows a real documented
 * before/after pair side by side, plus an honest note on what is still
 * outstanding — never a stock "transformation" pair.
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
          /* No projects.ts entry yet — city, scope and outcome details are still
             unverified and per-property photo permission is outstanding. So this
             shows a real documented pair side by side rather than the slider,
             which only reads correctly on identical-angle framing. */
          <div className="mt-14">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Reveal variant="mask">
                <figure>
                  <div className="img-frame aspect-editorial w-full">
                    <Image
                      src="/images/photos/garage-cleanout-crew-sorting-before.jpg"
                      alt="A garage packed to the door line with stored goods, lumber and equipment while the Redemption crew sorts it."
                      fill
                      sizes="(min-width: 640px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-steel-gray">
                    <span className="bg-heritage-black px-2 py-1 font-bold text-clean-white">
                      Before
                    </span>
                    Sorted on site, before anything left the property.
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal variant="mask" delay={120}>
                <figure>
                  <div className="img-frame aspect-editorial w-full">
                    <Image
                      src="/images/photos/garage-cleanout-cleared-bay-after.jpg"
                      alt="The same garage cleared to bare floor and swept at the end of the cleanout."
                      fill
                      sizes="(min-width: 640px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-steel-gray">
                    <span className="bg-redemption-red px-2 py-1 font-bold text-clean-white">
                      After
                    </span>
                    The same bay, cleared to the floor and swept.
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal>
              <p className="border-heritage-black/12 mt-10 max-w-measure-lg border-t pt-6 text-sm text-steel-gray">
                Further matched pairs are documented on site as each project runs, and are
                published here once the property owner&apos;s written permission is
                confirmed. We won&apos;t substitute stock transformations in the meantime.{" "}
                <Link href="/projects" className="link-editorial">
                  See current work
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
