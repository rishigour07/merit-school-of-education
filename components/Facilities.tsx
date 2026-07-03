import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Castle,
  Library,
  MessagesSquare,
  Presentation,
  Shield,
  Trophy
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { schoolPhotos } from "@/lib/school";
import type { ContentCard } from "@/lib/content";

const facilities = [
  { title: "Smart Classrooms", icon: Presentation },
  { title: "Experienced Faculty", icon: BookOpen },
  { title: "Library Support", icon: Library },
  { title: "Sports Activities", icon: Trophy },
  { title: "Cultural Programs", icon: CalendarDays },
  { title: "Safe Campus", icon: Shield },
  { title: "Regular Guidance", icon: Castle },
  { title: "Parent Communication", icon: MessagesSquare }
];

export default function Facilities({ items }: { items?: ContentCard[] }) {
  const facilitiesToShow = items?.length
    ? items.map((item, index) => ({
        title: item.title,
        icon: facilities[index]?.icon || Shield
      }))
    : facilities;

  return (
    <section id="facilities" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Facilities"
            title="A school environment designed for meaningful daily learning."
            description="From classroom learning to sports, cultural programs and parent communication, the school supports children with a practical and caring setup."
          />
        </Reveal>

        <div className="mt-9 grid gap-5 sm:mt-10 lg:grid-cols-[0.98fr_1.02fr]">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {facilitiesToShow.map((facility) => {
                const Icon = facility.icon;
                return (
                  <div
                    key={facility.title}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-black text-ink">
                      {facility.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-lg bg-royal-50 shadow-premium lg:min-h-[420px]">
              <Image
                src={schoolPhotos.library}
                alt="Students reading and learning with library support"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/92 p-5 shadow-soft backdrop-blur">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-royal-600">
                  Parent-friendly care
                </p>
                <p className="mt-2 text-lg font-black text-ink">
                  Regular guidance, communication and a safe routine for students.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
