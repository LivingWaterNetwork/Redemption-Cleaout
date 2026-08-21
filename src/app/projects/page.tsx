import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Project Gallery",
  description:
    "Authentic before-and-after project proof from Redemption Cleanout Services in Rochester, Michigan.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} />
      <PageHero
        eyebrow="Projects"
        title="Real properties, real proof"
        description="We publish authentic before-and-after documentation only — no stock or staged imagery, and never without permission."
      />
      <ProjectGallery />
      <CallToAction location="projects_cta" headline="Have a property that needs this kind of work?" variant="dark" />
    </>
  );
}
