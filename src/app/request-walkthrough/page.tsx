import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JobberRequestForm } from "@/components/JobberRequestForm";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { business, formatPhoneSmsHref, formatPhoneTelHref } from "@/content/business";

export const metadata: Metadata = pageMetadata({
  title: "Request a Property Walkthrough",
  description:
    "Request a property walkthrough with Redemption Cleanout Services in Rochester, Michigan — or call or text (248) 321-9609 directly.",
  path: "/request-walkthrough",
});

export default function RequestWalkthroughPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Request a Walkthrough", path: "/request-walkthrough" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Request a Walkthrough", href: "/request-walkthrough" }]}
      />
      <PageHero
        eyebrow="Get Started"
        title="Request a Property Walkthrough"
        description="Full-property, estate, commercial, and larger jobs are quoted on-site for accuracy. Submit the request below, or call or text us directly — either way, here's what happens next."
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-xl font-bold text-heritage-black">What Happens Next</h2>
          <ol className="mt-4 space-y-3 text-steel-gray">
            <li>1. We review your request and reach out to confirm details.</li>
            <li>2. We schedule an on-site walkthrough at a time that works for you.</li>
            <li>3. You get a clear scope, timeline, and price before anything is booked.</li>
          </ol>
          <div className="mt-8">
            <JobberRequestForm />
          </div>
        </div>

        <aside className="border border-warm-concrete p-6">
          <h2 className="font-display text-lg font-bold text-heritage-black">Prefer to talk first?</h2>
          <p className="mt-2 text-sm text-steel-gray">
            Call or text {business.founderName.split(" ")[0]} directly.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a href={formatPhoneTelHref()} className="btn-primary">
              Call {business.phoneDisplay}
            </a>
            <a href={formatPhoneSmsHref()} className="btn-secondary">
              Text Us
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
