import Link from "next/link";
import { projects } from "@/content/projects";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProjectGallery({ limit }: { limit?: number }) {
  const visible = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="container-page py-16">
      <p className="eyebrow">Project Gallery</p>
      <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
        Before-and-after proof
      </h2>
      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Project photography is being gathered"
            description="Authentic before-and-after photos from completed Redemption projects will appear here once approved. We don't publish stock or staged imagery."
            action={
              <Link href="/request-walkthrough" className="btn-primary">
                Request a Property Walkthrough
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {visible.map((project) => (
            <div key={project.slug}>
              <BeforeAfterComparison
                beforeSrc={project.beforeImage}
                afterSrc={project.afterImage}
                beforeAlt={project.beforeAlt}
                afterAlt={project.afterAlt}
                label={project.title}
              />
              <h3 className="mt-3 font-display text-lg font-semibold text-heritage-black">
                {project.title}
              </h3>
              <p className="text-sm text-steel-gray">
                {project.city} &middot; {project.propertyType}
              </p>
              <p className="mt-2 text-sm text-steel-gray">{project.outcome}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
