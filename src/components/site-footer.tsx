import Link from "next/link";
import {Mail, MapPin, ShieldCheck} from "lucide-react";
import type {Locale} from "@/i18n/routing";
import {localizedPath, navItems, siteConfig} from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
};

const navLabels: Record<Locale, Record<string, string>> = {
  en: {home: "Home", services: "Services", routes: "Routes", about: "About", contact: "Contact"},
  zh: {home: "首页", services: "服务", routes: "航线", about: "关于", contact: "联系"}
};

export function SiteFooter({locale}: SiteFooterProps) {
  return (
    <footer className="bg-navy text-white">
      <div className="container grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-white font-black text-navy">T1</span>
            <div>
              <p className="font-extrabold">{siteConfig.name}</p>
              <p className="text-sm text-white/60">{siteConfig.legalName}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/68">
            Your reliable China freight forwarding partner for overseas forwarders.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/12 px-3 py-2 text-xs text-white/70">
            <ShieldCheck size={15} /> NVOCC confirmed · WCA: joining
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/45">Navigation</p>
          <div className="grid gap-3 text-sm text-white/70">
            {navItems.map((item) => {
              const key = item.href === "/" ? "home" : item.href.slice(1);
              return (
                <Link key={item.href} href={localizedPath(locale, item.href)} className="hover:text-white">
                  {navLabels[locale][key]}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/45">Contact</p>
          <div className="grid gap-3 text-sm text-white/70">
            <p className="flex gap-2"><MapPin size={16} /> Qingdao, China</p>
            <p className="flex gap-2"><Mail size={16} /> TODO: customer confirms company email</p>
            <p>TODO: customer confirms WhatsApp / Skype / LinkedIn</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TopOne Logistics. All rights reserved.</p>
          <p>Representative visuals are placeholders until real photos are provided.</p>
        </div>
      </div>
    </footer>
  );
}
