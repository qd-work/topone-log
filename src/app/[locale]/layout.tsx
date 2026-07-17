import type {ReactNode} from "react";
import {Barlow_Condensed, DM_Sans} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {SiteMotionEffects} from "@/components/site-motion-effects";
import {routing, type Locale} from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-barlow-condensed"
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const messages = await getMessages({locale});

  return (
    <html lang={locale} className={`${dmSans.variable} ${barlowCondensed.variable}`}>
      <body className="bg-[#f1efe8] font-sans text-[#002a35] antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteMotionEffects />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
