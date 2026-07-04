import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {serviceCards, t} from "@/lib/content";
import {siteImages} from "@/lib/site-images";
import {localizedPath} from "@/lib/site";

type HomeServicesProps = {
  locale: Locale;
};

const serviceVisuals = [
  {
    slug: "sea-fcl",
    image: siteImages.services.seaFcl,
    alt: "Container ship at port",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    )
  },
  {
    slug: "sea-lcl",
    image: siteImages.services.seaLcl,
    alt: "Shipping containers stacked",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    )
  },
  {
    slug: "air-freight",
    image: siteImages.services.airFreight,
    alt: "Cargo airplane",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  }
] as const;

export async function HomeServices({locale}: HomeServicesProps) {
  const th = await getTranslations({locale, namespace: "home"});
  const tc = await getTranslations({locale, namespace: "common"});

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">{th("servicesEyebrow")}</div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 lg:text-4xl">{th("servicesTitle")}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {serviceVisuals.map((visual) => {
            const service = serviceCards.find((item) => item.slug === visual.slug);
            if (!service) return null;

            return (
              <div
                key={visual.slug}
                className="group relative overflow-hidden rounded-2xl bg-slate-50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={visual.image}
                    alt={visual.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {visual.icon}
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 font-heading text-xl font-bold text-slate-900">{t(service.title, locale)}</h3>
                  <p className="mb-4 leading-relaxed text-slate-600">{t(service.text, locale)}</p>
                  <Link
                    href={localizedPath(locale, `/services/${service.slug}`)}
                    className="inline-flex items-center gap-2 font-semibold text-amber-600 transition-colors hover:text-amber-700"
                  >
                    <span>{tc("viewService")}</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
