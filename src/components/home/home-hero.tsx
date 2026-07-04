import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {siteImages} from "@/lib/site-images";
import {localizedPath} from "@/lib/site";

type HomeHeroProps = {
  locale: Locale;
};

export async function HomeHero({locale}: HomeHeroProps) {
  const t = await getTranslations({locale, namespace: "home"});
  const tc = await getTranslations({locale, namespace: "common"});

  return (
    <section className="relative overflow-hidden bg-slate-800">
      <div className="absolute inset-0">
        <Image
          src={siteImages.hero}
          alt="Shipping port with cranes"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-6 inline-block rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            {t("heroBadge")}
          </div>
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-white lg:text-5xl xl:text-6xl">
            <span>{t("heroTitle")}</span>
            <span className="text-amber-400">{t("heroTitleAccent")}</span>
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-300">{t("heroText")}</p>
          <div className="mb-12 flex flex-wrap gap-4">
            <Link
              href={localizedPath(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-amber-400"
            >
              <span>{t("heroQuote")}</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={localizedPath(locale, "/services")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              {t("heroServices")}
            </Link>
          </div>
          <div className="inline-flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-900/60 p-5 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
              <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white">{t("nvoccTitle")}</div>
              <div className="text-sm text-slate-400">{tc("nvoccPending")}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              [t("trustNvocc"), tc("verifiedOnly")],
              [t("trustChina"), tc("verifiedOnly")],
              [t("trustWca"), tc("verifiedOnly")],
              [t("trustForwarder"), t("trustForwarderSub")]
            ].map(([title, subtitle]) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                  <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="text-xs text-slate-400">{subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
