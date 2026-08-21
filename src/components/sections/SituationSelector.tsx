"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { situations } from "@/content/situations";
import { getServiceBySlug } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Situation-first entry point. On desktop this is a real tablist: selecting a
 * situation swaps the panel and its image. On mobile the same content
 * collapses into a disclosure list, so it stays usable without horizontal
 * scrolling or hidden tabs.
 *
 * Accessibility: desktop uses the roving-tabindex tab pattern with arrow-key
 * support; mobile uses native buttons with aria-expanded on each panel.
 */
export function SituationSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const baseId = useId();

  const active = situations[activeIndex]!;
  const activeService = getServiceBySlug(active.serviceSlug);
  const activeImage = activeService?.image;

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (activeIndex + 1) % situations.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (activeIndex - 1 + situations.length) % situations.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = situations.length - 1;
    }
    if (next !== null) {
      event.preventDefault();
      setActiveIndex(next);
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
    }
  }

  return (
    <section className="py-section">
      <div className="container-page">
        <div className="max-w-measure-lg">
          <Reveal>
            <p className="eyebrow">Start Here</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section font-bold text-heritage-black">
              What brings you here today?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-measure text-body-lg text-steel-gray">
              Tell us the situation and we&apos;ll point you to the right next step.
            </p>
          </Reveal>
        </div>

        {/* ---------- Desktop: tablist + changing panel ---------- */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div
            role="tablist"
            aria-label="Choose your situation"
            aria-orientation="vertical"
            className="lg:col-span-5"
          >
            {situations.map((situation, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={situation.id}
                  id={`${baseId}-tab-${index}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={onTabKeyDown}
                  className={`group flex w-full items-baseline gap-5 border-t border-heritage-black/12 py-6 text-left transition-colors duration-micro ease-editorial last:border-b ${
                    selected ? "text-redemption-red" : "text-heritage-black hover:text-redemption-red"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`font-condensed text-xs font-bold tabular-nums transition-colors ${
                      selected ? "text-restoration-red-dark" : "text-steel-gray"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold leading-snug">
                    {situation.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`btn-arrow shrink-0 transition-opacity ${
                      selected ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  >
                    &rarr;
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${activeIndex}`}
            tabIndex={0}
            className="lg:col-span-7"
          >
            <div className="img-frame aspect-panel w-full">
              {activeImage ? (
                <Image
                  // Keying on src makes React swap the node, so the new image
                  // fades in rather than mutating in place.
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="texture-concrete absolute inset-0 grid place-items-center bg-heritage-black">
                  <span aria-hidden="true" className="text-3xl text-redemption-red">
                    ✳
                  </span>
                </div>
              )}
            </div>
            <h3 className="mt-8 font-display text-subhead font-semibold text-heritage-black">
              {active.headline}
            </h3>
            <p className="mt-4 max-w-measure-lg text-body-base text-steel-gray">{active.body}</p>
            <Link href={`/services/${active.serviceSlug}`} className="link-editorial mt-7">
              {active.ctaLabel}
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* ---------- Mobile: stacked disclosures ---------- */}
        <div className="mt-10 lg:hidden">
          {situations.map((situation, index) => {
            const open = openMobile === index;
            const service = getServiceBySlug(situation.serviceSlug);
            return (
              <div key={situation.id} className="border-t border-heritage-black/12 last:border-b">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${baseId}-m-panel-${index}`}
                    onClick={() => setOpenMobile(open ? null : index)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left font-display text-base font-semibold text-heritage-black"
                  >
                    <span>{situation.label}</span>
                    <span aria-hidden="true" className="shrink-0 text-xl text-redemption-red">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={`${baseId}-m-panel-${index}`} hidden={!open} className="pb-6">
                  {service?.image && (
                    <div className="img-frame aspect-editorial w-full">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="mt-4 text-body-base text-steel-gray">{situation.body}</p>
                  <Link href={`/services/${situation.serviceSlug}`} className="link-editorial mt-5">
                    {situation.ctaLabel}
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
