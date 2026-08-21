import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RecentWork } from "@/components/sections/RecentWork";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Project Gallery",
  description:
    "Authentic project documentation from Redemption Cleanout Services in Rochester, Michigan — real properties, no stock imagery.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} />

      <PageHero
        eyebrow="Projects"
        title="Documented work, not a stock gallery"
        description="Photographs from real Redemption projects across Southeast Michigan. We publish nothing staged, and nothing identifying without permission."
        variant="image"
        image={{
          src: "/images/photos/metal-recycling-load-dropoff.jpg",
          alt: "A loaded Redemption trailer at a scrap-metal recycling facility during responsible disposal of cleanout material.",
        }}
      />

      <RecentWork />
      <ProjectGallery />

      <CallToAction
        location="projects_cta"
        headline="Have a property that needs this kind of work?"
        supportingText="Send the details and we'll schedule an on-site walkthrough to scope it properly."
      />
    </>
  );
}
