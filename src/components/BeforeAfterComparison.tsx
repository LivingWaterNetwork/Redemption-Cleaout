"use client";

import { useState } from "react";
import Image from "next/image";

type BeforeAfterComparisonProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
};

/**
 * Accessible before/after comparison. The slider is a real <input
 * type="range"> so it works with keyboard arrows and touch out of the box,
 * and a static side-by-side fallback is always rendered beneath it so the
 * comparison never depends on drag interaction alone.
 */
export function BeforeAfterComparison({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label,
}: BeforeAfterComparisonProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-warm-concrete">
        <Image src={afterSrc} alt={afterAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-redemption-red"
          style={{ left: `${position}%` }}
        />
      </div>
      <label className="mt-3 block text-sm font-semibold text-heritage-black" htmlFor={`${label}-slider`}>
        {label}: drag or use arrow keys to compare before and after
      </label>
      <input
        id={`${label}-slider`}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-2 w-full motion-reduce:transition-none"
        aria-valuetext={`${position}% before, ${100 - position}% after`}
      />
      <figcaption className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-heritage-black">Before</p>
          <div className="relative mt-1 aspect-[4/3] overflow-hidden border border-warm-concrete">
            <Image src={beforeSrc} alt={beforeAlt} fill sizes="50vw" className="object-cover" />
          </div>
        </div>
        <div>
          <p className="font-semibold text-heritage-black">After</p>
          <div className="relative mt-1 aspect-[4/3] overflow-hidden border border-warm-concrete">
            <Image src={afterSrc} alt={afterAlt} fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
