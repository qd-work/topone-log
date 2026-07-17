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
            serviceJsonLd(service, locale),
            breadcrumbJsonLd([
              {name: t("breadcrumbHome"), url: new URL(localizedPath(locale, "/"), siteConfig.siteUrl).toString()},
              {name: t("breadcrumbServices"), url: new URL(localizedPath(locale, "/services"), siteConfig.siteUrl).toString()},
              {name: service.title, url: new URL(localizedPath(locale, `/services/${service.slug}`), siteConfig.siteUrl).toString()}
            ]),
            faqPageJsonLd(service.faq)
          ])
        }}
      />
      <section data-motion-static className="relative flex min-h-[clamp(540px,68vh,760px)] items-end overflow-hidden bg-[#002a35] text-white">
        <div className="absolute inset-y-0 right-0 w-full md:w-[68%]">
          <Image src={image} alt={`${service.title} — China freight forwarding`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#002a35]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002a35] via-[#002a35]/75 to-[#002a35]/10" />
        </div>
        <div className="relative w-full px-[clamp(16px,3vw,48px)] pb-[clamp(48px,7vw,100px)] pt-24">
          <Link href={localizedPath(locale, "/services")} className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffda00]">
            {t("breadcrumbServices")} / {service.category}
          </Link>
          <h1 className="cargo-display zh-display zh-display-xl mt-7 max-w-5xl text-[clamp(68px,10vw,160px)]">
            {service.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">{service.description}</p>
          <p className="mt-9 text-xs uppercase tracking-[0.12em] text-white/40">
            {tc("representative")}
          </p>
        </div>
      </section>
      <div className="bg-[#ffda00]">
        <div className="flex gap-3 px-[clamp(16px,3vw,48px)] py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#002a35]/65">
          <Link href={localizedPath(locale, "/")} className="hover:text-[#002a35]">
            {t("breadcrumbHome")}
          </Link>
          <span>/</span>
          <Link href={localizedPath(locale, "/services")} className="hover:text-[#002a35]">
            {t("breadcrumbServices")}
          </Link>
          <span>/</span>
          <span className="text-[#002a35]">{service.title}</span>
        </div>
      </div>

      <section className="bg-[#f1efe8]">
        <div className="cargo-section">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <SectionHeading
                eyebrow={t("scopeEyebrow")}
                title={t("scopeTitle")}
                text={t("scopeText")}
              />
              <div data-depth data-depth-strength="soft" data-reveal className="border-l-8 border-[#ffda00] bg-white p-6">
                <h2 className="cargo-display zh-display zh-display-md mb-6 text-5xl text-[#002a35]">{t("scopeHeading")}</h2>
                <div className="grid border-t border-[#002a35]/25">
                  {scopeKeys.map((key) => (
                    <p
                      key={key}
                      className="border-b border-[#002a35]/25 py-4 text-sm font-semibold text-[#002a35]"
                    >
                      {t(key)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <aside data-depth data-reveal className="overflow-hidden border border-[#002a35] bg-white">
              <div className="bg-[#002a35] px-6 py-5 text-white">
                <h2 className="cargo-display zh-display zh-display-sm text-4xl text-[#ffda00]">{t("quoteTitle")}</h2>
              </div>
              <div className="bg-white p-6">
                <p className="text-sm leading-relaxed text-[#002a35]/60">{t("quoteText")}</p>
                <div className="mt-5">
                  <ContactForm source={`service-${service.slug}`} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#ffda00]">
        <div className="cargo-section">
          <SectionHeading eyebrow={t("paramsEyebrow")} title={t("paramsTitle")} />
          <div className="overflow-hidden border-l border-t border-[#002a35]">
            {specs.map(([label, value]) => (
              <div key={label} data-reveal className="grid gap-2 border-b border-r border-[#002a35] p-5 md:grid-cols-[220px_1fr]">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#002a35]">{label}</p>
                <p className="text-sm text-[#002a35]/70">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#6682c2] text-white">
        <div className="cargo-section">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} light />
            <div className="grid border-t border-white/35">
              {service.faq.map((item) => (
                <details key={item.question} data-depth data-depth-strength="soft" data-reveal className="border-b border-white/35 py-5">
                  <summary className="cursor-pointer font-bold text-white">{item.question}</summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#002a35] py-16">
        <div className="flex flex-col gap-8 px-[clamp(16px,3vw,48px)] text-white md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffda00]">{t("ctaEyebrow")}</p>
            <h2 className="cargo-display zh-display zh-display-lg mt-4 text-[clamp(48px,7vw,96px)]">{t("ctaTitle")}</h2>
          </div>
          <Link
            href={localizedPath(locale, "/contact")}
            data-depth
            data-depth-strength="soft"
            className="inline-flex h-14 items-center justify-center gap-3 bg-[#ffda00] px-7 text-xs font-bold uppercase tracking-[0.14em] text-[#002a35] transition-colors hover:bg-white"
          >
            {t("ctaButton")} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
