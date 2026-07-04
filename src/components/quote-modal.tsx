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
        className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">{t("eyebrow")}</p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-slate-900">{t("title")}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:text-slate-900"
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
