"use client";

import type { ReactNode } from "react";

export const admissionModalEvent = "merit:open-admission-enquiry";

export default function AdmissionModalTrigger({
  children,
  className,
  ariaLabel
}: {
  children: ReactNode;
  className: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => window.dispatchEvent(new CustomEvent(admissionModalEvent))}
    >
      {children}
    </button>
  );
}
