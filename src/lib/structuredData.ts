import { business, siteUrl } from "@/content/business";
import { absoluteUrl } from "@/lib/seo";
import type { ServiceDefinition, ServiceFAQ } from "@/types/content";

/**
 * LocalBusiness JSON-LD. Per the address safety rule, the street address is
 * omitted entirely while business.address.publicAddressEnabled is false —
 * never include it "for completeness" or as an approximate value.
 */
export function organizationJsonLd() {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: siteUrl,
    telephone: business.phoneDisplay,
    slogan: business.legalTagline,
    areaServed: business.serviceRegionSummary,
    sameAs: [business.instagramUrl],
  };

  if (business.address.publicAddressEnabled) {
    base.address = {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    };
  } else {
    base.address = {
      "@type": "PostalAddress",
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      addressCountry: "US",
    };
  }

  return base;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: siteUrl,
  };
}

export function webPageJsonLd(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
  };
}

export function serviceJsonLd(service: ServiceDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phoneDisplay,
    },
    areaServed: business.serviceRegionSummary,
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

export function faqPageJsonLd(faqs: ServiceFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd(title: string, description: string, path: string, publishedAt: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished: publishedAt,
    author: { "@type": "Organization", name: business.name },
  };
}
