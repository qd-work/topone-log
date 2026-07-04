import {readFileSync} from "fs";
import {join} from "path";
import type {Locale} from "@/i18n/routing";

export type Service = {
  slug: string;
  language: Locale;
  title: string;
  description: string;
  keywords: string[];
  category: "Sea FCL" | "Sea LCL" | "Air" | "Land";
  serviceSpecs: {
    origin: string;
    destination: string;
    transit: string;
    schedule: string;
    cutoff: string;
    minVolume: string;
    scope: string;
  };
  cargoTypes: string[];
  certifications: string[];
  images: string[];
  seo: {
    title: string;
    description: string;
  };
  faq: {question: string; answer: string}[];
  body?: string;
};

function readVeliteJson<T>(file: string): T[] {
  const path = join(process.cwd(), ".velite", file);
  return JSON.parse(readFileSync(path, "utf8")) as T[];
}

export function getAllServices() {
  return readVeliteJson<Service>("services.json");
}

export function getServices(locale: Locale) {
  return getAllServices().filter((service) => service.language === locale);
}

export function getService(locale: Locale, slug: string) {
  return getServices(locale).find((service) => service.slug === slug);
}
