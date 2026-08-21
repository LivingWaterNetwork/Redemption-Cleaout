import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

/**
 * One dominant differentiator carries the section; the remaining four sit
 * beneath it as a paced two-column list. Deliberately not five equal cards.
 */
const lead = {
  title: "Real-estate understanding",
  body: "Dante's experience means the team understands closings, listing preparation, distressed properties, investor timelines, and professional communication. A cleanout is rarely the point — the property has somewhere to be next, and the schedule is usually already set.",
};

const supporting = [
  {
    title: "Capable execution",
    body: "Redemption is structured for complete-property projects — not merely isolated pickups.",
  },
  {
    title: "Clear communication",
    body: "Clients and professional partners know what happens next, what is included, and who is accountable.",
  },
  {
    title: "Respect for people and property",
    body: "Sensitive situations are handled without judgment or unnecessary exposure.",
  },
  {
    title: "Ready for what comes next",
    body: "The objective is not just removal. The property should be positioned for its next use, sale, renovation, occupancy, or transition.",
  },
];

export function WhyRedemption() {
  return (
    <section className="py-section">
      <div className="container-page">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          {/* Lead column */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Why Redemption</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-section-xl font-bold text-heritage-black">
                More than removal.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 font-condensed text-2xl font-bold uppercase tracking-wide text-redemption-red">
                {lead.title}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 max-w-measure-lg text-body-lg text-steel-gray">{lead.body}</p>
            </Reveal>
          </div>

          {/* Proof image */}
          <Reveal variant="mask" delay={200} className="lg:col-span-5">
            <div className="img-frame aspect-portrait w-full">
              <Image
                src="/images/photos/cleared-garage-bay-after.jpg"
                alt="A commercial bay cleared and swept at the end of a Redemption cleanout."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Supporting four */}
        <div className="mt-16 grid gap-x-14 gap-y-10 border-t border-heritage-black/12 pt-12 sm:grid-cols-2">
          {supporting.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <h3 className="font-display text-lg font-semibold text-heritage-black">
                {item.title}
              </h3>
              <p className="mt-3 max-w-measure text-body-base text-steel-gray">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
