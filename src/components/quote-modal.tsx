"use client";

import {useCallback, useEffect, useId, useState} from "react";
import {createPortal} from "react-dom";
import {useTranslations} from "next-intl";
import {AnimatePresence, motion} from "motion/react";
import {X} from "lucide-react";
import {ContactForm} from "@/components/contact-form";

type QuoteModalProps = {
  triggerLabel: string;
  triggerClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

const defaultTriggerClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-[#ffda00] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#002a35] transition-colors hover:bg-white";

export function QuoteModal({triggerLabel, triggerClassName, onOpen, onClose}: QuoteModalProps) {
  const t = useTranslations("quote");
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeModal = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, open]);

  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#002a35]/88 px-4 py-6 backdrop-blur-sm"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-xl border-t-8 border-[#ffda00] bg-[#f1efe8] p-6 shadow-2xl sm:p-8"
            initial={{opacity: 0, y: 24, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 12, scale: 0.99}}
            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6682c2]">{t("eyebrow")}</p>
                <h2 id={titleId} className="cargo-display zh-display zh-display-md mt-3 text-5xl text-[#002a35]">
                  {t("title")}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#002a35]/60">{t("text")}</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="grid h-10 w-10 shrink-0 place-items-center border border-[#002a35]/30 text-[#002a35] transition-colors hover:bg-[#002a35] hover:text-white"
                aria-label={t("close")}
              >
                <X size={18} />
              </button>
            </div>
            <ContactForm source="quote-modal" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className={triggerClassName || defaultTriggerClass}
      >
        {triggerLabel}
      </button>
      {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </>
  );
}
