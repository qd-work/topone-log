import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {serviceCards, t} from "@/lib/content";
import {siteImages} from "@/lib/site-images";
import {localizedPath} from "@/lib/site";

type HomeServicesProps = {locale: Locale};

const serviceVisuals = [
  {slug: "sea-fcl", image: siteImages.services.seaFcl, alt: "Container ship at port", number: "01"},
  {slug: "sea-lcl", image: siteImages.services.seaLcl, alt: "Shipping containers stacked", number: "02"},
  {slug: "air-freight", image: siteImages.services.airFreight, alt: "Cargo airplane", number: "03"}
] as const;

export async function HomeServices({locale}: HomeServicesProps) {
  const th = await getTranslations({locale, namespace: "home"});
  const tc = await getTranslations({locale, namespace: "common"});

  return (
    <section className="bg-[#002a35] text-white">
      <div className="cargo-section">
        <div className="mb-14 grid gap-6 border-b border-white/20 pb-10 lg:grid-cols-[1fr_1.35fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ffda00]">{th("servicesEyebrow")}</p>
          <h2 className="cargo-display zh-display zh-display-lg text-[clamp(56px,8vw,124px)]">{th("servicesTitle")}</h2>
        </div>

        <div className="grid border-l border-white/20 md:grid-cols-3">
          {serviceVisuals.map((visual) => {
            const service = serviceCards.find((item) => item.slug === visual.slug);
            if (!service) return null;
            return (
              <article key={visual.slug} data-depth data-reveal className="group border-b border-r border-white/20">
                <Link href={localizedPath(locale, `/services/${service.slug}`)} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#6682c2]">
                    <Image src={visual.image} alt={visual.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002a35]/80 via-transparent to-transparent" />
                    <span className="cargo-display absolute bottom-4 left-5 text-6xl text-[#ffda00]">{visual.number}</span>
                  </div>
                  <div className="min-h-72 p-6 lg:p-8">
                    <h3 className="cargo-display zh-display zh-display-md text-[clamp(36px,4vw,60px)]">{t(service.title, locale)}</h3>
                    <p className="mt-5 max-w-sm leading-relaxed text-white/65">{t(service.text, locale)}</p>
                    <span className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-[#ffda00]">
                      {tc("viewService")} <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
