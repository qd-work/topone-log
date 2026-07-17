import type {Locale} from "@/i18n/routing";
import {siteImages} from "@/lib/site-images";

export const siteConfig = {
  name: "TopOne Logistic",
  legalName: "QINGDAO QIANHAO INTERNATIONAL LOGISTICS CO.,LTD",
  chineseName: "青岛千灏国际物流有限公司",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.toponelog.com",
  email: "qianhao001@toponelog.com",
  phone: "13705326028",
  phoneDisplay: "+86 137 0532 6028",
  phoneHref: "tel:+8613705326028",
  office: "Qingdao, China",
  images: {
    logo: "/icon.svg",
    social: "/images/topone-port-hero.jpg",
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
