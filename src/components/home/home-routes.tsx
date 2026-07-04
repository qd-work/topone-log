import Image from "next/image";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {routeGroups, t} from "@/lib/content";
import {siteImages} from "@/lib/site-images";

type HomeRoutesProps = {
  locale: Locale;
};

const routeVisuals = [
  {image: siteImages.routes.africa, alt: "Container ship on international trade lane", marketIndex: 0},
  {image: siteImages.routes.southAmerica, alt: "Container terminal operations", marketIndex: 1},
  {image: siteImages.routes.southeastAsia, alt: "Port cranes and container handling", marketIndex: 2}
] as const;

export async function HomeRoutes({locale}: HomeRoutesProps) {
  const th = await getTranslations({locale, namespace: "home"});
  const tc = await getTranslations({locale, namespace: "common"});

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">{th("routesEyebrow")}</div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 lg:text-4xl">{th("routesTitle")}</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {routeVisuals.map((visual) => {
            const route = routeGroups[visual.marketIndex];
            return (
              <div
                key={visual.alt}
                className="group relative aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-80"
              >
                <Image
                  src={visual.image}
                  alt={visual.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-heading text-2xl font-bold text-white">{t(route.market, locale)}</h3>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col justify-center rounded-2xl bg-white p-6">
            <div className="mb-4 text-sm font-medium text-slate-500">{tc("alsoCovering")}</div>
            <div className="space-y-3">
              {routeGroups.slice(3).map((route) => (
                <div key={t(route.market, locale)} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-slate-700">{t(route.market, locale)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
