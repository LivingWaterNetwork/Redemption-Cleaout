import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { business } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility Statement",
  description: "Accessibility statement for the Redemption Cleanout Services website.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Accessibility", path: "/accessibility" }])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Accessibility", href: "/accessibility" }]} />
      <PageHero eyebrow="Legal" title="Accessibility Statement" variant="light" />
      <article className="container-page max-w-measure-lg space-y-6 py-section text-body-base text-steel-gray">
        <p>
          {business.name} is committed to making this website usable by as many people
          as possible, including people using assistive technology. We aim to meet
          WCAG 2.2 Level AA guidelines, including keyboard navigation, visible focus
          indicators, semantic landmarks, sufficient color contrast, and descriptive
          alt text on images.
        </p>
        <p>
          If you encounter an accessibility barrier on this site, please let us know by
          phone or text at {business.phoneDisplay}, and we&apos;ll work to address it.
        </p>
      </article>
    </>
  );
}
