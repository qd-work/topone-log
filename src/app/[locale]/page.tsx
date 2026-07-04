import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";
import {ArrowRight, CheckCircle2, ShieldCheck} from "lucide-react";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {routeGroups, serviceCards, t, trustItems} from "@/lib/content";
import {createPageMetadata} from "@/lib/metadata";
import {localizedPath, siteConfig} from "@/lib/site";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  return createPageMetadata({
    locale,
    title: "TopOne Logistics | China Freight Forwarding Partner",
    description: "NVOCC-licensed China-origin freight forwarding partner for overseas forwarders.",
    path: "/"
  });
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src={siteConfig.images.hero} alt="TopOne Logistics — China freight forwarding partner, port and container operations" fill priority className="object-cover opacity-48" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/86 to-navy/35" />
        <div className="container relative flex min-h-[430px] items-center py-8">
          <div className="max-w-[620px]">
            <p className="mb-4 inline-flex rounded-md border border-gold/35 bg-gold/12 px-3 py-2 text-sm font-bold uppercase tracking-[0.18em] text-gold">
              NVOCC-licensed China origin partner
            </p>
            <h1 className="text-5xl font-black leading-[1.04] md:text-[52px]">
              Your reliable China freight forwarding <span className="text-gold">partner.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/74">
              One-stop China-origin logistics support for global freight forwarders: sea, air, land,
              customs coordination, documentation, and shipment handover.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={localizedPath(locale, "/contact")} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-extrabold text-navy">
                Get a Quote <ArrowRight size={17} />
              </Link>
              <Link href={localizedPath(locale, "/services")} className="inline-flex h-12 items-center justify-center rounded-md border border-white/22 px-5 text-sm font-bold text-white hover:bg-white/10">
                Our Services
              </Link>
            </div>
            <div className="mt-7 inline-flex items-center gap-4 rounded-lg border border-white/15 bg-navy/60 px-5 py-3 backdrop-blur">
              <ShieldCheck className="text-gold" size={30} />
              <div>
                <p className="text-lg font-black">NVOCC Licensed</p>
                <p className="text-sm text-white/68">TODO: customer provides certificate number</p>
              </div>
            </div>
          </div>
        </div>
        <p className="caption-over-image absolute bottom-5 left-1/2 -translate-x-1/2 rounded-md px-3 py-2 text-xs">
          Representative image, real photos TBD
        </p>
      </section>

      <section className="bg-navy py-4 text-white">
        <div className="container grid gap-5 text-sm md:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={t(item.label, locale)} className="flex items-center gap-3 border-white/16 md:border-r md:last:border-r-0">
                <Icon className="text-gold" size={28} />
                <div>
                  <p className="font-black">{t(item.label, locale)}</p>
                  <p className="text-xs text-white/58">Verified only</p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-gold" size={28} />
            <div>
              <p className="font-black">Forwarder focused</p>
              <p className="text-xs text-white/58">Co-loader support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-steel">Our Services</p>
            <h2 className="text-3xl font-black leading-tight text-navy md:text-4xl">End-to-end logistics solutions from China</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceCards.slice(0, 3).map((service, index) => {
              const Icon = service.icon;
              const image = index === 0 ? siteConfig.images.hero : index === 1 ? siteConfig.images.warehouse : siteConfig.images.yard;
              return (
                <Link key={service.slug} href={localizedPath(locale, `/services/${service.slug}`)} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1">
                  <div className="relative h-36">
                    <Image src={image} alt={`${t(service.title, locale)} freight forwarding from China`} fill className="object-cover" />
                    <span className="absolute -bottom-8 left-6 grid h-16 w-16 place-items-center rounded-md bg-steel text-white shadow-lg">
                      <Icon size={30} />
                    </span>
                  </div>
                  <div className="p-5 pt-10">
                    <h3 className="text-2xl font-black text-navy">{t(service.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{t(service.text, locale)}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-steel">
                    View service <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-steel">Our Core Routes</p>
            <h2 className="text-3xl font-black leading-tight text-navy md:text-4xl">Connecting China to the world</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_260px]">
            {routeGroups.slice(0, 3).map((route, index) => (
              <div key={t(route.market, locale)} className="relative min-h-52 overflow-hidden rounded-lg bg-navy text-white shadow-sm">
                <Image src={index === 0 ? siteConfig.images.yard : index === 1 ? siteConfig.images.hero : siteConfig.images.warehouse} alt={`${t(route.market, locale)} freight routes from China`} fill className="object-cover opacity-72" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-2xl font-black">{t(route.market, locale)}</h3>
                  <div className="mt-3 h-1 w-12 bg-gold" />
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-harbor p-6">
              <p className="mb-5 font-black text-navy">Also covering</p>
              {routeGroups.slice(3).map((route) => (
                <p key={t(route.market, locale)} className="border-t border-slate-200 py-4 font-bold text-navy">
                  {t(route.market, locale)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            light
            eyebrow="Why TopOne"
            title="Trust first, then transaction."
            text="For a new forwarding brand, credibility comes from clear scope, verified credentials, and honest placeholders where details are still being confirmed."
          />
          <div className="grid gap-4">
            {["NVOCC is the confirmed qualification anchor.", "Led by a founder with 18 years in freight forwarding.", "No fake customer logos, case studies, or public freight rates.", "Representative imagery is clearly marked until real photos are available."].map((item) => (
              <p key={item} className="flex gap-3 rounded-lg border border-white/12 bg-white/6 p-4 text-white/76">
                <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={19} /> {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHeading eyebrow="How we work" title="A simple forwarding workflow for partner operations." />
          <div className="grid gap-4 md:grid-cols-5">
            {["Inquiry", "Quote", "Booking", "Tracking", "Delivery"].map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-steel">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-black text-navy">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
