"use client";

import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {useLocale, useTranslations} from "next-intl";
import {Send} from "lucide-react";
import {submitInquiry, type InquiryState} from "@/app/actions/inquiry";

const initialState: InquiryState = {success: false};

type ContactFormProps = {
  source?: string;
};

export function ContactForm({source = "contact-page"}: ContactFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [state, formAction] = useActionState(submitInquiry, initialState);

  const fieldClass =
    "h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20";

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-4 md:grid-cols-2">
        <input className={fieldClass} name="name" placeholder={t("form.name")} required autoComplete="name" />
        <input
          className={fieldClass}
          name="email"
          type="email"
          placeholder={t("form.email")}
          required
          autoComplete="email"
        />
      </div>
      <input className={fieldClass} name="company" placeholder={t("form.company")} autoComplete="organization" />
      <textarea
        className="min-h-36 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
        name="message"
        placeholder={t("form.message")}
        required
      />
      <SubmitButton label={t("form.submit")} pendingLabel={t("common.submitting")} />
      {state.messageKey ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {t(`form.${state.messageKey}`)}
        </p>
      ) : null}
    </form>
  );
}

function SubmitButton({label, pendingLabel}: {label: string; pendingLabel: string}) {
  const {pending} = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send size={17} />
      {pending ? pendingLabel : label}
    </button>
  );
}
