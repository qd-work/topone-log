import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {InquiryCta} from "@/components/inquiry-cta";
import {routing, type Locale} from "@/i18n/routing";
import {routeGroups, t as contentT} from "@/lib/content";
import {createPageMetadata} from "@/lib/metadata";
import {siteConfig} from "@/lib/site";
import {siteImages} from "@/lib/site-images";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "routes"});
  return createPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/routes"
  });
}

export default async function RoutesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "routes"});
  const tc = await getTranslations({locale, namespace: "common"});

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
          <SectionHeading
            eyebrow={t("overviewEyebrow")}
            title={t("overviewTitle")}
            text={t("overviewText")}
          />
          <div className="grid border-l border-t border-[#002a35] md:grid-cols-2 lg:grid-cols-3">
            {routeGroups.map((route, index) => (
              <article
                key={contentT(route.market, locale)}
                id={["africa", "south-america", "southeast-asia", "europe-mediterranean", "north-central-america", "oceania"][index]}
                data-depth
                data-reveal
                className={`min-h-80 border-b border-r border-[#002a35] p-6 transition-colors ${
                  route.strength ? "bg-[#002a35] text-white" : "bg-transparent text-[#002a35] hover:bg-[#ffda00]"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    route.strength ? "text-[#ffda00]" : "text-[#6682c2]"
                  }`}
                >
                  {route.strength ? t("coreStrength") : t("alsoCovered")}
                </p>
                <div className="cargo-display mt-5 text-5xl">0{index + 1}</div>
                <h2 className="cargo-display zh-display zh-display-md mt-10 text-5xl">{contentT(route.market, locale)}</h2>
                <dl className="mt-6 grid gap-4 text-sm">
                  <div>
                    <dt className={route.strength ? "text-white/45" : "text-[#002a35]/50"}>{t("mainPorts")}</dt>
                    <dd className={route.strength ? "mt-1 text-white/75" : "mt-1 text-[#002a35]/75"}>
                      {contentT(route.ports, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt className={route.strength ? "text-white/45" : "text-[#002a35]/50"}>{t("transitSchedule")}</dt>
                    <dd className={route.strength ? "mt-1 text-white/75" : "mt-1 text-[#002a35]/75"}>
                      {contentT(route.schedule, locale)}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
      <InquiryCta locale={locale} />
    </>
  );
}
