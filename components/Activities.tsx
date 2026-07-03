import Image from "next/image";
import {
  Award,
  CalendarHeart,
  Dumbbell,
  Mic2,
  Palette,
  ShieldCheck,
  Sparkles,
  Trophy
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { schoolPhotos } from "@/lib/school";
import type { ContentCard } from "@/lib/content";

const activities = [
  { title: "Sports", icon: Trophy, image: schoolPhotos.sports },
  { title: "Cultural Programs", icon: Mic2, image: schoolPhotos.assembly },
  { title: "Morning Assembly", icon: ShieldCheck, image: schoolPhotos.students },
  { title: "Art & Craft", icon: Palette, image: schoolPhotos.activity },
  { title: "Personality Development", icon: Sparkles, image: schoolPhotos.hero },
  { title: "Moral Education", icon: CalendarHeart, image: schoolPhotos.classroom },
  { title: "Competitions", icon: Award, image: schoolPhotos.teacher },
  { title: "Celebration Days", icon: Dumbbell, image: schoolPhotos.sports }
];

export default function Activities({ items }: { items?: ContentCard[] }) {
  const activitiesToShow = items?.length
    ? items.map((item, index) => ({
        title: item.title,
        icon: activities[index]?.icon || Sparkles,
        image: item.imageUrl || activities[index]?.image || schoolPhotos.activity
      }))
    : activities;

  return (
    <section id="beyond-classroom" className="section-y bg-mist">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Beyond Classroom"
            title="A school life that builds confidence beyond books."
            description="Sports, culture, creativity and shared experiences help students build confidence, teamwork and character."
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {activitiesToShow.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Reveal key={activity.title} delay={index * 0.03}>
                <article className="group h-full overflow-hidden rounded-lg bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/56 to-transparent opacity-80" />
                    <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-royal-800">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-ink">{activity.title}</h3>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
