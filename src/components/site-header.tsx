"use client";

import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Menu, X} from "lucide-react";
import {useState} from "react";
import type {Locale} from "@/i18n/routing";
import {localizedPath, navItems, siteConfig} from "@/lib/site";
import {QuoteModal} from "@/components/quote-modal";

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={localizedPath(locale, "/")} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
              <span className="text-lg font-bold text-white">T1</span>
            </div>
            <div>
              <div className="font-semibold text-slate-900">{siteConfig.name}</div>
              <div className="text-xs uppercase tracking-wider text-slate-500">{t("common.tagline")}</div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(locale, item.href)}
                className="text-slate-700 transition-colors hover:text-amber-600"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={localizedPath(locale === "en" ? "zh" : "en", "/")}
              className="hidden items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 sm:flex"
              aria-label="Switch language"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx={12} cy={12} r={10} />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{locale === "en" ? "中文" : "EN"}</span>
            </Link>
            <QuoteModal triggerLabel={t("nav.quote")} />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-slate-200 pt-4 md:hidden">
            <div className="grid gap-1 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(locale, item.href)}
                  className="rounded-lg px-3 py-3 hover:bg-slate-50 hover:text-amber-600"
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href={localizedPath(locale === "en" ? "zh" : "en", "/")}
                className="rounded-lg px-3 py-3 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {locale === "en" ? "中文" : "English"}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
