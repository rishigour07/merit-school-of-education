import { ClipboardCheck, Handshake, School } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    title: "Submit Enquiry",
    text: "Parents fill the admission enquiry form or contact the school office.",
    icon: ClipboardCheck
  },
  {
    title: "School Connects",
    text: "Our admission team connects with parents and explains the process.",
    icon: Handshake
  },
  {
    title: "Visit & Admission",
    text: "Parents visit the school and complete the admission process with required documents.",
    icon: School
  }
];

export default function HowToApply() {
  return (
    <section id="admission-process" className="section-y bg-mist">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="How To Apply"
            title="A simple 3-step admission process."
            description="Designed to make admission clear and comfortable for parents."
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:mt-10 md:grid-cols-3 md:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="relative h-full rounded-lg border border-royal-100 bg-white p-6 shadow-soft">
                  <span className="absolute right-6 top-5 text-6xl font-black text-royal-50">
                    {index + 1}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-royal-700 text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-6 text-2xl font-bold text-ink">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="relative mt-4 leading-7 text-slate-600">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
