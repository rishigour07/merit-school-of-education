"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { admissionMessage, school, toWhatsAppNumber } from "@/lib/school";

export default function FloatingButtons({ phoneNumber = school.phones[0] }: { phoneNumber?: string }) {
  const [formVisible, setFormVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setHasScrolled(window.scrollY > 320);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    const section = document.getElementById("enquiry");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition ${
      formVisible
        ? "pointer-events-none translate-y-4 opacity-0"
        : hasScrolled
          ? "opacity-100"
          : "pointer-events-none translate-y-4 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100"
    }`}>
      <a
        href={`https://wa.me/${toWhatsAppNumber(phoneNumber)}?text=${encodeURIComponent(
          admissionMessage
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-leaf-500 text-white shadow-premium transition hover:-translate-y-1 hover:bg-leaf-700"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call school"
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-royal-700 text-white shadow-premium transition hover:-translate-y-1 hover:bg-royal-800 sm:hidden"
      >
        <Phone className="h-7 w-7" />
      </a>
    </div>
  );
}
