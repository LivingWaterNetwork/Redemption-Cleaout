import Link from "next/link";
import type { ServiceDefinition } from "@/types/content";

export function ServiceCard({ service }: { service: ServiceDefinition }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col justify-between border border-warm-concrete bg-clean-white p-6 transition-colors hover:border-redemption-red"
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-heritage-black group-hover:text-redemption-red">
          {service.shortName}
        </h3>
        <p className="mt-2 text-sm text-steel-gray">{service.situation}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-redemption-red">
        Learn more <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}
