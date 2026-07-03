"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, X } from "lucide-react";
import AdmissionEnquiryForm from "@/components/AdmissionEnquiryForm";
import { admissionModalEvent } from "@/components/AdmissionModalTrigger";

export default function AdmissionEnquiryModal() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  function close() {
    setOpen(false);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  }

  useEffect(() => {
    const handleOpen = () => {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(admissionModalEvent, handleOpen);
    return () => window.removeEventListener(admissionModalEvent, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])')
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admission-modal-title"
        className="my-6 w-full max-w-2xl rounded-lg border border-royal-100 bg-white p-5 shadow-premium sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-royal-800">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-royal-600">Admission Enquiry</p>
              <h2 id="admission-modal-title" className="text-xl font-black text-ink sm:text-2xl">Apply to Merit School</h2>
            </div>
          </div>
          <button type="button" onClick={close} aria-label="Close admission enquiry" className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50">
            <X className="h-5 w-5" />
          </button>
        </div>
        <AdmissionEnquiryForm compact />
      </div>
    </div>
  );
}
