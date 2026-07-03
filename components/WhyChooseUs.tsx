import {
  BookMarked,
  Drama,
  GraduationCap,
  Languages,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Trophy
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  {
    title: "Academic Excellence",
    text: "Focused classroom learning with regular practice and guidance.",
    icon: BookMarked
  },
  {
    title: "Holistic Development",
    text: "Balanced attention to academics, activities, confidence and values.",
    icon: Sparkles
  },
  {
    title: "Experienced Teachers",
    text: "Supportive teachers who help students learn with care and clarity.",
    icon: GraduationCap
  },
  {
    title: "Safe Campus",
    text: "A disciplined, positive and parent-friendly school environment.",
    icon: ShieldCheck
  },
  {
    title: "English & Hindi Medium",
    text: "Learning support for families through both English and Hindi medium.",
    icon: Languages
  },
  {
    title: "Cultural Activities",
    text: "Programs that build expression, confidence and participation.",
    icon: Drama
  },
  {
    title: "Sports Development",
    text: "Sports and physical activities for energy, teamwork and balance.",
    icon: Trophy
  },
  {
    title: "Parent Communication",
    text: "Clear school-parent connect for better student support.",
    icon: MessagesSquare
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section-y bg-soft-section">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Merit School"
            title="A school designed for academics, discipline and all-round growth."
            description="Parents choose Merit School for its balanced approach: clear learning, strong values, safety, activities and communication."
          />
        </Reveal>
        <div className="mt-9 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={index * 0.03}>
                <div className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {reason.text}
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
