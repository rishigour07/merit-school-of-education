import Image from "next/image";
import { BookOpenCheck, HandHeart, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { schoolPhotos } from "@/lib/school";
import type { AboutContent } from "@/lib/content";

const fallbackValues = [
  {
    title: "शिक्षा",
    subtitle: "Quality learning with clarity and confidence.",
    icon: BookOpenCheck
  },
  {
    title: "सेवा",
    subtitle: "A caring school culture built on respect.",
    icon: HandHeart
  },
  {
    title: "संस्कार",
    subtitle: "Values, discipline and responsible conduct.",
    icon: Sparkles
  }
];

export default function About({ content }: { content?: AboutContent }) {
  const values = (
    content?.values?.length ? content.values : fallbackValues.map((value) => value.title)
  ).map((title, index) => ({
    title,
    subtitle:
      fallbackValues[index]?.subtitle ||
      "A core school value that guides student growth.",
    icon: fallbackValues[index]?.icon || Sparkles
  }));

  return (
    <section id="about" className="section-y bg-white">
      <div className="container-pad grid items-center gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:gap-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-royal-50 shadow-premium">
            <Image
              src={content?.imageUrl || schoolPhotos.campus}
              alt="Modern school building"
              width={1340}
              height={520}
              className="block aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/92 p-5 shadow-soft backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-royal-600">
                Welcome Section
              </p>
              <p className="mt-2 text-lg font-black text-ink">
                A calm, disciplined and value-based learning environment.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            align="left"
            eyebrow="Welcome"
            title={content?.heading || "Welcome to Merit School of Education Rampura"}
            description={
              content?.description ||
              "Merit School of Education Rampura is committed to creating a positive learning environment where students grow with knowledge, discipline, confidence and values. The school believes in holistic education through academics, sports, cultural activities and moral development."
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-royal-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-black text-royal-800">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
