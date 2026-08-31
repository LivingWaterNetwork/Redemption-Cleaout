import type { NavLink } from "@/types/content";
import { services } from "@/content/services";

/**
 * Kept deliberately short. Every entry here is a decision the visitor has to
 * make before they can call, so the bar holds the five destinations that
 * actually convert; everything else lives in the footer and the mobile menu.
 */
export const primaryNav: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
  },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Previous Work", href: "/projects" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

/**
 * Secondary destinations. Reachable from the mobile menu and the footer on
 * every page, but kept out of the desktop bar so the primary nav and the
 * estimate CTA never crowd or wrap at common desktop widths.
 */
export const secondaryNav: NavLink[] = [
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Full Property Cleanouts", href: "/services/full-property-cleanouts" },
  { label: "Demolition", href: "/services/demolition" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Previous Work", href: "/projects" },
  { label: "About", href: "/about" },
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
