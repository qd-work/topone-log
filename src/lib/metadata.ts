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
  const socialImage = new URL(siteConfig.images.social, siteConfig.siteUrl);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    applicationName: siteConfig.name,
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
      images: [
        {
          url: socialImage,
          width: 1718,
          height: 916,
          alt: "Container port operations for QianHao Logistics"
        }
      ],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    verification: googleVerification ? {google: googleVerification} : undefined
  };
}
