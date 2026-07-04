import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {ArrowRight} from "lucide-react";
import {ContactForm} from "@/components/contact-form";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd} from "@/lib/json-ld";
import {createPageMetadata} from "@/lib/metadata";
import {getAllServices, getService} from "@/lib/services";
import {localizedPath, siteConfig} from "@/lib/site";

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    locale: service.language,
    slug: service.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const service = getService(locale, slug);
  if (!service) return {};
  return createPageMetadata({
    locale,
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${slug}`
  });
}

export default async function ServiceDetailPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: rawLocale, slug} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "serviceDetail"});
  const tc = await getTranslations({locale, namespace: "common"});
  const service = getService(locale, slug);
  if (!service) notFound();
  const image = service.images[0] || siteConfig.images.hero;

  const scopeKeys = ["scope1", "scope2", "scope3", "scope4", "scope5"] as const;

  const specs = [
    [t("specOrigin"), service.serviceSpecs.origin],
    [t("specDestination"), service.serviceSpecs.destination],
    [t("specTransit"), service.serviceSpecs.transit],
    [t("specSchedule"), service.serviceSpecs.schedule],
    [t("specCutoff"), service.serviceSpecs.cutoff],
    [t("specMinimum"), service.serviceSpecs.minVolume],
    [t("specScope"), service.serviceSpecs.scope]
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd(service),
            breadcrumbJsonLd([
              {name: t("breadcrumbHome"), url: new URL(localizedPath(locale, "/"), siteConfig.siteUrl).toString()},
              {name: t("breadcrumbServices"), url: new URL(localizedPath(locale, "/services"), siteConfig.siteUrl).toString()},
              {name: service.title, url: new URL(localizedPath(locale, `/services/${service.slug}`), siteConfig.siteUrl).toString()}
            ]),
            faqPageJsonLd(service.faq)
          ])
        }}
      />
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] md:block">
          <Image src={image} alt={`${service.title} — China freight forwarding`} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/72 to-white/0" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link href={localizedPath(locale, "/services")} className="text-sm font-semibold text-amber-600">
            {t("breadcrumbServices")} / {service.category}
          </Link>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">{service.description}</p>
          <p className="mt-9 inline-flex rounded-lg border border-slate-200 bg-white/85 px-3 py-2 text-xs text-slate-600">
            {tc("representative")}
          </p>
        </div>
      </section>
      <div className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl gap-3 px-6 py-4 text-sm text-slate-500">
          <Link href={localizedPath(locale, "/")} className="hover:text-amber-600">
            {t("breadcrumbHome")}
          </Link>
          <span>/</span>
          <Link href={localizedPath(locale, "/services")} className="hover:text-amber-600">
            {t("breadcrumbServices")}
          </Link>
          <span>/</span>
          <span className="font-semibold text-amber-600">{service.title}</span>
        </div>
      </div>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <SectionHeading
                eyebrow={t("scopeEyebrow")}
                title={t("scopeTitle")}
                text={t("scopeText")}
              />
              <div className="rounded-2xl border border-slate-200 p-5">
                <h2 className="mb-4 font-heading text-2xl font-bold text-slate-900">{t("scopeHeading")}</h2>
                <div className="grid gap-3">
                  {scopeKeys.map((key) => (
                    <p
                      key={key}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900"
                    >
                      {t(key)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="bg-slate-800 px-5 py-4 text-white">
                <h2 className="font-heading text-2xl font-bold">{t("quoteTitle")}</h2>
              </div>
              <div className="bg-slate-50 p-5">
                <p className="text-sm leading-relaxed text-slate-600">{t("quoteText")}</p>
                <div className="mt-5">
                  <ContactForm source={`service-${service.slug}`} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("paramsEyebrow")} title={t("paramsTitle")} />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {specs.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[180px_1fr]">
                <p className="text-sm font-bold text-slate-900">{label}</p>
                <p className="text-sm text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
            <div className="grid gap-4">
              {service.faq.map((item) => (
                <details key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer font-heading text-lg font-bold text-slate-900">{item.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">{t("ctaEyebrow")}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold">{t("ctaTitle")}</h2>
          </div>
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
          >
            {t("ctaButton")} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
