import type {MetadataRoute} from "next";
import {locales, localizedPath, siteConfig} from "@/lib/site";
import {getAllServices} from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/services", "/routes", "/about", "/contact"];
  const servicePaths = getAllServices().map((service) => `/services/${service.slug}`);
  const paths = Array.from(new Set([...staticPaths, ...servicePaths]));

  return paths.flatMap((path) =>
    locales.map((locale) => {
      const enUrl = new URL(localizedPath("en", path), siteConfig.siteUrl).toString();
      const zhUrl = new URL(localizedPath("zh", path), siteConfig.siteUrl).toString();

      return {
        url: locale === "en" ? enUrl : zhUrl,
        alternates: {
          languages: {
            en: enUrl,
            zh: zhUrl,
            "x-default": enUrl
          }
        }
      };
    })
  );
}
