"use client";

import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { Loader2, Send } from "lucide-react";
import { contactMessageSchema } from "@/lib/validation";

type FieldName = "name" | "phoneNumber" | "email" | "subject" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

export default function ContactMessageForm() {
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const payload = {
      name: String(data.get("name") || ""),
      phoneNumber: String(data.get("phoneNumber") || ""),
      email: String(data.get("email") || ""),
      subject: String(data.get("subject") || ""),
      message: String(data.get("message") || "")
    };
    const parsed = contactMessageSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as FieldName;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setFieldErrors(nextErrors);
      setFeedback(null);
      return;
    }

    setSubmitting(true);
    setFieldErrors({});
    setFeedback(null);
    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const result = (await response.json()) as { ok?: boolean; saved?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setFeedback({ type: "error", message: result.error || "Could not send your message." });
        return;
      }

      formElement.reset();
      setFeedback({
        type: "success",
        message: result.saved
          ? "Thank you. Your message has been sent to the school office."
          : "Message validated. Please call or email the school while online storage is being configured."
      });
    } catch {
      setFeedback({ type: "error", message: "Network error. Please call the school office directly." });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "focus-ring w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-ink";

  return (
    <form onSubmit={handleSubmit} noValidate className="h-full rounded-lg border border-royal-100 bg-mist p-5 shadow-soft sm:p-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-royal-600">Send a Message</p>
      <h3 className="mt-2 text-2xl font-bold text-ink">How can we help?</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">The school office will respond during working hours.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Your Name" error={fieldErrors.name}>
          <input name="name" autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} className={inputClass} placeholder="Parent or guardian name" />
        </Field>
        <Field label="Phone Number" error={fieldErrors.phoneNumber}>
          <input name="phoneNumber" autoComplete="tel" inputMode="tel" maxLength={13} aria-invalid={Boolean(fieldErrors.phoneNumber)} className={inputClass} placeholder="10-digit mobile number" />
        </Field>
        <Field label="Email (optional)" error={fieldErrors.email}>
          <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} className={inputClass} placeholder="you@example.com" />
        </Field>
        <Field label="Subject" error={fieldErrors.subject}>
          <input name="subject" aria-invalid={Boolean(fieldErrors.subject)} className={inputClass} placeholder="Admission, visit or support" />
        </Field>
        <Field label="Message" error={fieldErrors.message} className="sm:col-span-2">
          <textarea name="message" rows={5} maxLength={1200} aria-invalid={Boolean(fieldErrors.message)} className={`${inputClass} resize-none`} placeholder="Write your message" />
        </Field>
      </div>

      <button type="submit" disabled={submitting} className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal-700 px-6 py-4 text-base font-bold text-white transition hover:bg-royal-800 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {submitting ? "Sending Message..." : "Send Message"}
      </button>

      <div aria-live="polite">
        {feedback ? (
          <p className={`mt-4 rounded-md px-4 py-3 text-sm font-bold ${feedback.type === "success" ? "bg-leaf-50 text-leaf-700" : "bg-rose-50 text-rose-700"}`}>
            {feedback.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <label className={`grid min-w-0 gap-2 ${className}`}>
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-sm font-bold text-rose-600">{error}</span> : null}
    </label>
  );
}
