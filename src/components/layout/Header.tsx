"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNav, secondaryNav } from "@/content/navigation";
import { business, formatPhoneTelHref } from "@/content/business";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-warm-concrete bg-clean-white">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${business.name} home`}>
          <Image
            src="/images/brand/logo-header@4x.png"
            alt={business.name}
            width={466}
            height={192}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {primaryNav.map((item) => (
              <li key={item.href} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 py-2 text-sm font-semibold uppercase tracking-wide text-heritage-black hover:text-redemption-red"
                      aria-expanded={openDropdown === item.label}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <span aria-hidden="true">▾</span>
                    </button>
                    {openDropdown === item.label && (
                      <ul className="absolute left-0 top-full min-w-[240px] border border-warm-concrete bg-clean-white py-2 shadow-card">
                        <li>
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm font-semibold text-redemption-red hover:bg-warm-concrete/40"
                          >
                            {item.label} Overview
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-heritage-black hover:bg-warm-concrete/40"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="py-2 text-sm font-semibold uppercase tracking-wide text-heritage-black hover:text-redemption-red"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={formatPhoneTelHref()}
            className="whitespace-nowrap text-sm font-semibold text-heritage-black hover:text-redemption-red"
            onClick={() => trackEvent({ name: "click_call", params: { location: "header" } })}
          >
            {business.phoneDisplay}
          </a>
          <Link
            href="/request-walkthrough"
            className="btn-primary whitespace-nowrap !px-5"
            onClick={() =>
              trackEvent({ name: "click_request_walkthrough", params: { location: "header" } })
            }
          >
            Request a Walkthrough
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-heritage-black lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {mobileOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="border-t border-warm-concrete bg-clean-white lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-base font-semibold text-heritage-black"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-4 flex flex-col gap-1 border-l border-warm-concrete pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-steel-gray"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-base font-semibold text-heritage-black"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/request-walkthrough"
                className="btn-primary w-full"
                onClick={() => setMobileOpen(false)}
              >
                Request a Walkthrough
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
