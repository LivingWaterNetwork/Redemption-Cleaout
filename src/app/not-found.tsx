import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-4 py-16">
      <p className="eyebrow">404</p>
      <h1 className="text-3xl font-bold text-heritage-black sm:text-4xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="max-w-xl text-steel-gray">
        The page you&apos;re looking for may have moved. Try the links below, or reach out
        directly and we&apos;ll help you find what you need.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/services" className="btn-secondary">
          View Services
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
