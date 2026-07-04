"use client";

import {useState} from "react";
import {X} from "lucide-react";
import {ContactForm} from "@/components/contact-form";

export function QuoteModal({triggerLabel}: {triggerLabel: string}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-gold px-4 text-sm font-extrabold text-navy shadow-sm transition hover:bg-white"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-5 shadow-soft">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-steel">Inquiry</p>
                <h2 className="mt-1 text-2xl font-black text-navy">Request a freight quote</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-500 hover:text-navy"
                aria-label="Close quote form"
              >
                <X size={18} />
              </button>
            </div>
            <ContactForm compact source="quote-modal" />
          </div>
        </div>
      ) : null}
    </>
  );
}
