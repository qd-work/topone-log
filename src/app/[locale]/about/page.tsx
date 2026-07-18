import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {InquiryCta} from "@/components/inquiry-cta";
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
      <section className="bg-[#f1efe8]">
        <div className="cargo-section">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow={t("companyEyebrow")}
              title={t("companyTitle")}
              text={t("companyText")}
            />
            <div data-depth data-depth-strength="soft" data-reveal className="border-l-8 border-[#ffda00] bg-white p-7 lg:p-10">
              <h2 className="cargo-display zh-display zh-display-md text-5xl text-[#002a35]">{t("founderTitle")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#002a35]/65">{t("founderText")}</p>
              <div className="mt-8 grid min-h-52 grid-cols-[auto_1fr] items-end gap-6 bg-[#ffda00] p-7 text-[#002a35]">
                <span className="cargo-display text-[clamp(6rem,10vw,9rem)] leading-[0.72]">18</span>
                <span className="max-w-48 border-l border-[#002a35]/35 pl-5 text-xs font-bold uppercase leading-5 tracking-[0.16em]">
                  {t("founderPhoto")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 bg-[#ffda00]">
        <div className="cargo-section">
          <SectionHeading
            eyebrow={t("capabilityEyebrow")}
            title={t("capabilityTitle")}
            text={t("capabilityText")}
          />
          <div className="grid border-l border-t border-[#002a35] md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((key, index) => (
              <div
                key={key}
                data-depth
                data-depth-strength="soft"
                data-reveal
                className="min-h-52 border-b border-r border-[#002a35] p-6"
              >
                <div className="cargo-display text-5xl text-[#6682c2]">0{index + 1}</div>
                <p className="mt-16 text-sm font-bold leading-6 text-[#002a35]">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#002a35] text-white">
        <div className="cargo-section">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <SectionHeading eyebrow={t("valuesEyebrow")} title={t("valuesTitle")} light />
              <div className="grid border-l border-t border-white/25 md:grid-cols-3">
                {values.map((key) => (
                  <div
                    key={key}
                    data-depth
                    data-depth-strength="soft"
                    data-reveal
                    className="border-b border-r border-white/25 p-6"
                  >
                    <h3 className="cargo-display zh-display zh-display-sm text-4xl text-[#ffda00]">{t(key)}</h3>
                    <p className="mt-5 text-sm leading-relaxed text-white/60">{t("valueText")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              id="qualifications"
              data-depth
              data-reveal
              className="scroll-mt-24 overflow-hidden border-t-8 border-[#ffda00] bg-[#6682c2] text-white"
            >
              <Image
                src={siteConfig.images.warehouse}
                alt="Warehouse operations at QianHao Logistics for China-origin freight"
                width={800}
                height={600}
                className="h-56 w-full object-cover opacity-84"
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/50">{tc("representative")}</p>
                <h2 className="cargo-display zh-display zh-display-md mt-4 text-4xl">{t("qualificationsTitle")}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{t("qualificationsText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <InquiryCta locale={locale} />
    </>
  );
}
