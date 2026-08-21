import Link from "next/link";

export type BreadcrumbTrailItem = { name: string; href: string };

export function Breadcrumbs({ items }: { items: BreadcrumbTrailItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-warm-concrete bg-clean-white">
      <ol className="container-page flex flex-wrap items-center gap-1 py-3 text-xs text-steel-gray">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="font-semibold text-heritage-black">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-redemption-red hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
