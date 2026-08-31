"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "@/content/gallery";

/**
 * The full job-photo library in one grid, with a lightbox.
 *
 * Deliberately flat: no per-project pages, no filters, no detail routes. New
 * photography is published by adding an entry to src/content/gallery.ts, which
 * is the only step the owner's photo drops require.
 *
 * Accessibility: every tile is a real button, the lightbox is a modal dialog
 * that traps Escape and arrow keys, focus moves to the close control on open
 * and returns to the originating tile on close, and the underlying page is
 * hidden from assistive tech while it is open.
 */
export function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + delta + galleryPhotos.length) % galleryPhotos.length,
    );
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : galleryPhotos[openIndex];

  return (
    <>
      <ul
        aria-hidden={active !== null}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {galleryPhotos.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              onClick={() => setOpenIndex(index)}
              className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-redemption-red"
            >
              <span className="img-frame aspect-editorial block w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading={index < 6 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                  className="img-zoom object-cover"
                />
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-steel-gray">
                {photo.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${(openIndex ?? 0) + 1} of ${galleryPhotos.length}: ${active.caption}`}
          className="fixed inset-0 z-50 flex flex-col bg-heritage-black/95 p-4 sm:p-8"
        >
          {/* Clicking the backdrop closes; it is not the only way out. */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative flex items-center justify-between gap-4">
            <p className="font-condensed text-sm font-bold uppercase tracking-[0.16em] text-clean-white/60">
              {(openIndex ?? 0) + 1} / {galleryPhotos.length}
            </p>
            <button
              type="button"
              ref={closeRef}
              onClick={close}
              className="border border-clean-white/30 px-4 py-2 font-condensed text-sm font-bold uppercase tracking-[0.16em] text-clean-white transition-colors duration-micro hover:border-redemption-red hover:text-redemption-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redemption-red"
            >
              Close
            </button>
          </div>

          <div className="relative mt-4 min-h-0 flex-1">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="relative mt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="border border-clean-white/30 px-4 py-2 font-condensed text-sm font-bold uppercase tracking-[0.16em] text-clean-white transition-colors duration-micro hover:border-redemption-red hover:text-redemption-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redemption-red"
            >
              &larr; <span className="sr-only">Previous photo</span>
            </button>
            <p className="max-w-measure text-center text-sm text-clean-white/75">
              {active.caption}
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              className="border border-clean-white/30 px-4 py-2 font-condensed text-sm font-bold uppercase tracking-[0.16em] text-clean-white transition-colors duration-micro hover:border-redemption-red hover:text-redemption-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redemption-red"
            >
              <span className="sr-only">Next photo</span> &rarr;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
