import type { NavLink } from "@/types/content";
import { services } from "@/content/services";
import { audiences } from "@/content/audiences";

export const primaryNav: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
  },
  {
    label: "Who We Serve",
    href: "/who-we-serve",
    children: audiences.map((a) => ({ label: a.shortName, href: `/who-we-serve/${a.slug}` })),
  },
  { label: "Service Areas", href: "/service-areas" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

/**
 * Secondary destinations. Reachable from the mobile menu and the footer on
 * every page, but kept out of the desktop bar so the primary nav and the
 * walkthrough CTA never crowd or wrap at common desktop widths.
 */
export const secondaryNav: NavLink[] = [
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Who We Serve", href: "/who-we-serve" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Website-Use Notice", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility" },
];
