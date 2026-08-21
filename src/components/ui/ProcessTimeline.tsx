import type { ProcessStep } from "@/types/content";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative border-t-4 border-redemption-red pt-4">
          <span className="font-display text-sm font-bold text-redemption-red">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 font-display text-lg font-semibold text-heritage-black">{step.title}</h3>
          <p className="mt-2 text-sm text-steel-gray">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
