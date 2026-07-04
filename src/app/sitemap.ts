import type {MetadataRoute} from "next";
import {locales, localizedPath, siteConfig} from "@/lib/site";
import {getAllServices} from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/services", "/routes", "/about", "/contact"];
  const servicePaths = getAllServices().map((service) => `/services/${service.slug}`);
  const paths = Array.from(new Set([...staticPaths, ...servicePaths]));

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: new URL(localizedPath(locale, path), siteConfig.siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7
    }))
  );
}
