import type { Metadata } from "next";
import { siteUrl } from "@/content/business";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Intrinsic size of `/images/og/default.png`. Declaring width and height lets
 * a scraper reserve the card before it fetches the image, which is what stops
 * a link preview rendering as a bare title on the first share. Update these
 * if the OG card is regenerated at a different size (see IMAGE_REQUIREMENTS.md
 * — it is due to be regenerated once a master vector logo exists).
 */
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_ALT = "Redemption Cleanout Services — property cleanouts in Rochester, Michigan";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage = "/images/og/default.png",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = {
    url: absoluteUrl(ogImage),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: OG_IMAGE_ALT,
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Redemption Cleanout Services",
      images: [image],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
