import Link from "next/link";
import Image from "next/image";
import type {Metadata} from "next";
import {ArrowRight, FileText, ShieldCheck, Ship, Plane, Truck, Warehouse} from "lucide-react";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {serviceCards, t} from "@/lib/content";
import {createPageMetadata} from "@/lib/metadata";
import {getServices} from "@/lib/services";
import {localizedPath, siteConfig} from "@/lib/site";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  return createPageMetadata({
    locale,
    title: "Freight Forwarding Services | TopOne Logistics",
    description: "China-origin sea, air, land, and multimodal forwarding services for overseas freight forwarders.",
    path: "/services"
  });
}

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const serviceOrder = ["sea-fcl", "sea-lcl", "air-freight", "land-multimodal"];
  const services = getServices(locale).sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug));

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Freight forwarding services from China"
        text="A practical service structure for overseas forwarders that need origin-side coordination, documentation, booking, customs support, and handover."
        image={siteConfig.images.warehouse}
      />
      <section className="section bg-white">
        <div className="container">
          <div className="mb-9 grid overflow-hidden rounded-t-lg border-b border-steel md:grid-cols-4">
            {["Sea", "Air", "Land", "Customs"].map((tab, index) => (
              <div key={tab} className={`flex h-16 items-center justify-center gap-3 font-black ${index === 0 ? "bg-steel text-white" : "bg-white text-navy"}`}>
                {index === 0 ? <Ship size={22} /> : index === 1 ? <Plane size={22} /> : index === 2 ? <Truck size={22} /> : <ShieldCheck size={22} />}
                {tab}
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[...services, ...[
              {
                slug: "customs-declaration",
                title: "Customs Declaration",
                description: "Export customs declaration, document review, and compliance support where scope is confirmed.",
                category: "Customs",
                cargoTypes: ["Documentation", "Compliance"],
                images: [siteConfig.images.yard]
              },
              {
                slug: "warehousing-support",
                title: "Warehousing Support",
                description: "Cargo handling, labeling, pick & pack, and consolidation support pending confirmed partner scope.",
                category: "Support",
                cargoTypes: ["CFS", "Handling"],
                images: [siteConfig.images.warehouse]
              }
            ]].map((service, index) => {
              const display = serviceCards.find((item) => item.slug === service.slug);
              const Icon = display?.icon || (index === 4 ? ShieldCheck : Warehouse);
              const image = service.images?.[0] || siteConfig.images.hero;
              const title = display ? t(display.title, locale) : service.title;
              return (
                <Link key={service.slug} href={service.slug.startsWith("sea") || service.slug.includes("freight") || service.slug.includes("multimodal") ? localizedPath(locale, `/services/${service.slug}`) : localizedPath(locale, "/contact")} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1">
                  <div className="relative h-44">
                    <Image src={image} alt={`${service.title || service.slug} freight forwarding from China`} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-steel">{service.category}</p>
                      <h2 className="mt-2 text-2xl font-black text-navy">{title}</h2>
                    </div>
                    {Icon ? <Icon className="text-steel" size={30} /> : null}
                    </div>
                  <p className="text-sm leading-7 text-slate-600">{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.cargoTypes.map((cargo) => (
                      <span key={cargo} className="rounded-md bg-harbor px-3 py-1 text-xs font-bold text-navy">
                        {cargo}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-steel">
                    View details <ArrowRight size={16} />
                  </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-harbor">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Scope"
            title="Operational support that maps to real forwarding work."
            text="Booking, trucking, customs coordination, cargo insurance support, documentation, and destination handover are presented as service scope, not unsupported guarantees."
          />
          <div className="grid gap-4 md:grid-cols-5">
            {[
              ["Booking & Space", FileText],
              ["Inland Transport", Truck],
              ["Customs Clearance", ShieldCheck],
              ["Insurance Support", ShieldCheck],
              ["Documentation", FileText]
            ].map(([item, Icon], index) => (
              <div key={item as string} className="rounded-lg bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-steel text-steel">
                  <Icon size={24} />
                </div>
                <p className="font-black text-navy">{index + 1}. {item as string}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">TODO: customer confirms operating scope.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
