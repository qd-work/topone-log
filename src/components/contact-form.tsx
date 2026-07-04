"use client";

import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {useTranslations} from "next-intl";
import {Send} from "lucide-react";
import {submitInquiry, type InquiryState} from "@/app/actions/inquiry";

const initialState: InquiryState = {success: false, message: ""};

type ContactFormProps = {
  compact?: boolean;
  source?: string;
};

export function ContactForm({compact, source = "contact-page"}: ContactFormProps) {
  const t = useTranslations();
  const [state, formAction] = useActionState(submitInquiry, initialState);

  const fieldClass =
    "h-12 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-steel/20 transition focus:border-steel focus:ring-4";

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="source" value={source} />
      <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <input className={fieldClass} name="name" placeholder={t("form.name")} required />
        <input className={fieldClass} name="company" placeholder={t("form.company")} />
        <input className={fieldClass} name="email" type="email" placeholder={t("form.email")} required />
        <input className={fieldClass} name="country" placeholder={t("form.country")} required />
        <input className={fieldClass} name="whatsapp" placeholder={t("form.whatsapp")} />
        <input className={fieldClass} name="originPort" placeholder={t("form.origin")} required />
        <input className={fieldClass} name="destinationPort" placeholder={t("form.destination")} required />
        <input className={fieldClass} name="cargoType" placeholder={t("form.cargo")} required />
        <input className={fieldClass} name="volume" placeholder={t("form.volume")} />
        <input className={fieldClass} name="expectedTransit" placeholder={t("form.transit")} />
      </div>
      <textarea
        className="min-h-32 w-full rounded-md border border-slate-200 bg-white p-3 text-sm outline-none ring-steel/20 transition focus:border-steel focus:ring-4"
        name="notes"
        placeholder={t("form.notes")}
      />
      <SubmitButton label={t("form.submit")} />
      {state.message ? (
        <p className={`rounded-md px-4 py-3 text-sm ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function SubmitButton({label}: {label: string}) {
  const {pending} = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-steel px-5 text-sm font-bold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send size={17} />
      {pending ? "Submitting..." : label}
    </button>
  );
}
