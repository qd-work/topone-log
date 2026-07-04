import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
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
  const service = getService(locale, slug);
  if (!service) notFound();
  const image = service.images[0] || siteConfig.images.hero;

  const specs = [
    ["Origin", service.serviceSpecs.origin],
    ["Destination", service.serviceSpecs.destination],
    ["Transit", service.serviceSpecs.transit],
    ["Schedule", service.serviceSpecs.schedule],
    ["Cutoff", service.serviceSpecs.cutoff],
    ["Minimum", service.serviceSpecs.minVolume],
    ["Scope", service.serviceSpecs.scope]
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd(service),
            breadcrumbJsonLd([
              {name: "Home", url: new URL(localizedPath(locale, "/"), siteConfig.siteUrl).toString()},
              {name: "Services", url: new URL(localizedPath(locale, "/services"), siteConfig.siteUrl).toString()},
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
        <div className="container relative py-16 md:py-20">
          <Link href={localizedPath(locale, "/services")} className="text-sm font-bold text-steel">
            Services / {service.category}
          </Link>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-navy md:text-6xl">{service.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{service.description}</p>
          <p className="mt-9 inline-flex rounded-md border border-slate-200 bg-white/85 px-3 py-2 text-xs text-slate-600">Representative image, real photos TBD</p>
        </div>
      </section>
      <div className="border-y border-slate-200 bg-white">
        <div className="container flex gap-3 py-4 text-sm text-slate-500">
          <Link href={localizedPath(locale, "/")}>Home</Link>
          <span>/</span>
          <Link href={localizedPath(locale, "/services")}>Services</Link>
          <span>/</span>
          <span className="font-bold text-steel">{service.title}</span>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <SectionHeading
              eyebrow="Service overview"
              title="Origin-side forwarding support with confirmed details by inquiry."
              text="This page keeps operational facts transparent: route parameters, schedules, carrier resources, and memberships are placeholders until the customer confirms them."
            />
            <div className="rounded-lg border border-slate-200 p-5">
              <h2 className="mb-4 text-2xl font-black text-navy">Our service scope</h2>
              <div className="grid gap-3">
              {["Booking and space coordination", "China-side trucking coordination", "Customs and documentation support", "Cargo insurance support where confirmed", "Destination handover with partner forwarder"].map((item) => (
                <p key={item} className="rounded-md border border-slate-200 bg-harbor px-4 py-3 text-sm font-semibold text-navy">{item}</p>
              ))}
              </div>
            </div>
          </div>
          <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="bg-steel px-5 py-4 text-white">
              <h2 className="text-2xl font-black">Request a Quote</h2>
            </div>
            <div className="bg-harbor p-5">
            <p className="mt-2 text-sm leading-7 text-slate-600">Share origin, destination, cargo, and timing so the team can quote by real shipment conditions.</p>
            <div className="mt-5">
              <ContactForm compact source={`service-${service.slug}`} />
            </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-harbor">
        <div className="container">
          <SectionHeading eyebrow="Parameters" title="Route and schedule details are intentionally marked for confirmation." />
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            {specs.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[180px_1fr]">
                <p className="text-sm font-black text-navy">{label}</p>
                <p className="text-sm text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Common checks before quoting." />
          <div className="grid gap-4">
            {service.faq.map((item) => (
              <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer text-lg font-black text-navy">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Inquiry quotation</p>
            <h2 className="mt-2 text-3xl font-black">No public rates. Quote by shipment details.</h2>
          </div>
          <Link href={localizedPath(locale, "/contact")} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-extrabold text-navy">
            Get a Quote <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
