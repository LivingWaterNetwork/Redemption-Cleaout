import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * The home page's service index: estate cleanouts, junk removal, and
 * demolition, matching the hero's service line. Estate cleanouts and junk
 * removal are both handled under the cleanouts pillar page, so both link
 * there; demolition has its own page.
 */
const homeServices = [
  {
    name: "Estate Cleanouts",
    href: "/services/full-property-cleanouts",
    linkLabel: "Full Property Cleanouts",
    image: "/images/photos/estate-cleanout-driveway-staging.jpg",
    description:
      "Clearing an inherited or long-held home at the pace and with the privacy the situation calls for. Anything you flag is set aside, never thrown out by default, and we can work with executors and estate-sale companies.",
  },
  {
    name: "Junk Removal",
    href: "/services/full-property-cleanouts",
    linkLabel: "Full Property Cleanouts",
    image: "/images/photos/garage-cleanout-in-progress.jpg",
    description:
      "One garage, basement, or attic, a load of furniture and appliances, or every room of the property. Usable items are sorted for donation and recycling where practical.",
  },
  {
    name: "Demolition",
    href: "/services/demolition",
    linkLabel: "Demolition",
    image: "/images/photos/demolition-teardown-after-04.jpg",
    description:
      "Interior tear-outs, garages, decks, sheds, pole barns, and larger structures, with the debris hauled off by the same crew. A property that has to be emptied first is one job, not two.",
  },
];

export function FlagshipServices() {
  return (
    <section className="on-dark bg-heritage-black py-section text-clean-white">
      <div className="container-page">
        <SectionHeader
          label="Services"
          title="Where we can help"
          intro="Residential and commercial, anywhere in Metro Detroit."
          onDark
        />

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {homeServices.map((service, index) => (
            <Reveal key={service.name} delay={index * 90} className="h-full">
              <article className="flex h-full flex-col border-t border-clean-white/15 pt-8">
                <Link
                  href={service.href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block"
                >
                  <div className="img-frame aspect-editorial w-full">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 32vw, 100vw"
                      className="img-zoom object-cover"
                    />
                  </div>
                </Link>

                <h3 className="mt-7 font-display text-subhead font-semibold">
                  <Link
                    href={service.href}
                    className="transition-colors duration-micro hover:text-redemption-red"
                  >
                    {service.name}
                  </Link>
                </h3>

                <p className="mt-4 max-w-measure text-body-base text-clean-white/70">
                  {service.description}
                </p>

                <Link href={service.href} className="link-editorial mt-auto pt-8">
                  {service.linkLabel}
                  <span aria-hidden="true" className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
