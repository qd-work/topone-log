"use client";

import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Globe2, Menu, X} from "lucide-react";
import {useState} from "react";
import type {Locale} from "@/i18n/routing";
import {localizedPath, navItems, siteConfig} from "@/lib/site";
import {QuoteModal} from "@/components/quote-modal";

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <div className="container flex h-[60px] items-center justify-between gap-4">
        <Link href={localizedPath(locale, "/")} className="flex min-w-[190px] shrink-0 items-center gap-3">
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-xl font-black italic text-navy">
            T
            <span className="absolute right-2 top-2 h-6 w-1.5 rotate-12 rounded-full bg-gold" />
          </span>
          <span>
            <span className="block whitespace-nowrap text-base font-extrabold leading-tight">{siteConfig.name}</span>
            <span className="block whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white/62">
              China Freight Partner
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-white/86 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={localizedPath(locale, item.href)} className="hover:text-white">
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={localizedPath(locale === "en" ? "zh" : "en", "/")}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-white/15 px-3 text-sm text-white/80 hover:border-white/35 hover:text-white"
            aria-label="Switch language"
          >
            <Globe2 size={16} />
            {locale === "en" ? "中文" : "EN"}
          </Link>
          <QuoteModal triggerLabel={t("nav.quote")} />
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-white/15 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-navy px-4 pb-5 md:hidden">
          <nav className="container grid gap-2 py-4 text-sm font-semibold text-white/82">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(locale, item.href)}
                className="rounded-md px-3 py-3 hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link href={localizedPath(locale === "en" ? "zh" : "en", "/")} className="rounded-md px-3 py-3">
              {locale === "en" ? "中文" : "English"}
            </Link>
            <QuoteModal triggerLabel={t("nav.quote")} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
