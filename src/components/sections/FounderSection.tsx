import Link from "next/link";
import { founderStory } from "@/content/founderStory";
import { business } from "@/content/business";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function FounderSection() {
  return (
    <section className="container-page py-16">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
        <PhotoPlaceholder label={`${business.founderName} photo coming soon`} aspect="aspect-square" />
        <div>
          <p className="eyebrow">Founder</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
            {business.founderName}
          </h2>
          <p className="mt-4 max-w-2xl text-steel-gray">{founderStory.shortVersion}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {founderStory.credibilityPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-heritage-black">
                <span aria-hidden="true" className="mt-0.5 text-redemption-red">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link href="/about" className="mt-4 inline-block font-semibold text-redemption-red hover:underline">
            Read the full story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
