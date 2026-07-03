"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Images,
  Languages,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { school, schoolPhotos } from "@/lib/school";
import type { HeroContent } from "@/lib/content";

const highlights = [
  { label: "Play Group to 10th", icon: GraduationCap },
  { label: "English & Hindi Medium", icon: Languages },
  { label: "Safe & Disciplined Campus", icon: ShieldCheck },
  { label: "Experienced Teachers", icon: UsersRound }
];

export default function Hero({ content }: { content?: HeroContent }) {
  const reduceMotion = useReducedMotion();
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
    heroImageUrl: schoolPhotos.campus,
    admissionStatusText: school.admission
  };
  const legacyHeadings = new Set([
    school.name,
    "Shaping Bright Futures with Learning and Values"
  ]);
  const mainHeading = legacyHeadings.has(hero.mainHeading)
    ? premiumHeading
    : hero.mainHeading;
  const subheading = hero.subheading.startsWith("A place where learning")
    ? premiumSubheading
    : hero.subheading;

  return (
    <section
      id="home"
      aria-label="Merit School campus and admissions"
      className="relative isolate overflow-hidden bg-royal-900 text-white"
    >
      <motion.div
        className="absolute inset-0 -z-30"
        animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={hero.heroImageUrl || schoolPhotos.campus}
          alt="Merit School of Education Rampura campus building"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_center]"
        />
      </motion.div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(7,17,55,0.96)_0%,rgba(13,31,101,0.86)_38%,rgba(11,28,74,0.38)_67%,rgba(7,18,48,0.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,14,45,0.20)_0%,rgba(5,14,45,0.06)_45%,rgba(5,14,45,0.78)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/35" />

      <div className="container-pad flex min-h-[46rem] flex-col justify-between pb-5 pt-28 sm:min-h-[54rem] sm:pb-8 sm:pt-36 lg:min-h-[47rem] lg:pt-40 xl:min-h-[50rem]">
        <div className="max-w-[44rem] lg:max-w-[40rem]">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-bold text-white shadow-soft backdrop-blur-md">
            <BadgeCheck className="h-4 w-4 text-gold-300" />
            {hero.badgeText}
          </div>

          <p
            className="hero-reveal mt-4 text-sm font-bold uppercase tracking-[0.14em] text-gold-200 sm:mt-6"
            style={{ animationDelay: "80ms" }}
          >
            {school.name}
          </p>

          <h1
            className="hero-reveal mt-2 max-w-[16ch] text-balance text-4xl font-bold leading-[1.1] tracking-normal text-white sm:mt-3 sm:text-5xl lg:text-[3.55rem] xl:text-[4rem]"
            style={{ animationDelay: "160ms" }}
          >
            {mainHeading}
          </h1>

          <p
            className="hero-reveal mt-4 max-w-[39rem] text-base font-medium leading-7 text-white/86 sm:mt-5 sm:text-lg sm:leading-8"
            style={{ animationDelay: "240ms" }}
          >
            {subheading}
          </p>

          <div
            className="hero-reveal mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap sm:gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <a
              href="#admissions"
              className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-1.5 rounded-lg bg-gold-300 px-3 py-3 text-sm font-bold text-royal-900 shadow-premium transition hover:-translate-y-0.5 hover:bg-gold-200 sm:min-h-14 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              {hero.ctaText || "Explore Admissions"}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#gallery"
              className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-1.5 rounded-lg border border-white/35 bg-white/12 px-3 py-3 text-sm font-bold text-white shadow-soft backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20 sm:min-h-14 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              <Images className="h-5 w-5" />
              View Gallery
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-10 sm:gap-3 lg:grid-cols-4">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.label}
                initial={false}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, index % 2 === 0 ? -4 : 4, 0] }
                }
                transition={{
                  y: reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 6.5 + index * 0.35,
                        delay: 0.5 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                }}
                className="flex min-h-16 items-center gap-2 rounded-lg border border-white/20 bg-royal-900/60 px-2.5 py-2.5 shadow-premium backdrop-blur-md sm:min-h-[4.75rem] sm:gap-3 sm:px-4 sm:py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-300 text-royal-900 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="text-[11px] font-bold leading-4 text-white sm:text-sm sm:leading-5">
                  {highlight.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
