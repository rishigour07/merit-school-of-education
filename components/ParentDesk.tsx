import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ClipboardList,
  MapPin,
  MessageCircle
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AdmissionModalTrigger from "@/components/AdmissionModalTrigger";
import { admissionMessage, school, whatsappNumber } from "@/lib/school";

const deskItems = [
  {
    title: "Admission Enquiry",
    text: school.admission,
    href: "#enquiry",
    opensEnquiry: true,
    icon: BadgeCheck,
    tone: "bg-royal-700 text-white"
  },
  {
    title: "Academic Range",
    text: school.classes,
    href: "#academics",
    icon: ClipboardList,
    tone: "bg-white text-ink"
  },
  {
    title: "Office Hours",
    text: school.officeTime,
    href: "#contact",
    icon: CalendarDays,
    tone: "bg-white text-ink"
  },
  {
    title: "Visit Campus",
    text: "Rampura, Sirali, Harda",
    href: "#contact",
    icon: MapPin,
    tone: "bg-white text-ink"
  }
];

export default function ParentDesk() {
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    admissionMessage
  )}`;

  return (
    <section className="relative z-10 -mt-8 pb-6 sm:-mt-10 sm:pb-8">
      <div className="container-pad">
        <Reveal>
          <div className="rounded-lg border border-royal-100 bg-white p-3 shadow-premium">
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_0.82fr]">
              {deskItems.map((item) => {
                const Icon = item.icon;
                const isDark = item.tone.includes("royal");
                const content = (
                  <>
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                        isDark ? "bg-white text-royal-800" : "bg-royal-50 text-royal-700"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className={`block text-xs font-black uppercase tracking-[0.14em] ${isDark ? "text-gold-200" : "text-slate-500"}`}>
                        {item.title}
                      </span>
                      <span className="mt-2 block text-base font-black leading-6">{item.text}</span>
                    </span>
                  </>
                );
                const className = `group flex min-h-32 items-center gap-4 rounded-lg border p-5 text-left transition hover:-translate-y-1 hover:shadow-soft ${
                  isDark
                    ? "border-royal-700 bg-royal-700 text-white"
                    : "border-slate-200 bg-white text-ink hover:border-royal-200"
                }`;
                if ("opensEnquiry" in item && item.opensEnquiry) {
                  return (
                    <AdmissionModalTrigger key={item.title} ariaLabel="Open admission enquiry" className={className}>
                      {content}
                    </AdmissionModalTrigger>
                  );
                }
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className={className}
                  >
                    {content}
                  </a>
                );
              })}

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-32 items-center justify-between gap-4 rounded-lg border border-gold-200 bg-gold-300 p-5 text-royal-900 transition hover:-translate-y-1 hover:bg-gold-200 hover:shadow-soft"
              >
                <span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-royal-800">
                    <MessageCircle className="h-6 w-6" />
                  </span>
                  <span className="mt-4 block text-xs font-black uppercase tracking-[0.14em]">
                    Quick Connect
                  </span>
                  <span className="mt-2 block text-base font-black">
                    WhatsApp School Office
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
