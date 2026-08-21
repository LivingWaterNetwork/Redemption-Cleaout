import type { ProcessStep } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Connected process timeline. A single continuous rule runs behind the steps
 * (horizontal on desktop, vertical on mobile) so the sequence reads as one
 * forward movement rather than a row of separate columns.
 */
export function ProcessTimeline({
  steps,
  onDark = false,
}: {
  steps: ProcessStep[];
  onDark?: boolean;
}) {
  const line = onDark ? "bg-clean-white/15" : "bg-heritage-black/12";
  const numeral = onDark ? "text-clean-white/12" : "text-heritage-black/10";
  const heading = onDark ? "text-clean-white" : "text-heritage-black";
  const bodyText = onDark ? "text-clean-white/65" : "text-steel-gray";
  const dotRing = onDark ? "bg-heritage-black" : "bg-clean-white";

  return (
    <div className="relative">
      {/* Continuous connector */}
      <span
        aria-hidden="true"
        className={`absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px md:left-0 md:top-[7px] md:h-px md:w-full ${line}`}
      />

      {/* The ol is the grid itself, so it directly contains only li elements. */}
      <ol className="grid gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-5 lg:gap-x-8">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 100} as="li" className="relative pl-9 md:pl-0 md:pt-9">
            {/* Node */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full md:top-0 ${dotRing}`}
            >
              <span className="h-[9px] w-[9px] rounded-full bg-redemption-red" />
            </span>

            <span
              aria-hidden="true"
              className={`block font-display text-2xl font-bold leading-none tabular-nums ${numeral}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={`mt-2.5 font-display text-lg font-semibold ${heading}`}>{step.title}</h3>
            <p className={`mt-2.5 text-sm leading-relaxed ${bodyText}`}>{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
