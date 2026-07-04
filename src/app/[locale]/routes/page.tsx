import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
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
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t("overviewEyebrow")}
            title={t("overviewTitle")}
            text={t("overviewText")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {routeGroups.map((route) => (
              <article
                key={contentT(route.market, locale)}
                className={`rounded-2xl border p-6 shadow-sm ${
                  route.strength ? "border-slate-700 bg-slate-800 text-white" : "border-slate-200 bg-slate-50"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    route.strength ? "text-amber-400" : "text-amber-600"
                  }`}
                >
                  {route.strength ? t("coreStrength") : t("alsoCovered")}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold">{contentT(route.market, locale)}</h2>
                <dl className="mt-6 grid gap-4 text-sm">
                  <div>
                    <dt className={route.strength ? "text-slate-400" : "text-slate-500"}>{t("mainPorts")}</dt>
                    <dd className={route.strength ? "mt-1 text-slate-200" : "mt-1 text-slate-700"}>
                      {contentT(route.ports, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt className={route.strength ? "text-slate-400" : "text-slate-500"}>{t("transitSchedule")}</dt>
                    <dd className={route.strength ? "mt-1 text-slate-200" : "mt-1 text-slate-700"}>
                      {contentT(route.schedule, locale)}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
