import Link from "next/link";
import { flagshipServices } from "@/content/services";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function FlagshipServices() {
  return (
    <section className="container-page py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Flagship Services</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
            Built for the big cleanouts
          </h2>
        </div>
        <Link href="/services" className="font-semibold text-redemption-red hover:underline">
          View all services &rarr;
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flagshipServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
