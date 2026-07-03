import { Eye, Flag, HeartHandshake, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const cards = [
  {
    title: "Vision",
    text: "To nurture happy, confident and responsible learners through quality education, discipline and strong values.",
    icon: Eye
  },
  {
    title: "Mission",
    text: "To provide a safe, inspiring and value-based learning environment where every student can develop academically, socially, emotionally and morally.",
    icon: Flag
  }
];

const values = [
  { label: "Discipline with care", icon: ShieldCheck },
  { label: "Confidence with humility", icon: HeartHandshake }
];

export default function VisionMission() {
  return (
    <section id="vision-mission" className="section-y bg-mist">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Vision & Mission"
            title="A clear purpose for every learner."
            description="The school's direction is simple: help children learn well, behave well and grow into responsible future citizens."
          />
        </Reveal>

        <div className="mt-9 grid gap-5 sm:mt-10 lg:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <div className="h-full rounded-lg border border-royal-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium sm:p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-3xl font-bold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <div id="values" className="grid gap-4 rounded-lg border border-royal-100 bg-white p-5 shadow-soft sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.label} className="flex items-center gap-3 rounded-lg bg-royal-50 p-4">
                  <Icon className="h-5 w-5 text-royal-700" />
                  <span className="font-black text-slate-800">{value.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
