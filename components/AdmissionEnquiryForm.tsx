"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send, UserRound } from "lucide-react";
import { whatsappNumber } from "@/lib/school";

type FormErrors = Partial<Record<"parentName" | "studentName" | "classInterested" | "phoneNumber", string>>;

export default function AdmissionEnquiryForm({
  compact = false,
  onSuccess
}: {
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const phoneDigits = String(form.get("phoneNumber") || "").replace(/\D/g, "");
    const normalizedPhone = phoneDigits.startsWith("91") && phoneDigits.length === 12
      ? phoneDigits.slice(2)
      : phoneDigits;
    const payload = {
      parentName: String(form.get("parentName") || "").trim(),
      studentName: String(form.get("studentName") || "").trim(),
      classInterested: String(form.get("classInterested") || "").trim(),
      phoneNumber: normalizedPhone,
      message: String(form.get("message") || "").trim()
    };
    const nextErrors: FormErrors = {};
    if (payload.parentName.length < 2) nextErrors.parentName = "Parent name is required.";
    if (payload.studentName.length < 2) nextErrors.studentName = "Student name is required.";
    if (!payload.classInterested) nextErrors.classInterested = "Class is required.";
    if (!/^[6-9]\d{9}$/.test(payload.phoneNumber)) {
      nextErrors.phoneNumber = "Enter a valid 10-digit Indian mobile number.";
    }
    setFieldErrors(nextErrors);
    setError("");
    setSuccess("");
    if (Object.keys(nextErrors).length) return;

    const text = [
      "Hello Merit School, I want admission information.",
      "",
      `Parent Name: ${payload.parentName}`,
      `Student Name: ${payload.studentName}`,
      `Class: ${payload.classInterested}`,
      `Phone: ${payload.phoneNumber}`,
      `Message: ${payload.message || "Not provided"}`
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        whatsappWindow?.close();
        setError(result.error || "Could not submit the enquiry. Please try again.");
        return;
      }

      setSuccess("Thank you! Your admission enquiry has been submitted.");
      formElement.reset();
      onSuccess?.();
      if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
      else window.location.href = whatsappUrl;
    } catch {
      whatsappWindow?.close();
      setError("Network error. Please call or WhatsApp the school directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "focus-ring w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-ink";
  const fieldError = (name: keyof FormErrors) => fieldErrors[name] ? (
    <span className="text-sm font-bold text-rose-600">{fieldErrors[name]}</span>
  ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={compact ? "grid gap-4" : "rounded-lg bg-white p-6 text-ink shadow-premium sm:p-8"}
    >
      {!compact ? (
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-royal-800">
            <UserRound className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Parent Enquiry</p>
            <h3 className="text-2xl font-black text-ink">Admission Information</h3>
          </div>
        </div>
      ) : null}

      <div className={`${compact ? "" : "mt-7"} grid gap-4 sm:grid-cols-2`}>
        <label className="grid gap-2">
          <span className="text-sm font-black text-slate-700">Parent Name</span>
          <input autoFocus={compact} name="parentName" className={inputClass} placeholder="Parent name" aria-invalid={!!fieldErrors.parentName} />
          {fieldError("parentName")}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-black text-slate-700">Student Name</span>
          <input name="studentName" className={inputClass} placeholder="Student name" aria-invalid={!!fieldErrors.studentName} />
          {fieldError("studentName")}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-black text-slate-700">Class Interested</span>
          <input name="classInterested" className={inputClass} placeholder="Example: Class 1" aria-invalid={!!fieldErrors.classInterested} />
          {fieldError("classInterested")}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-black text-slate-700">Phone Number</span>
          <input name="phoneNumber" inputMode="tel" maxLength={13} className={inputClass} placeholder="10-digit mobile number" aria-invalid={!!fieldErrors.phoneNumber} />
          {fieldError("phoneNumber")}
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-black text-slate-700">Message <span className="font-semibold text-slate-400">(optional)</span></span>
          <textarea name="message" rows={compact ? 3 : 5} maxLength={800} className={`${inputClass} resize-none`} placeholder="Tell us what you would like to know" />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="focus-ring mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal-700 px-6 py-4 text-base font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-royal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {submitting ? "Submitting Enquiry..." : "Submit & Open WhatsApp"}
      </button>
      <div aria-live="polite">
        {error ? <p className="mt-3 rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p> : null}
        {success ? <p className="mt-3 rounded-md bg-leaf-50 px-4 py-3 text-sm font-bold text-leaf-700">{success}</p> : null}
      </div>
    </form>
  );
}
