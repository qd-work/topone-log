import Link from "next/link";
import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {ArrowRight, FileText, ShieldCheck, Ship, Plane, Truck, Warehouse} from "lucide-react";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {InquiryCta} from "@/components/inquiry-cta";
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
    {key: "tabSea" as const, icon: Ship, href: "#sea-fcl"},
    {key: "tabAir" as const, icon: Plane, href: "#air-freight"},
    {key: "tabLand" as const, icon: Truck, href: "#land-multimodal"},
    {key: "tabCustoms" as const, icon: ShieldCheck, href: "#customs-declaration"}
  ];

  const supportServices = locale === "zh"
    ? [
        {
          slug: "customs-declaration",
          title: "报关支持",
          description: "根据单票确认的服务范围，提供出口报关、单证审核与合规协同支持。",
          category: "报关",
          cargoTypes: ["单证", "合规"],
          images: [siteImages.services.seaLcl]
        },
        {
          slug: "warehousing-support",
          title: "仓储与操作支持",
          description: "根据已确认的合作方与操作范围，协调货物装卸、贴标、分拣打包及集拼支持。",
          category: "配套服务",
          cargoTypes: ["集拼", "货物操作"],
          images: [siteConfig.images.warehouse]
        }
      ]
    : [
        {
          slug: "customs-declaration",
          title: "Customs Declaration",
          description: "Export customs declaration, document review, and compliance support where scope is confirmed.",
          category: "Customs",
          cargoTypes: ["Documentation", "Compliance"],
          images: [siteImages.services.seaLcl]
        },
        {
          slug: "warehousing-support",
          title: "Warehousing Support",
          description: "Cargo handling, labeling, pick & pack, and consolidation support within the confirmed partner scope.",
          category: "Support",
          cargoTypes: ["CFS", "Handling"],
          images: [siteConfig.images.warehouse]
        }
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
      <section className="bg-[#f1efe8]">
        <div className="cargo-section">
          <div className="mb-12 grid border-l border-t border-[#002a35] md:grid-cols-4">
            {tabs.map(({key, icon: Icon, href}, index) => (
              <a
                key={key}
                href={href}
                className={`flex h-20 items-center justify-center gap-3 border-b border-r border-[#002a35] text-xs font-bold uppercase tracking-[0.12em] ${
                  index === 0 ? "bg-[#ffda00] text-[#002a35]" : "bg-transparent text-[#002a35]"
                } transition-colors hover:bg-[#002a35] hover:text-white`}
              >
                <Icon size={22} />
                {t(key)}
              </a>
            ))}
          </div>
          <div className="grid border-l border-t border-[#002a35] md:grid-cols-2 lg:grid-cols-3">
            {[
              ...services,
              ...supportServices
            ].map((service, index) => {
              const display = serviceCards.find((item) => item.slug === service.slug);
              const Icon = display?.icon || (index === 4 ? ShieldCheck : Warehouse);
              const image = service.images?.[0] || siteConfig.images.hero;
              const title = display ? contentT(display.title, locale) : service.title;
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  data-depth
                  data-reveal
                  className="group relative scroll-mt-24 overflow-hidden border-b border-r border-[#002a35] bg-white"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={image}
                      alt={`${service.title || service.slug} freight forwarding from China`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002a35]/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 flex h-14 w-14 items-center justify-center bg-[#ffda00]">
                      {Icon ? <Icon className="text-[#002a35]" size={24} /> : null}
                    </div>
                  </div>
                  <div className="min-h-80 p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#6682c2]">{service.category}</p>
                    <h2 className="cargo-display zh-display zh-display-md mb-4 text-5xl text-[#002a35]">{title}</h2>
                    <p className="mb-5 leading-relaxed text-[#002a35]/60">{service.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {service.cargoTypes.map((cargo) => (
                        <span key={cargo} className="border border-[#002a35]/25 px-3 py-1 text-xs font-semibold text-[#002a35]/70">
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
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#002a35] transition-colors hover:text-[#6682c2]"
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
      <section className="bg-[#ffda00]">
        <div className="cargo-section">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading
              eyebrow={t("scopeEyebrow")}
              title={t("scopeTitle")}
              text={t("scopeText")}
            />
            <div className="grid border-l border-t border-[#002a35] md:grid-cols-5">
              {scopeItems.map(([key, Icon], index) => (
                <div
                  key={key}
                  data-depth
                  data-depth-strength="soft"
                  data-reveal
                  className="min-h-64 border-b border-r border-[#002a35] p-5 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-[#002a35] text-[#ffda00]">
                    <Icon size={24} />
                  </div>
                  <p className="cargo-display zh-display zh-display-sm break-words text-xl text-[#002a35] xl:text-2xl">
                    {index + 1}. {t(key)}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#002a35]/65">{t("scopePending")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <InquiryCta locale={locale} />
    </>
  );
}
