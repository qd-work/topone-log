import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {HomeHero} from "@/components/home/home-hero";
import {HomeRoutes} from "@/components/home/home-routes";
import {HomeServices} from "@/components/home/home-services";
import {HomeWhy} from "@/components/home/home-why";
import {HomeWorkflow} from "@/components/home/home-workflow";
import {routing, type Locale} from "@/i18n/routing";
import {organizationJsonLd, websiteJsonLd} from "@/lib/json-ld";
import {createPageMetadata} from "@/lib/metadata";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "home"});
  return createPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/"
  });
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;

  return (
    <>
      {locale === "en" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()])
          }}
        />
      ) : null}
      <HomeHero locale={locale} />
      <HomeServices locale={locale} />
      <HomeRoutes locale={locale} />
      <HomeWhy locale={locale} />
      <HomeWorkflow locale={locale} />
    </>
  );
}
