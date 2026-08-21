import Link from "next/link";
import { business, formatPhoneTelHref } from "@/content/business";
import { footerNav, legalNav } from "@/content/navigation";
import { approvedServiceAreas } from "@/content/serviceAreas";

export function Footer() {
  return (
    <footer className="border-t border-warm-concrete bg-heritage-black text-clean-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">{business.name}</p>
          <p className="mt-2 text-sm text-clean-white/70">{business.legalTagline}</p>
          <p className="mt-4 text-sm text-clean-white/70">{business.address.publicAreaDescription}</p>
          <a href={formatPhoneTelHref()} className="mt-1 block text-sm font-semibold hover:text-redemption-red">
            {business.phoneDisplay}
          </a>
          <a
            href={business.instagramUrl}
            className="mt-2 inline-block text-sm text-clean-white/70 hover:text-redemption-red"
          >
            {business.instagramHandle}
          </a>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-clean-white/80">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-redemption-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Service Areas</p>
          <ul className="mt-3 space-y-2 text-sm text-clean-white/80">
            {approvedServiceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/service-areas/${area.slug}`} className="hover:text-redemption-red">
                  {area.cityName}, {area.stateAbbr}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/service-areas" className="hover:text-redemption-red">
                All service areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-clean-white/80">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-redemption-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page border-t border-clean-white/10 py-6 text-xs text-clean-white/60">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
