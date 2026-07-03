"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function FeedbackButton({
  children,
  message,
  className
}: {
  children: ReactNode;
  message: string;
  className: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <>
      <button type="button" onClick={() => setVisible(true)} className={className}>
        {children}
      </button>
      {visible ? (
        <div role="status" aria-live="polite" className="fixed bottom-6 left-4 right-4 z-[120] mx-auto flex max-w-md items-center gap-3 rounded-lg border border-royal-100 bg-white px-5 py-4 text-sm font-black text-royal-900 shadow-premium">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-500" />
          {message}
        </div>
      ) : null}
    </>
  );
}
