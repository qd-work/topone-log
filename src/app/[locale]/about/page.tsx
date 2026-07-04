import Image from "next/image";
import type {Metadata} from "next";
import {CheckCircle2} from "lucide-react";
import {PageHero} from "@/components/page-hero";
import {SectionHeading} from "@/components/section-heading";
import {routing, type Locale} from "@/i18n/routing";
import {createPageMetadata} from "@/lib/metadata";
import {siteConfig} from "@/lib/site";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  return createPageMetadata({
    locale,
    title: "About TopOne Logistics | China Freight Partner",
    description: "TopOne Logistics is a Qingdao-based China-origin forwarding partner with NVOCC qualification.",
    path: "/about"
  });
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A China-origin partner built for forwarders"
        text="TopOne Logistics presents confirmed credentials carefully and keeps founder, membership, and operating details as confirmation items until the customer supplies supporting material."
        image={siteConfig.images.yard}
      />
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Company"
            title="TopOne Logistics, Qianhao International Logistics Co., Ltd."
            text="Founded in 2025 in Qingdao, the company is positioned as a China-origin forwarding partner for overseas freight forwarders."
          />
          <div className="rounded-lg border border-slate-200 bg-harbor p-6">
            <h2 className="text-2xl font-black text-navy">Founder-led: 18 years in freight forwarding</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              TopOne Logistics is founded by a freight forwarding veteran with 18 years of industry experience. After nearly two decades moving international cargo across global trade lanes, the founder established TopOne to be the reliable China-origin partner that overseas forwarders actually want to work with.
            </p>
            <div className="mt-6 grid h-52 place-items-center rounded-lg border border-dashed border-steel/35 bg-white text-center text-sm font-bold text-steel">
              Founder / team real photo placeholder
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-harbor">
        <div className="container">
          <SectionHeading
            eyebrow="Capability"
            title="A controlled operating model for a new forwarding brand."
            text="The site favors process clarity over inflated claims, which is especially important for a company founded in 2025."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {["Experienced guidance, team process TODO", "Standardized documentation control", "Origin-side shipment coordination", "Transparent quote-by-inquiry model"].map((item) => (
              <div key={item} className="rounded-lg bg-white p-5 shadow-sm">
                <CheckCircle2 className="text-steel" size={22} />
                <p className="mt-4 text-sm font-bold leading-6 text-navy">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <SectionHeading eyebrow="Values" title="Reliability, transparency, partnership." />
            <div className="grid gap-4 md:grid-cols-3">
              {["Reliability", "Transparency", "Partnership"].map((value) => (
                <div key={value} className="rounded-lg border border-slate-200 p-5">
                  <h3 className="text-xl font-black text-navy">{value}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Professional peer-to-peer communication for forwarder partners.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-navy text-white shadow-soft">
            <Image src={siteConfig.images.warehouse} alt="Warehouse operations at TopOne Logistics for China-origin freight" width={800} height={600} className="h-56 w-full object-cover opacity-84" />
            <div className="p-5">
              <p className="text-sm text-white/68">Representative image, real photos TBD</p>
              <h2 className="mt-3 text-2xl font-black">Qualifications</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">NVOCC confirmed. WCA membership in progress; other memberships available on request.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
