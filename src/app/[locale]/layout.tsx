import type {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {routing, type Locale} from "@/i18n/routing";
import {organizationJsonLd, websiteJsonLd} from "@/lib/json-ld";
import "../globals.css";

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
    <html lang={locale}>
      <body>
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
