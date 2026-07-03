"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Download, MapPin, X } from "lucide-react";

export default function DetailsDialogButton({
  title,
  description,
  date,
  location,
  attachmentUrl,
  label = "Read More"
}: {
  title: string;
  description: string;
  date?: string;
  location?: string;
  attachmentUrl?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    setToast("");
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="focus-ring mt-5 inline-flex items-center rounded-full border border-royal-100 bg-white px-4 py-2 text-sm font-black text-royal-800 transition hover:bg-royal-50">
        {label}
      </button>
      {open ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-ink/55 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="details-dialog-title" className="w-full max-w-xl rounded-lg bg-white p-6 shadow-premium sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-royal-600">School Update</p>
                <h2 id="details-dialog-title" className="mt-2 text-2xl font-black text-ink">{title}</h2>
              </div>
              <button ref={closeRef} type="button" onClick={close} aria-label="Close details" className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            {(date || location) ? (
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-royal-700">
                {date ? <span className="inline-flex items-center gap-2 rounded-full bg-royal-50 px-3 py-2"><CalendarDays className="h-4 w-4" />{date}</span> : null}
                {location ? <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-2"><MapPin className="h-4 w-4" />{location}</span> : null}
              </div>
            ) : null}
            <p className="mt-6 leading-8 text-slate-600">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {attachmentUrl ? (
                <a href={attachmentUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-royal-700 px-5 py-3 text-sm font-black text-white">
                  <Download className="h-4 w-4" /> Open Attachment
                </a>
              ) : (
                <button type="button" onClick={() => setToast("No attachment available.")} className="focus-ring inline-flex items-center gap-2 rounded-full bg-royal-700 px-5 py-3 text-sm font-black text-white">
                  <Download className="h-4 w-4" /> Attachment
                </button>
              )}
              <button type="button" onClick={close} className="focus-ring rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700">Close</button>
            </div>
            {toast ? <p role="status" aria-live="polite" className="mt-4 rounded-md bg-gold-50 px-4 py-3 text-sm font-bold text-royal-900">{toast}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
