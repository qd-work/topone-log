import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
import {localizedPath, siteConfig} from "@/lib/site";

type MetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
};

export function createPageMetadata({
  locale,
  path = "/",
  title,
  description
}: MetadataInput): Metadata {
  const url = new URL(localizedPath(locale, path), siteConfig.siteUrl);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: new URL(localizedPath("en", path), siteConfig.siteUrl).toString(),
        zh: new URL(localizedPath("zh", path), siteConfig.siteUrl).toString(),
        "x-default": new URL(localizedPath("en", path), siteConfig.siteUrl).toString()
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{url: siteConfig.images.hero, width: 1200, height: 630}],
      locale,
      type: "website"
    }
  };
}
