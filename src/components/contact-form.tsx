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
  const isZh = locale === "zh";

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="locale" value={locale} />

      <fieldset className="grid gap-5">
        <legend className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#6682c2]">
          {isZh ? "联系人" : "Contact"}
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("form.name")} required>
            <input className={fieldClass} name="name" placeholder={t("form.name")} required autoComplete="name" />
          </Field>
          <Field label={t("form.company")}>
            <input className={fieldClass} name="company" placeholder={t("form.company")} autoComplete="organization" />
          </Field>
          <Field label={t("form.email")} required>
            <input className={fieldClass} name="email" type="email" placeholder={t("form.email")} required autoComplete="email" />
          </Field>
          <Field label={t("form.phone")}>
            <input className={fieldClass} name="phone" placeholder={t("form.phone")} autoComplete="tel" />
          </Field>
        </div>
        <Field label={t("form.country")}>
          <input className={fieldClass} name="country" placeholder={t("form.country")} autoComplete="country-name" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 border-t border-[#002a35]/20 pt-5">
        <legend className="pr-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6682c2]">
          {isZh ? "货运信息" : "Shipment"}
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("form.origin")} required>
            <input className={fieldClass} name="origin" placeholder={t("form.origin")} required />
          </Field>
          <Field label={t("form.destination")} required>
            <input className={fieldClass} name="destination" placeholder={t("form.destination")} required />
          </Field>
          <Field label={t("form.cargoType")} required>
            <input className={fieldClass} name="cargoType" placeholder={t("form.cargoType")} required />
          </Field>
          <Field label={t("form.shipmentSize")}>
            <input className={fieldClass} name="shipmentSize" placeholder={t("form.shipmentSize")} />
          </Field>
        </div>
        <Field label={t("form.timing")}>
          <input className={fieldClass} name="timing" placeholder={t("form.timing")} />
        </Field>
        <Field label={t("form.message")}>
          <textarea
            className="min-h-36 w-full border border-[#002a35]/25 bg-transparent p-4 text-sm text-[#002a35] outline-none transition placeholder:text-[#002a35]/35 focus:border-[#002a35] focus:bg-white"
            name="message"
            placeholder={t("form.message")}
          />
        </Field>
      </fieldset>

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
