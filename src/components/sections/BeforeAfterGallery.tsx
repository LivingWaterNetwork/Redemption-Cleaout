import Image from "next/image";
import { beforeAfterSets } from "@/content/gallery";
import { Reveal } from "@/components/motion/Reveal";
import type { BeforeAfterPhoto, BeforeAfterSet } from "@/types/content";

/**
 * The /projects page body: every Before & After set, each photo shown whole at
 * its own aspect ratio with a Before or After label and no caption.
 *
 * Pairs sit side by side. A "project" set is laid out as a Before group above
 * an After group, so it never reads as frame-for-frame matching.
 */
export function BeforeAfterGallery() {
  return (
    <div className="space-y-20">
      {beforeAfterSets.map((set, index) => (
        <Reveal key={set.id} delay={index === 0 ? 0 : 60}>
          {set.kind === "pair" ? (
            <PairSet set={set} priority={index === 0} />
          ) : (
            <ProjectSet set={set} />
          )}
        </Reveal>
      ))}
    </div>
  );
}

type PairSetData = Extract<BeforeAfterSet, { kind: "pair" }>;
type ProjectSetData = Extract<BeforeAfterSet, { kind: "project" }>;

function PairSet({ set, priority }: { set: PairSetData; priority: boolean }) {
  const { before, after } = set;
  const portrait = before.height > before.width;

  return (
    <article
      aria-label="Before and after"
      className={`grid gap-4 sm:gap-6 ${portrait ? "mx-auto max-w-4xl grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}
    >
      <LabeledPhoto
        photo={before}
        label="Before"
        priority={priority}
        sizes={
          portrait ? "(min-width: 896px) 440px, 50vw" : "(min-width: 768px) 50vw, 100vw"
        }
      />
      <LabeledPhoto
        photo={after}
        label="After"
        priority={priority}
        sizes={
          portrait ? "(min-width: 896px) 440px, 50vw" : "(min-width: 768px) 50vw, 100vw"
        }
      />
    </article>
  );
}

function ProjectSet({ set }: { set: ProjectSetData }) {
  return (
    <article aria-label="Before and after" className="space-y-10 border-t border-heritage-black/12 pt-12">
      {(["Before", "After"] as const).map((label) => {
        const photos = label === "Before" ? set.before : set.after;
        return (
          <div key={label}>
            <p className="eyebrow">{label}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {photos.map((photo) => (
                <LabeledPhoto
                  key={photo.src}
                  photo={photo}
                  label={label}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              ))}
            </div>
          </div>
        );
      })}
    </article>
  );
}

function LabeledPhoto({
  photo,
  label,
  sizes,
  priority = false,
}: {
  photo: BeforeAfterPhoto;
  label: "Before" | "After";
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className="relative">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full bg-warm-concrete"
      />
      <figcaption className="absolute left-3 top-3">
        <BeforeAfterLabel label={label} />
      </figcaption>
    </figure>
  );
}

/** White on black for Before, white on Redemption Red for After — both pass contrast. */
export function BeforeAfterLabel({ label }: { label: "Before" | "After" }) {
  return (
    <span
      className={`inline-block px-3 py-1 font-condensed text-xs font-bold uppercase tracking-[0.16em] text-clean-white sm:text-sm ${
        label === "Before" ? "bg-heritage-black" : "bg-redemption-red"
      }`}
    >
      {label}
    </span>
  );
}
