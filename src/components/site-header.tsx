"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useLocale} from "next-intl";
import {AnimatePresence, motion} from "motion/react";
import {ArrowUpRight, Menu, X} from "lucide-react";
import {useState} from "react";
import type {Locale} from "@/i18n/routing";
import {localizedPath} from "@/lib/site";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ChevronDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 8" className="h-2 w-3" fill="none">
      <path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";
  const isZh = locale === "zh";
  const targetLocale: Locale = isZh ? "en" : "zh";
  const languagePath = localizedPath(targetLocale, pathname.replace(/^\/zh(?=\/|$)/, "") || "/");

  const navGroups = [
    {
      label: isZh ? "服务" : "Services",
      href: localizedPath(locale, "/services"),
      description: isZh ? "按运输方式选择中国起运服务" : "Choose support by transport mode",
      children: [
        [isZh ? "整柜海运" : "Sea FCL", "/services/sea-fcl"],
        [isZh ? "拼箱海运" : "Sea LCL", "/services/sea-lcl"],
        [isZh ? "国际空运" : "Air Freight", "/services/air-freight"],
        [isZh ? "陆运与多式联运" : "Land & Multimodal", "/services/land-multimodal"]
      ]
    },
    {
      label: isZh ? "航线" : "Routes",
      href: localizedPath(locale, "/routes"),
      description: isZh ? "查看核心市场与覆盖区域" : "Review core markets and wider coverage",
      children: [
        [isZh ? "非洲" : "Africa", "/routes#africa"],
        [isZh ? "南美" : "South America", "/routes#south-america"],
        [isZh ? "东南亚" : "Southeast Asia", "/routes#southeast-asia"],
        [isZh ? "全部航线" : "All trade lanes", "/routes"]
      ]
    },
    {
      label: isZh ? "公司" : "Company",
      href: localizedPath(locale, "/about"),
      description: isZh ? "了解团队、流程与已验证资质" : "Meet the team, process, and verified credentials",
      children: [
        [isZh ? "公司简介" : "About TopOne", "/about"],
        [isZh ? "运营能力" : "Operating model", "/about#capabilities"],
        [isZh ? "资质信息" : "Qualifications", "/about#qualifications"],
        [isZh ? "联系我们" : "Contact", "/contact"]
      ]
    }
  ] as const;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${isHome ? "absolute inset-x-0 top-0" : "relative bg-[#6682c2]"} z-50 flex items-start justify-between`}
      style={{padding: "clamp(16px, 4vh, 40px) clamp(16px, 3vw, 48px) clamp(16px, 3vh, 28px)"}}
    >
      <motion.div
        className="relative z-50"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: EXPO_OUT}}
      >
        <Link
          href={localizedPath(locale, "/")}
          className="block uppercase tracking-[-0.01em]"
          style={{
            fontFamily: 'var(--font-barlow-condensed), Impact, "Arial Narrow", sans-serif',
            fontWeight: 800,
            fontSize: "clamp(22px, min(3.15vh, 2.32vw), 32px)",
            lineHeight: 0.9
          }}
          onClick={closeMenu}
        >
          <span className="block text-white">TOPONE</span>
          <span className="block text-[#ffda00]">LOGISTIC</span>
        </Link>
      </motion.div>

      <div className="hidden items-start gap-7 md:flex lg:gap-10">
        <nav className="flex items-center gap-7 lg:gap-10" aria-label="Primary navigation">
          {navGroups.map((group, index) => (
            <motion.div
              key={group.label}
              className="group relative pb-5"
              initial={{opacity: 0, y: -12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.12 + index * 0.08, ease: EXPO_OUT}}
            >
              <Link
                href={group.href}
                className="flex items-center gap-2 text-white transition hover:translate-x-0.5 hover:text-[#ffda00]"
                style={{fontSize: "clamp(15px, min(1.97vh, 1.45vw), 20px)"}}
              >
                {group.label}
                <ChevronDown />
              </Link>
              <div className="pointer-events-none absolute right-0 top-full w-80 translate-y-2 border-t-4 border-[#ffda00] bg-[#002a35] p-6 opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="mb-5 text-xs leading-relaxed text-white/50">{group.description}</p>
                <div className="border-t border-white/20">
                  {group.children.map(([label, href]) => (
                    <Link
                      key={href}
                      href={localizedPath(locale, href)}
                      className="flex items-center justify-between border-b border-white/20 py-3 text-sm text-white/80 transition hover:px-2 hover:text-[#ffda00]"
                    >
                      {label}<ArrowUpRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </nav>
        <Link
          href={localizedPath(locale, "/contact")}
          className="bg-[#ffda00] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#002a35] transition hover:bg-white"
        >
          {isZh ? "获取报价" : "Get a quote"}
        </Link>
        <Link
          href={languagePath}
          className="pt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70 hover:text-white"
        >
          {isZh ? "EN" : "中文"}
        </Link>
      </div>

      <button
        type="button"
        className="relative z-50 grid h-10 w-10 place-items-center text-white md:hidden"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-[#6682c2] px-6 pb-10 pt-28 md:hidden"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.25}}
          >
            {navGroups.map((group, groupIndex) => (
              <motion.div
                key={group.label}
                className="border-t border-white/35 py-5"
                initial={{opacity: 0, y: 18}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.08 + groupIndex * 0.08, ease: EXPO_OUT}}
              >
                <Link href={group.href} onClick={closeMenu} className="cargo-display zh-display zh-display-sm text-4xl text-white">
                  {group.label}
                </Link>
                <div className="mt-3 grid grid-cols-2 gap-x-5">
                  {group.children.map(([label, href]) => (
                    <Link key={href} href={localizedPath(locale, href)} onClick={closeMenu} className="py-2 text-sm text-white/70">
                      {label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
            <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
              <Link href={localizedPath(locale, "/contact")} onClick={closeMenu} className="bg-[#ffda00] px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#002a35]">
                {isZh ? "获取报价" : "Get a quote"}
              </Link>
              <Link href={languagePath} onClick={closeMenu} className="border border-white/40 px-5 py-4 text-xs font-bold text-white">
                {isZh ? "EN" : "中文"}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
