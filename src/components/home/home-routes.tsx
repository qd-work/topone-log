import Image from "next/image";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {routeGroups, t} from "@/lib/content";
import {siteImages} from "@/lib/site-images";

type HomeRoutesProps = {locale: Locale};

const routeVisuals = [
  {image: siteImages.routes.africa, alt: "Container ship on international trade lane", marketIndex: 0},
  {image: siteImages.routes.southAmerica, alt: "Container terminal operations", marketIndex: 1},
  {image: siteImages.routes.southeastAsia, alt: "Port cranes and container handling", marketIndex: 2}
] as const;

export async function HomeRoutes({locale}: HomeRoutesProps) {
  const th = await getTranslations({locale, namespace: "home"});
  const tc = await getTranslations({locale, namespace: "common"});

  return (
    <section className="bg-[#ffda00] text-[#002a35]">
      <div className="cargo-section">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.22em]">{th("routesEyebrow")}</p>
          <h2 className="cargo-display zh-display zh-display-lg text-[clamp(56px,8vw,124px)]">{th("routesTitle")}</h2>
        </div>
        <div className="grid border-l border-t border-[#002a35] lg:grid-cols-4">
          {routeVisuals.map((visual, index) => {
            const route = routeGroups[visual.marketIndex];
            return (
              <article key={visual.alt} data-depth data-reveal className="group border-b border-r border-[#002a35] bg-[#002a35] text-white">
                <div className="relative h-72 overflow-hidden lg:h-[420px]">
                  <Image src={visual.image} alt={visual.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002a35] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 text-xs font-bold tracking-[0.2em] text-[#ffda00]">0{index + 1}</span>
                  <h3 className="cargo-display zh-display zh-display-md absolute bottom-5 left-5 right-5 text-5xl">{t(route.market, locale)}</h3>
                </div>
              </article>
            );
          })}
          <div data-depth data-depth-strength="soft" data-reveal className="flex min-h-72 flex-col justify-between border-b border-r border-[#002a35] p-6 lg:min-h-[420px] lg:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">{tc("alsoCovering")}</p>
            <div>
              {routeGroups.slice(3).map((route) => (
                <div key={t(route.market, locale)} className="border-t border-[#002a35] py-4 font-bold uppercase tracking-[-0.02em]">
                  {t(route.market, locale)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
