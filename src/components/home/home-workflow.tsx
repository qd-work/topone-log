import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";

type HomeWorkflowProps = {
  locale: Locale;
};

export async function HomeWorkflow({locale}: HomeWorkflowProps) {
  const t = await getTranslations({locale, namespace: "home"});

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">{t("workEyebrow")}</div>
          <h2 className="max-w-xl font-heading text-3xl font-bold text-slate-900 lg:text-4xl">{t("workTitle")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[t("step1"), t("step2"), t("step3"), t("step4"), t("step5")].map((step, index) => (
            <div
              key={step}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-amber-400 hover:shadow-lg"
            >
              <div className="mb-4 text-sm font-bold text-amber-500">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="font-heading text-lg font-bold text-slate-900">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
