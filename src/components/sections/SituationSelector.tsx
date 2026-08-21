import Link from "next/link";

const situations = [
  { label: "I'm handling an estate or inherited property", href: "/services/estate-cleanouts" },
  { label: "I'm downsizing or moving", href: "/services/move-out-cleanouts" },
  { label: "The property has severe clutter", href: "/services/hoarding-cleanouts" },
  { label: "This is a foreclosure or distressed property", href: "/services/foreclosure-cleanouts" },
  { label: "I need a commercial space cleared", href: "/services/commercial-cleanouts" },
  { label: "I just need some items removed", href: "/services/residential-junk-removal" },
];

export function SituationSelector() {
  return (
    <section className="container-page py-16">
      <h2 className="font-display text-3xl font-bold text-heritage-black">What brings you here today?</h2>
      <p className="mt-2 max-w-2xl text-steel-gray">
        Tell us your situation and we&apos;ll point you to the right next step.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {situations.map((situation) => (
          <Link
            key={situation.href}
            href={situation.href}
            className="flex items-center justify-between gap-3 border border-warm-concrete p-5 font-semibold text-heritage-black transition-colors hover:border-redemption-red hover:text-redemption-red"
          >
            {situation.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
