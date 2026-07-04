import type {Metadata} from "next";
import {ContactForm} from "@/components/contact-form";
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
    title: "Contact TopOne Logistics | Request a Freight Quote",
    description: "Request a China-origin freight quote from TopOne Logistics with origin, destination, cargo, and timing details.",
    path: "/contact"
  });
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!routing.locales.includes(rawLocale as Locale)) return null;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a freight quote"
        text="Share shipment details for origin-side quote coordination. The current implementation stores inquiries in mock mode until notification credentials are configured."
        image={siteConfig.images.hero}
      />
      <section className="section bg-harbor">
        <div className="container grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-lg bg-white p-6 shadow-soft">
            <SectionHeading
              eyebrow="Inquiry form"
              title="Tell us what the shipment needs."
              text="For freight forwarder partners, useful quote requests usually include origin, destination, cargo type, volume, and timing expectations."
            />
            <ContactForm source="contact-page" />
          </div>
          <aside className="grid content-start gap-5">
            <div className="rounded-lg bg-navy p-6 text-white shadow-soft">
              <h2 className="text-2xl font-black">What to include</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/72">
                <li>Origin and destination ports or airports</li>
                <li>Cargo type, container, CBM, KG, or dimensions</li>
                <li>Expected departure or delivery timing</li>
                <li>Required scope: trucking, customs, insurance, delivery</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-navy">Contact details</h2>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-600">
                <p>Office: Qingdao, China</p>
                <p>TODO: customer confirms company email</p>
                <p>TODO: customer confirms WhatsApp / Skype / LinkedIn</p>
                <p>TODO: customer confirms quote response commitment</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
