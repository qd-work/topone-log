import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";

type HomeWhyProps = {
  locale: Locale;
};

export async function HomeWhy({locale}: HomeWhyProps) {
  const t = await getTranslations({locale, namespace: "home"});

  return (
    <section className="bg-slate-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400">{t("whyEyebrow")}</div>
            <h2 className="mb-6 font-heading text-3xl font-bold text-white lg:text-4xl">{t("whyTitle")}</h2>
            <p className="text-lg leading-relaxed text-slate-300">{t("whyText")}</p>
          </div>
          <div className="space-y-4">
            {[t("why1"), t("why2"), t("why3"), t("why4")].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl border border-slate-600/50 bg-slate-700/50 p-5"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                  <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
