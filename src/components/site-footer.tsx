import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {localizedPath, navItems, siteConfig} from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
};

export async function SiteFooter({locale}: SiteFooterProps) {
  const t = await getTranslations({locale, namespace: "footer"});
  const tc = await getTranslations({locale, namespace: "common"});
  const tn = await getTranslations({locale, namespace: "nav"});

  return (
    <footer className="bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                <span className="text-lg font-bold text-white">T1</span>
              </div>
              <div>
                <div className="font-semibold text-white">{siteConfig.name}</div>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-400">{siteConfig.legalName}</p>
            <p className="mb-6 text-sm text-slate-400">{t("intro")}</p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2">
              <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm text-slate-300">{tc("nvoccBadge")}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">{t("navigation")}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => {
                const key = item.href === "/" ? "home" : item.href.slice(1);
                return (
                  <li key={item.href}>
                    <Link href={localizedPath(locale, item.href)} className="text-slate-400 transition-colors hover:text-white">
                      {tn(key as "home" | "services" | "routes" | "about" | "contact")}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 font-semibold text-white">{t("contact")}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-400">{tc("office")}</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href={`mailto:${siteConfig.email}`} className="text-slate-400 transition-colors hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href={siteConfig.phoneHref} className="text-slate-400 transition-colors hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} TopOne Logistics. All rights reserved.</p>
          <p className="text-xs text-slate-500">{tc("representativeFooter")}</p>
        </div>
      </div>
    </footer>
  );
}
