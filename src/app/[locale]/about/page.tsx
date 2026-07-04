import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {createPageMetadata} from "@/lib/metadata";
import {siteConfig} from "@/lib/site";
import {siteImages} from "@/lib/site-images";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "about"});
  return createPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about"
  });
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "about"});
  const tc = await getTranslations({locale, namespace: "common"});

  const capabilities = ["capability1", "capability2", "capability3", "capability4"] as const;
  const values = ["value1", "value2", "value3"] as const;

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
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow={t("companyEyebrow")}
              title={t("companyTitle")}
              text={t("companyText")}
            />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-heading text-2xl font-bold text-slate-900">{t("founderTitle")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{t("founderText")}</p>
              <div className="mt-6 grid h-52 place-items-center rounded-xl border border-dashed border-amber-300/50 bg-white text-center text-sm font-semibold text-amber-600">
                {t("founderPhoto")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t("capabilityEyebrow")}
            title={t("capabilityTitle")}
            text={t("capabilityText")}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((key) => (
              <div key={key} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
                  <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-900">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <SectionHeading eyebrow={t("valuesEyebrow")} title={t("valuesTitle")} />
              <div className="grid gap-4 md:grid-cols-3">
                {values.map((key) => (
                  <div key={key} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="font-heading text-xl font-bold text-slate-900">{t(key)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("valueText")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-slate-800 text-white shadow-soft">
              <Image
                src={siteConfig.images.warehouse}
                alt="Warehouse operations at TopOne Logistics for China-origin freight"
                width={800}
                height={600}
                className="h-56 w-full object-cover opacity-84"
              />
              <div className="p-5">
                <p className="text-sm text-slate-400">{tc("representative")}</p>
                <h2 className="mt-3 font-heading text-2xl font-bold">{t("qualificationsTitle")}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{t("qualificationsText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
