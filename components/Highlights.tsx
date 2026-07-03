"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { BookOpenCheck, BadgeCheck, Languages, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const highlights = [
  {
    value: 10,
    suffix: "th",
    label: "Play Group to 10th",
    icon: BookOpenCheck,
    caption: "Strong foundation to secondary learning"
  },
  {
    value: 2,
    suffix: "",
    label: "English & Hindi Medium",
    icon: Languages,
    caption: "Supportive bilingual learning environment"
  },
  {
    value: 100,
    suffix: "%",
    label: "Safe Learning Focus",
    icon: ShieldCheck,
    caption: "Disciplined, positive and parent-friendly"
  },
  {
    value: 2025,
    suffix: "-26",
    label: "Admission Open",
    icon: BadgeCheck,
    caption: "Admissions available for new session"
  }
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 28, stiffness: 90 });
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) =>
      setDisplay(Math.round(latest))
    );
    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Highlights() {
  return (
    <section className="section-y bg-white">
      <div className="container-pad">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="School Highlights"
            title="Real strengths parents can trust."
            description="Clear academic pathways, bilingual learning and a disciplined environment families can rely on."
          />
        </motion.div>

        <div className="mt-9 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-royal-800">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-6 text-4xl font-black text-royal-800">
                  <AnimatedNumber value={item.value} suffix={item.suffix} />
                </p>
                <h3 className="mt-2 text-lg font-bold text-ink">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
