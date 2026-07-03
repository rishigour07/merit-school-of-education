import Image from "next/image";
import { Baby, BookOpenCheck, GraduationCap, School } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { schoolPhotos } from "@/lib/school";
import type { ContentCard } from "@/lib/content";

const programs = [
  {
    title: "Play Group",
    text: "Activity-based learning, classroom routine, language exposure and joyful confidence building.",
    icon: Baby
  },
  {
    title: "Primary Classes",
    text: "Concept clarity, reading habits, numeracy, regular practice, discipline and values.",
    icon: BookOpenCheck
  },
  {
    title: "Middle Classes",
    text: "Regular assessment, guided learning, communication skills and responsibility.",
    icon: School
  },
  {
    title: "High School up to 10th",
    text: "Focused academics, exam readiness, confidence building and strong study habits.",
    icon: GraduationCap
  }
];

export default function Academics({ items }: { items?: ContentCard[] }) {
  const programsToShow = items?.length
    ? items.map((item, index) => ({
        title: item.title,
        text: item.description,
        icon: programs[index]?.icon || GraduationCap
      }))
    : programs;

  return (
    <section id="academics" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Academics"
            title="A strong academic program from Play Group to Class 10."
            description="Each stage supports activity-based learning, concept clarity, regular assessment, discipline, values and confidence building."
          />
        </Reveal>

        <div className="mt-9 grid items-stretch gap-5 sm:mt-10 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-lg bg-royal-50 shadow-premium lg:min-h-[430px]">
              <Image
                src={schoolPhotos.teacher}
                alt="Teacher with students in classroom"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {programsToShow.map((program, index) => {
              const Icon = program.icon;
              return (
                <Reveal key={program.title} delay={index * 0.04}>
                  <div className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-2xl font-black text-ink">
                      {program.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {program.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
