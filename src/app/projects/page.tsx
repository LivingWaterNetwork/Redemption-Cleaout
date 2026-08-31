import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { CallToAction } from "@/components/ui/CallToAction";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { galleryPhotos } from "@/content/gallery";

export const metadata: Metadata = pageMetadata({
  title: "Previous Work",
  description:
    "Photographs from completed Redemption Cleanout Services jobs across Metro Detroit — full property cleanouts, estate and commercial clearing, and demolition.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Previous Work", path: "/projects" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Previous Work", href: "/projects" }]}
      />

      <PageHero
        eyebrow="Gallery"
        title="Previous Work"
        description={`${galleryPhotos.length} photographs from completed Redemption jobs across Metro Detroit — full property cleanouts, estate and commercial clearing, severe clutter, and demolition. Select any photo to view it full size.`}
        variant="image"
        image={{
          src: "/images/photos/metal-recycling-load-dropoff.jpg",
          alt: "A loaded Redemption trailer at a scrap-metal recycling facility during disposal of cleanout material.",
        }}
      />

      <section className="py-section">
        <div className="container-page">
          <PhotoGallery />
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
