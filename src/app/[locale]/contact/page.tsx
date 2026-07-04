import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {ContactForm} from "@/components/contact-form";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {createPageMetadata} from "@/lib/metadata";
import {siteConfig} from "@/lib/site";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "contact"});
  return createPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/contact"
  });
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "contact"});
  const tc = await getTranslations({locale, namespace: "common"});

  const includeItems = ["include1", "include2", "include3", "include4"] as const;

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        text={t("heroText")}
        image={siteConfig.images.hero}
        caption={tc("representative")}
      />
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <SectionHeading
                eyebrow={t("formEyebrow")}
                title={t("formTitle")}
                text={t("formText")}
              />
              <ContactForm source="contact-page" />
            </div>
            <aside className="grid content-start gap-5">
              <div className="rounded-2xl bg-slate-800 p-6 text-white shadow-soft">
                <h2 className="font-heading text-2xl font-bold">{t("includeTitle")}</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
                  {includeItems.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="font-heading text-2xl font-bold text-slate-900">{t("detailsTitle")}</h2>
                <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-600">
                  <p>{t("detailsOffice")}</p>
                  <p>{tc("contactPending")}</p>
                  <p>{tc("contactPending")}</p>
                  <p>{t("responsePending")}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
