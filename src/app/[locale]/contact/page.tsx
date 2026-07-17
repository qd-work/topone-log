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
      <section className="bg-[#f1efe8]">
        <div className="cargo-section">
          <div className="grid gap-0 border border-[#002a35] lg:grid-cols-[1fr_380px]">
            <div data-depth data-depth-strength="soft" data-reveal className="p-6 lg:p-10">
              <SectionHeading
                eyebrow={t("formEyebrow")}
                title={t("formTitle")}
                text={t("formText")}
              />
              <ContactForm source="contact-page" />
            </div>
            <aside data-depth data-depth-strength="soft" data-reveal className="grid content-start border-t border-[#002a35] lg:border-l lg:border-t-0">
              <div className="bg-[#002a35] p-7 text-white">
                <h2 className="cargo-display zh-display zh-display-sm text-4xl text-[#ffda00]">{t("includeTitle")}</h2>
                <ul className="mt-7 grid text-sm leading-6 text-white/70">
                  {includeItems.map((key) => (
                    <li key={key} className="border-t border-white/20 py-3">{t(key)}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#ffda00] p-7 text-[#002a35]">
                <h2 className="cargo-display zh-display zh-display-sm text-4xl">{t("detailsTitle")}</h2>
                <div className="mt-6 grid gap-3 text-sm leading-7 text-[#002a35]/75">
                  <p>{t("detailsOffice")}</p>
                  <p>
                    {t("detailsEmail")}:{" "}
                    <a className="font-bold underline" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </p>
                  <p>
                    {t("detailsPhone")}:{" "}
                    <a className="font-bold underline" href={siteConfig.phoneHref}>
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
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
