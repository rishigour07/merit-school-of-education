import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Download,
  GraduationCap,
  Languages,
  MessageCircle,
  Phone,
  ShieldCheck
} from "lucide-react";
import AdmissionModalTrigger from "@/components/AdmissionModalTrigger";
import FeedbackButton from "@/components/FeedbackButton";
import Reveal from "@/components/Reveal";
import { admissionMessage, school, whatsappNumber } from "@/lib/school";
import type { AdmissionContent } from "@/lib/content";

export default function AdmissionInfo({ content }: { content?: AdmissionContent }) {
  const admission = content || {
    session: "2025-26",
    status: "open",
    classesOffered: school.classes,
    medium: school.medium,
    officeTiming: school.officeTime,
    schoolCode: school.schoolCode,
    diseCode: school.diseCode,
    documentsRequired: [],
    ctaText: "Apply for Admission"
  };
  const admissionFacts = [
    { label: "Classes", value: admission.classesOffered, icon: GraduationCap },
    { label: "Medium", value: admission.medium, icon: Languages },
    { label: "Office Time", value: admission.officeTiming, icon: Clock },
    { label: "Campus", value: "Safe & Disciplined", icon: ShieldCheck }
  ];
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    admissionMessage
  )}`;

  return (
    <section id="admissions" className="section-y bg-royal-700 text-white">
      <div className="container-pad">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-gold-200">
                <BadgeCheck className="h-4 w-4" />
                Admission {admission.status === "open" ? "Open" : "Closed"} {admission.session}
              </div>
              <h2 className="text-balance text-4xl font-black leading-tight sm:text-5xl">
                Begin your child&apos;s Merit School journey.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
                Admissions are open for Play Group to 10th Class. Parents can
                contact the admission office during working hours for guidance,
                documents and school visit support.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AdmissionModalTrigger
                  ariaLabel="Apply for admission"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-6 py-4 text-base font-black text-royal-900 transition hover:-translate-y-1 hover:bg-gold-200"
                >
                  {admission.ctaText}
                  <ArrowRight className="h-5 w-5" />
                </AdmissionModalTrigger>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:bg-white/16"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Admission Office
                </a>
                <a
                  href={`tel:${school.phones[0]}`}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:bg-white/16"
                >
                  <Phone className="h-5 w-5" />
                  Call Admission Office
                </a>
                <FeedbackButton
                  message="Prospectus will be available soon."
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:bg-white/16"
                >
                  <Download className="h-5 w-5" />
                  Download Prospectus
                </FeedbackButton>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {admissionFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="rounded-lg border border-white/12 bg-white/10 p-6 shadow-soft backdrop-blur"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-royal-800">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-gold-200">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-xl font-black leading-7 text-white">
                      {fact.value}
                    </p>
                  </div>
                );
              })}
              <div className="rounded-lg border border-white/12 bg-white p-6 text-royal-900 shadow-soft sm:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-royal-600">
                  Official Details
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <p className="rounded-md bg-royal-50 px-4 py-3 text-lg font-black">
                    School Code: {admission.schoolCode}
                  </p>
                  <p className="rounded-md bg-gold-50 px-4 py-3 text-lg font-black">
                    DISE Code: {admission.diseCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
