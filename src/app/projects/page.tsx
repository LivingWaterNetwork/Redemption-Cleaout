import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Before & After",
  description:
    "Before and after photos from Redemption Cleanout Services jobs across Metro Detroit — property cleanouts and demolition.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Before & After", path: "/projects" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Before & After", href: "/projects" },
        ]}
      />

      <PageHero
        eyebrow="Our work"
        title="Before & After"
        description="Cleanouts and demolition from completed Redemption jobs across Metro Detroit."
      />

      <section className="py-section">
        <div className="container-page">
          <BeforeAfterGallery />
        </div>
      </section>

      <CallToAction
        location="projects_cta"
        headline="Have a property that needs this kind of work?"
        supportingText="Send photos for a ballpark estimate over the phone. We'll come out and give you the final quote on site."
      />
    </>
  );
}
