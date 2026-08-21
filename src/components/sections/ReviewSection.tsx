import { testimonials } from "@/content/testimonials";
import { googleReviewUrl } from "@/content/business";
import { EmptyState } from "@/components/ui/EmptyState";

export function ReviewSection() {
  return (
    <section className="bg-warm-concrete/30 py-16">
      <div className="container-page">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
          What clients and partners say
        </h2>
        {testimonials.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Authentic reviews are being gathered"
              description="We only publish real reviews from real clients — nothing invented. Check back soon, or view Redemption's Google Business Profile directly."
              action={
                googleReviewUrl ? (
                  <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    View Google Reviews
                  </a>
                ) : undefined
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="border border-warm-concrete bg-clean-white p-6">
                <p className="text-steel-gray">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-heritage-black">
                  {testimonial.authorLabel}
                  {testimonial.role && <span className="text-steel-gray"> &middot; {testimonial.role}</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
