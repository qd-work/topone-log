import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";

type HomeWorkflowProps = {locale: Locale};

export async function HomeWorkflow({locale}: HomeWorkflowProps) {
  const t = await getTranslations({locale, namespace: "home"});
  const steps = [t("step1"), t("step2"), t("step3"), t("step4"), t("step5")];

  return (
    <section className="bg-[#f1efe8] text-[#002a35]">
      <div className="cargo-section">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b6298]">{t("workEyebrow")}</p>
          <h2 className="cargo-display zh-display zh-display-lg text-[clamp(56px,8vw,124px)]">{t("workTitle")}</h2>
        </div>
        <div className="grid border-l border-t border-[#002a35] sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} data-depth data-depth-strength="soft" data-reveal className="group min-h-56 border-b border-r border-[#002a35] p-6 transition-colors hover:bg-[#ffda00] lg:min-h-72">
              <div className="cargo-display text-5xl text-[#6682c2] group-hover:text-[#002a35]">0{index + 1}</div>
              <h3 className="cargo-display zh-display zh-display-sm mt-16 text-3xl lg:mt-24">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
