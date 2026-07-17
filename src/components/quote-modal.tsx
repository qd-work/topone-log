"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {X} from "lucide-react";
import {ContactForm} from "@/components/contact-form";

export function QuoteModal({triggerLabel}: {triggerLabel: string}) {
  const t = useTranslations("quote");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-[#ffda00] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#002a35] transition-colors hover:bg-white"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#002a35]/85 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto border-t-8 border-[#ffda00] bg-[#f1efe8] p-6 shadow-2xl lg:p-10">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6682c2]">{t("eyebrow")}</p>
                <h2 className="cargo-display zh-display zh-display-md mt-3 text-5xl text-[#002a35]">{t("title")}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center border border-[#002a35]/30 text-[#002a35] transition-colors hover:bg-[#002a35] hover:text-white"
                aria-label={t("close")}
              >
                <X size={18} />
              </button>
            </div>
            <ContactForm source="quote-modal" />
          </div>
        </div>
      ) : null}
    </>
  );
}
