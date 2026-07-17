"use client";

import {useActionState, type ReactNode} from "react";
import {useFormStatus} from "react-dom";
import {useLocale, useTranslations} from "next-intl";
import {Send} from "lucide-react";
import {submitInquiry, type InquiryState} from "@/app/actions/inquiry";

const initialState: InquiryState = {success: false};

type ContactFormProps = {source?: string};

const fieldClass =
  "h-14 w-full border border-[#002a35]/25 bg-transparent px-4 text-sm text-[#002a35] outline-none transition placeholder:text-[#002a35]/35 focus:border-[#002a35] focus:bg-white";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#002a35]/55";

export function ContactForm({source = "contact-page"}: ContactFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [state, formAction] = useActionState(submitInquiry, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} required>
          <input className={fieldClass} name="name" placeholder={t("form.name")} required autoComplete="name" />
        </Field>
        <Field label={t("form.email")} required>
          <input className={fieldClass} name="email" type="email" placeholder={t("form.email")} required autoComplete="email" />
        </Field>
      </div>

      <Field label={t("form.route")} required>
        <input className={fieldClass} name="route" placeholder={t("form.routePlaceholder")} required />
      </Field>

      <Field label={t("form.message")} required>
        <textarea
          className="min-h-28 w-full resize-y border border-[#002a35]/25 bg-transparent p-4 text-sm text-[#002a35] outline-none transition placeholder:text-[#002a35]/35 focus:border-[#002a35] focus:bg-white"
          name="message"
          placeholder={t("form.messagePlaceholder")}
          required
        />
      </Field>

      <SubmitButton label={t("form.submit")} pendingLabel={t("common.submitting")} />
      {state.messageKey ? (
        <p className={`border px-4 py-3 text-sm ${state.success ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-red-600 bg-red-50 text-red-700"}`} role="status">
          {t(`form.${state.messageKey}`)}
        </p>
      ) : null}
    </form>
  );
}

function Field({label, required, children}: {label: string; required?: boolean; children: ReactNode}) {
  return (
    <label>
      <span className={labelClass}>{label}{required ? " *" : ""}</span>
      {children}
    </label>
  );
}

function SubmitButton({label, pendingLabel}: {label: string; pendingLabel: string}) {
  const {pending} = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      data-depth
      data-depth-strength="soft"
      className="inline-flex h-14 items-center justify-center gap-3 bg-[#ffda00] px-6 text-sm font-bold uppercase tracking-[0.14em] text-[#002a35] transition hover:bg-[#002a35] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send size={17} />
      {pending ? pendingLabel : label}
    </button>
  );
}
