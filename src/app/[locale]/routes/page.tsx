import type {Metadata} from "next";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {routeGroups, t} from "@/lib/content";
import {createPageMetadata} from "@/lib/metadata";
import {siteConfig} from "@/lib/site";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  return createPageMetadata({
    locale,
    title: "China Freight Routes | TopOne Logistics",
    description: "Core strengths in Africa, South America, and Southeast Asia, with broader coverage. Transit, schedule, and carrier confirmed per shipment.",
    path: "/routes"
  });
}

export default async function RoutesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;

  return (
    <>
      <PageHero
        eyebrow="Routes"
        title="China-origin routes for overseas forwarder partners"
        text="Core strengths in Africa, South America, and Southeast Asia, with broader coverage across Europe, the Americas, and Oceania. Transit time, schedule, and carrier are confirmed per shipment."
        image={siteConfig.images.yard}
      />
      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Lane overview"
            title="Real lanes, honest parameters."
            text="We don't publish fixed freight rates or invented schedules. Every quote is based on real shipment details — origin, destination, cargo, and timing."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {routeGroups.map((route) => (
              <article key={t(route.market, locale)} className={`rounded-lg border p-6 shadow-sm ${route.strength ? "border-steel bg-navy text-white" : "border-slate-200 bg-white"}`}>
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${route.strength ? "text-gold" : "text-steel"}`}>
                  {route.strength ? "Core Strength" : "Also Covered"}
                </p>
                <h2 className="mt-3 text-2xl font-black">{t(route.market, locale)}</h2>
                <dl className="mt-6 grid gap-4 text-sm">
                  <div>
                    <dt className={route.strength ? "text-white/50" : "text-slate-400"}>Main ports</dt>
                    <dd className={route.strength ? "mt-1 text-white/80" : "mt-1 text-slate-700"}>{t(route.ports, locale)}</dd>
                  </div>
                  <div>
                    <dt className={route.strength ? "text-white/50" : "text-slate-400"}>Transit / schedule</dt>
                    <dd className={route.strength ? "mt-1 text-white/80" : "mt-1 text-slate-700"}>{t(route.schedule, locale)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
