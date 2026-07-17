import type {Locale} from "@/i18n/routing";
import {localizedPath, siteConfig} from "@/lib/site";

export function organizationJsonLd() {
  const organizationId = new URL("/#organization", siteConfig.siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.chineseName,
    url: siteConfig.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: new URL(siteConfig.images.logo, siteConfig.siteUrl).toString(),
      width: 512,
      height: 512
    },
    email: siteConfig.email,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Qingdao",
      addressCountry: "CN"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      telephone: siteConfig.phoneHref.replace("tel:", ""),
      availableLanguage: ["English", "Chinese"]
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": new URL("/#website", siteConfig.siteUrl).toString(),
    name: siteConfig.name,
    alternateName: "TopOne",
    url: siteConfig.siteUrl,
    publisher: {"@id": new URL("/#organization", siteConfig.siteUrl).toString()},
    inLanguage: ["en", "zh-CN"]
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  slug: string;
}, locale: Locale) {
  const url = new URL(localizedPath(locale, `/services/${service.slug}`), siteConfig.siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    serviceType: service.title,
    provider: {
      "@id": new URL("/#organization", siteConfig.siteUrl).toString()
    },
    areaServed: {
      "@type": "Place",
      name: "China-origin international routes"
    }
  };
}

export function breadcrumbJsonLd(items: {name: string; url: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqPageJsonLd(faq: {question: string; answer: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
