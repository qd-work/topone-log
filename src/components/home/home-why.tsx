import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";

type HomeWhyProps = {locale: Locale};

export async function HomeWhy({locale}: HomeWhyProps) {
  const t = await getTranslations({locale, namespace: "home"});
  const items = [t("why1"), t("why2"), t("why3"), t("why4")];

  return (
    <section className="bg-[#4b6298] text-white">
      <div className="cargo-section grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-white">{t("whyEyebrow")}</p>
          <h2 className="cargo-display zh-display zh-display-lg text-[clamp(64px,9vw,140px)]">{t("whyTitle")}</h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white">{t("whyText")}</p>
        </div>
        <div className="self-end border-t border-white/50">
          {items.map((item, index) => (
            <div key={item} data-depth data-depth-strength="soft" data-reveal className="group grid grid-cols-[48px_1fr] gap-4 border-b border-white/50 py-6 transition-colors hover:bg-[#ffda00] hover:px-5 hover:text-[#002a35]">
              <span className="cargo-display text-3xl text-[#ffda00] group-hover:text-[#002a35]">0{index + 1}</span>
              <p className="font-medium leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
