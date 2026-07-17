import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {localizedPath, navItems, siteConfig} from "@/lib/site";

type SiteFooterProps = {locale: Locale};

export async function SiteFooter({locale}: SiteFooterProps) {
  const t = await getTranslations({locale, namespace: "footer"});
  const tc = await getTranslations({locale, namespace: "common"});
  const tn = await getTranslations({locale, namespace: "nav"});

  return (
    <footer data-reveal className="bg-[#002a35] text-white">
      <div className="h-3 bg-[#ffda00]" />
      <div className="px-[clamp(16px,3vw,48px)] py-16 lg:py-24">
        <div className="grid gap-14 border-b border-white/20 pb-16 lg:grid-cols-[1.4fr_0.6fr_1fr]">
          <div>
            <Link href={localizedPath(locale, "/")} className="cargo-display inline-block text-[clamp(64px,9vw,140px)] leading-[0.72]">
              TOPONE<br /><span className="text-[#ffda00]">LOGISTIC</span>
            </Link>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55">{t("intro")}</p>
          </div>
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#ffda00]">{t("navigation")}</p>
            <ul className="border-t border-white/20">
              {navItems.map((item) => {
                const key = item.href === "/" ? "home" : item.href.slice(1);
                return (
                  <li key={item.href} className="border-b border-white/20 py-3">
                    <Link href={localizedPath(locale, item.href)} className="text-sm text-white/70 transition hover:text-[#ffda00]">
                      {tn(key as "home" | "services" | "routes" | "about" | "contact")}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#ffda00]">{t("contact")}</p>
            <a href={`mailto:${siteConfig.email}`} className="cargo-display block break-all text-[clamp(34px,4vw,58px)] transition hover:text-[#ffda00]">
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className="mt-5 block text-lg text-white/70 hover:text-white">{siteConfig.phoneDisplay}</a>
            <p className="mt-3 text-sm text-white/50">{tc("office")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/70 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} TOPONE LOGISTIC. All rights reserved.</p>
          <p>{siteConfig.legalName}</p>
          <p>{tc("representativeFooter")}</p>
        </div>
      </div>
    </footer>
  );
}
