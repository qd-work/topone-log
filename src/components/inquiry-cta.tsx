import Link from "next/link";
import type {Locale} from "@/i18n/routing";
import {localizedPath} from "@/lib/site";

export function InquiryCta({locale}: {locale: Locale}) {
  const isZh = locale === "zh";

  return (
    <section className="bg-[#002a35] text-white">
      <div className="grid gap-8 px-[clamp(16px,3vw,48px)] py-16 md:grid-cols-[1fr_auto] md:items-end lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffda00]">{isZh ? "下一步" : "Next step"}</p>
          <h2 className="cargo-display zh-display zh-display-lg mt-4 max-w-4xl text-[clamp(48px,7vw,104px)]">
            {isZh ? "把货运信息发给我们，按真实条件确认方案。" : "Send the shipment facts. We’ll confirm the workable route."}
          </h2>
        </div>
        <Link
          href={localizedPath(locale, "/contact")}
          data-depth
          data-depth-strength="soft"
          className="inline-flex h-14 items-center justify-center bg-[#ffda00] px-7 text-xs font-bold uppercase tracking-[0.14em] text-[#002a35] transition hover:bg-white"
        >
          {isZh ? "提交询盘 →" : "Start an inquiry →"}
        </Link>
      </div>
    </section>
  );
}
