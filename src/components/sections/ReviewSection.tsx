"use client";

import { testimonials } from "@/content/testimonials";
import { googleBusinessUrl, googleReviewUrl } from "@/content/business";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { trackEvent } from "@/lib/analytics";

/**
 * Reviews. Verified first-party content only: no invented quotes, no star
 * ratings, no aggregate figure, and no AggregateRating schema anywhere. When
 * nothing is configured this renders an honest state instead of filler.
 */
export function ReviewSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="border-y border-heritage-black/10 bg-warm-concrete py-section">
      <div className="container-page">
        <SectionHeader
          label="Reviews"
          title="What clients and partners say"
          intro={
            featured
              ? undefined
              : "We publish real reviews from real clients — nothing invented, and no rating we can't substantiate."
          }
        />

        {featured ? (
          <div className="mt-14 grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <blockquote className="border-l-2 border-redemption-red pl-7">
                <p className="font-display text-subhead font-medium leading-snug text-heritage-black">
                  &ldquo;{featured.quote}&rdquo;
                </p>
                <footer className="mt-6 font-condensed text-sm font-bold uppercase tracking-wide text-steel-gray">
                  {featured.authorLabel}
                  {featured.role && <span> &middot; {featured.role}</span>}
                  {featured.city && <span> &middot; {featured.city}</span>}
                </footer>
              </blockquote>
            </Reveal>

            {rest.length > 0 && (
              <div className="lg:col-span-5">
                {rest.slice(0, 3).map((testimonial, index) => (
                  <Reveal
                    key={testimonial.id}
                    delay={index * 90}
                    className="border-t border-heritage-black/12 py-6 first:border-t-0 first:pt-0"
                  >
                    <blockquote>
                      <p className="text-body-base text-steel-gray">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <footer className="mt-3 font-condensed text-xs font-bold uppercase tracking-wide text-heritage-black">
                        {testimonial.authorLabel}
                        {testimonial.role && <span> &middot; {testimonial.role}</span>}
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="frame-double max-w-2xl">
              <div className="bg-clean-white p-8">
                <p className="eyebrow-plain text-steel-gray">Being gathered</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-heritage-black">
                  Reviews are on the way
                </h3>
                <p className="mt-4 text-body-base text-steel-gray">
                  Redemption has grown on referrals rather than review volume — past clients
                  have offered to write one as soon as the Google listing is live. As they
                  land, they&apos;ll appear here word-for-word. Nothing on this page is
                  written by us.
                </p>
                {/* The review link is a write link from the Google Business Profile, so
                    this is the collection path, not a "read our reviews" link. */}
                {googleReviewUrl && (
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-7"
                    onClick={() => trackEvent({ name: "click_leave_review" })}
                  >
                    Leave a Google Review
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </a>
                )}
                {googleBusinessUrl && (
                  <a
                    href={googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial mt-6 block"
                    onClick={() => trackEvent({ name: "click_google_reviews" })}
                  >
                    See the Google listing
                    <span aria-hidden="true" className="btn-arrow">
                      &rarr;
                    </span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
