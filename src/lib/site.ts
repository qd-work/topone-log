import type {Locale} from "@/i18n/routing";
import {siteImages} from "@/lib/site-images";

export const siteConfig = {
  name: "TopOne Logistics",
  legalName: "Qianhao International Logistics Co., Ltd.",
  chineseName: "青岛千灏国际物流有限公司",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.toponelog.com",
  emailPlaceholder: "Contact details coming soon",
  office: "Qingdao, China",
  images: {
    hero: siteImages.hero,
    warehouse: siteImages.warehouse,
    yard: siteImages.yard,
    port: siteImages.port
  }
};

export const locales: Locale[] = ["en", "zh"];

export function localizedPath(locale: Locale, path = "/") {
  if (locale === "en") return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

export const navItems = [
  {href: "/", key: "nav.home"},
  {href: "/services", key: "nav.services"},
  {href: "/routes", key: "nav.routes"},
  {href: "/about", key: "nav.about"},
  {href: "/contact", key: "nav.contact"}
] as const;
