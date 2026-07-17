import {Ship, Plane, Truck, Anchor, FileCheck2, ShieldCheck} from "lucide-react";
import type {Locale} from "@/i18n/routing";

export const serviceCards = [
  {
    slug: "sea-fcl",
    icon: Ship,
    title: {en: "Sea FCL", zh: "整柜海运"},
    text: {
      en: "Booking, trucking, customs coordination, documentation, and destination handover for China-origin full container moves.",
      zh: "覆盖中国起运整柜订舱、拖车、报关协调、单证与目的港衔接。"
    }
  },
  {
    slug: "sea-lcl",
    icon: Anchor,
    title: {en: "Sea LCL", zh: "拼箱海运"},
    text: {
      en: "Consolidation support for smaller shipments with transparent origin-side coordination and confirmed details before booking.",
      zh: "面向小批量货物的拼箱协调，订舱前确认中国端操作细节。"
    }
  },
  {
    slug: "air-freight",
    icon: Plane,
    title: {en: "Air Freight", zh: "国际空运"},
    text: {
      en: "Air cargo coordination from China with route, airline, cutoff, and minimum chargeable details confirmed per shipment.",
      zh: "中国起运空运协调，航司、截单、最低计费等参数按具体货物确认。"
    }
  },
  {
    slug: "land-multimodal",
    icon: Truck,
    title: {en: "Land & Multimodal", zh: "陆运与多式联运"},
    text: {
      en: "Cross-border trucking, sea-rail, door moves, and multimodal support where scope is confirmed by shipment.",
      zh: "跨境陆运、海铁联运、门到门与多式联运支持，按具体货物确认范围。"
    }
  }
];

const routeSchedule = {
  en: "Varies by carrier — confirmed at quote",
  zh: "按船司与航次，询盘确认"
};

export const routeGroups = [
  {
    strength: true,
    market: {en: "Africa", zh: "非洲"},
    ports: {en: "Major ports across Africa", zh: "非洲主要港口"},
    schedule: routeSchedule
  },
  {
    strength: true,
    market: {en: "South America", zh: "南美"},
    ports: {en: "Major ports across South America", zh: "南美主要港口"},
    schedule: routeSchedule
  },
  {
    strength: true,
    market: {en: "Southeast Asia", zh: "东南亚"},
    ports: {en: "Major ports across Southeast Asia", zh: "东南亚主要港口"},
    schedule: routeSchedule
  },
  {
    strength: false,
    market: {en: "Europe & Mediterranean", zh: "欧洲与地中海"},
    ports: {en: "Major ports across Europe & Mediterranean", zh: "欧地主要港口"},
    schedule: routeSchedule
  },
  {
    strength: false,
    market: {en: "North & Central America", zh: "北美与中美"},
    ports: {en: "Major ports across North & Central America", zh: "北美与中美主要港口"},
    schedule: routeSchedule
  },
  {
    strength: false,
    market: {en: "Oceania", zh: "澳新"},
    ports: {en: "Major ports across Oceania", zh: "澳新主要港口"},
    schedule: routeSchedule
  }
];

export const trustItems = [
  {icon: ShieldCheck, label: {en: "NVOCC-registered", zh: "NVOCC 备案"}},
  {icon: FileCheck2, label: {en: "China-origin specialist", zh: "中国起运港代理"}},
  {icon: Anchor, label: {en: "18 years of freight experience", zh: "18 年货代行业经验"}}
];

export function t<T extends Record<Locale, string>>(value: T, locale: Locale) {
  return value[locale];
}
