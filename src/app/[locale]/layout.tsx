import type {ReactNode} from "react";
import {DM_Sans} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {routing, type Locale} from "@/i18n/routing";
import {organizationJsonLd, websiteJsonLd} from "@/lib/json-ld";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans"
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

  const messages = await getMessages();

  return (
    <html lang={locale} className={dmSans.variable}>
      <body className="antialiased font-sans bg-slate-50 text-slate-800">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()])
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
