"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Languages,
  Images,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { school, schoolPhotos } from "@/lib/school";
import type { HeroContent } from "@/lib/content";

const badges = [
  { label: "Play Group to 10th", icon: GraduationCap },
  { label: "English & Hindi Medium", icon: Languages },
  { label: "Safe & Disciplined Campus", icon: ShieldCheck },
  { label: "Experienced Teachers", icon: UsersRound }
];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay: index * 0.08, ease: "easeOut" as const }
  })
};

export default function Hero({ content }: { content?: HeroContent }) {
  const premiumHeading = "Shaping Bright Futures with Quality Education";
  const premiumSubheading =
    "A trusted English and Hindi medium school in Rampura where education, discipline and character help every child grow with confidence.";
  const hero = content || {
    badgeText: school.admission,
    mainHeading: premiumHeading,
    subheading: premiumSubheading,
    description:
      "A trusted English and Hindi medium school in Rampura for Play Group to 10th Class, focused on academic excellence, discipline, confidence and strong values.",
    ctaText: "Explore Admissions",
    heroImageUrl: schoolPhotos.hero,
    admissionStatusText: school.admission
  };
  const legacyHeadings = new Set([
    school.name,
    "Shaping Bright Futures with Learning and Values"
  ]);
  const mainHeading = legacyHeadings.has(hero.mainHeading) ? premiumHeading : hero.mainHeading;
  const subheading = hero.subheading.startsWith("A place where learning")
    ? premiumSubheading
    : hero.subheading;

  return (
    <section id="home" className="relative overflow-hidden bg-school-hero pt-28 lg:pt-36">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_right,rgba(255,201,40,0.22),transparent_38%),radial-gradient(circle_at_top_left,rgba(23,43,133,0.13),transparent_34%)]" />
      <div className="container-pad relative grid items-center gap-10 pb-16 pt-8 lg:min-h-[calc(88vh-9rem)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:pb-20">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div
            variants={textVariants}
            custom={0}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white px-4 py-2 text-sm font-bold text-royal-800 shadow-sm"
          >
            <BadgeCheck className="h-4 w-4 text-leaf-500" />
            {hero.badgeText}
          </motion.div>
          <motion.p
            variants={textVariants}
            custom={1}
            className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-royal-600"
          >
            {school.name}
          </motion.p>
          <motion.h1
            variants={textVariants}
            custom={2}
            className="max-w-[19ch] text-balance text-4xl font-bold leading-[1.14] tracking-normal text-ink sm:text-5xl lg:text-[3.35rem] xl:text-[3.8rem]"
          >
            {mainHeading}
          </motion.h1>
          <motion.p
            variants={textVariants}
            custom={3}
            className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-700 sm:text-lg sm:leading-8"
          >
            {subheading}
          </motion.p>

          <motion.div
            variants={textVariants}
            custom={4}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#admissions"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-royal-700 px-7 py-4 text-base font-bold text-white shadow-premium transition hover:-translate-y-1 hover:bg-royal-800"
            >
              {hero.ctaText}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#gallery"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-royal-200 bg-white px-7 py-4 text-base font-bold text-royal-800 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <Images className="h-5 w-5" />
              View Gallery
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="relative pb-10"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-2xl border border-white bg-white p-3 shadow-premium"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-royal-50">
              <Image
                src={hero.heroImageUrl}
                alt="Teacher with students in a classroom"
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/28 via-transparent to-transparent" />
            </div>
          </motion.div>

          <div className="absolute -bottom-2 left-3 right-3 grid gap-3 sm:left-auto sm:right-8 sm:w-[25rem]">
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.52, delay: 0.28 }}
                    className="flex min-h-20 items-center gap-3 rounded-lg border border-royal-100 bg-white/95 px-4 py-3 shadow-soft backdrop-blur"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-black leading-5 text-slate-700">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
