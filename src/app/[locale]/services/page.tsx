import Link from "next/link";
import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {ArrowRight, FileText, ShieldCheck, Ship, Plane, Truck, Warehouse} from "lucide-react";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {serviceCards, t as contentT} from "@/lib/content";
import {createPageMetadata} from "@/lib/metadata";
import {getServices} from "@/lib/services";
import {localizedPath, siteConfig} from "@/lib/site";
import {siteImages} from "@/lib/site-images";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "services"});
  return createPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/services"
  });
}

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "services"});
  const tc = await getTranslations({locale, namespace: "common"});
  const serviceOrder = ["sea-fcl", "sea-lcl", "air-freight", "land-multimodal"];
  const services = getServices(locale).sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug));

  const tabs = [
    {key: "tabSea" as const, icon: Ship},
    {key: "tabAir" as const, icon: Plane},
    {key: "tabLand" as const, icon: Truck},
    {key: "tabCustoms" as const, icon: ShieldCheck}
  ];

  const scopeItems = [
    ["scope1", FileText],
    ["scope2", Truck],
    ["scope3", ShieldCheck],
    ["scope4", ShieldCheck],
    ["scope5", FileText]
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        text={t("heroText")}
        image={siteImages.port}
        caption={tc("representative")}
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-9 grid overflow-hidden rounded-t-2xl border-b border-amber-500 md:grid-cols-4">
            {tabs.map(({key, icon: Icon}, index) => (
              <div
                key={key}
                className={`flex h-16 items-center justify-center gap-3 font-bold ${
                  index === 0 ? "bg-amber-500 text-slate-900" : "bg-slate-50 text-slate-900"
                }`}
              >
                <Icon size={22} />
                {t(key)}
              </div>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ...services,
              ...[
                {
                  slug: "customs-declaration",
                  title: "Customs Declaration",
                  description:
                    "Export customs declaration, document review, and compliance support where scope is confirmed.",
                  category: "Customs",
                  cargoTypes: ["Documentation", "Compliance"],
                  images: [siteImages.services.seaLcl]
                },
                {
                  slug: "warehousing-support",
                  title: "Warehousing Support",
                  description:
                    "Cargo handling, labeling, pick & pack, and consolidation support pending confirmed partner scope.",
                  category: "Support",
                  cargoTypes: ["CFS", "Handling"],
                  images: [siteConfig.images.warehouse]
                }
              ]
            ].map((service, index) => {
              const display = serviceCards.find((item) => item.slug === service.slug);
              const Icon = display?.icon || (index === 4 ? ShieldCheck : Warehouse);
              const image = service.images?.[0] || siteConfig.images.hero;
              const title = display ? contentT(display.title, locale) : service.title;
              return (
                <div
                  key={service.slug}
                  className="group relative overflow-hidden rounded-2xl bg-slate-50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={image}
                      alt={`${service.title || service.slug} freight forwarding from China`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500">
                      {Icon ? <Icon className="text-white" size={24} /> : null}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-600">{service.category}</p>
                    <h2 className="mb-3 font-heading text-xl font-bold text-slate-900">{title}</h2>
                    <p className="mb-4 leading-relaxed text-slate-600">{service.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {service.cargoTypes.map((cargo) => (
                        <span key={cargo} className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                          {cargo}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={
                        service.slug.startsWith("sea") ||
                        service.slug.includes("freight") ||
                        service.slug.includes("multimodal")
                          ? localizedPath(locale, `/services/${service.slug}`)
                          : localizedPath(locale, "/contact")
                      }
                      className="inline-flex items-center gap-2 font-semibold text-amber-600 transition-colors hover:text-amber-700"
                    >
                      {tc("viewService")} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow={t("scopeEyebrow")}
              title={t("scopeTitle")}
              text={t("scopeText")}
            />
            <div className="grid gap-4 md:grid-cols-5">
              {scopeItems.map(([key, Icon], index) => (
                <div key={key} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400 bg-amber-500/10 text-amber-600">
                    <Icon size={24} />
                  </div>
                  <p className="font-bold text-slate-900">
                    {index + 1}. {t(key)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{t("scopePending")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
