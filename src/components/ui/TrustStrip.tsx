const trustItems = [
  "13 years in real-estate sales experience",
  "Family background in real-estate brokerage and home building",
  "On-site quoting — accurate scope, not photo guesswork",
  "One accountable point of contact from walkthrough to completion",
];

export function TrustStrip() {
  return (
    <section aria-label="Why property owners and professionals choose Redemption" className="border-y border-warm-concrete bg-warm-concrete/40">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <p key={item} className="text-sm font-semibold text-heritage-black">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
