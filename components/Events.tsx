import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import DetailsDialogButton from "@/components/DetailsDialogButton";
import type { ContentCard } from "@/lib/content";
import { schoolPhotos } from "@/lib/school";

export default function Events({ items }: { items: ContentCard[] }) {
  return (
    <section id="events" className="section-y bg-mist">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Latest Events"
            title="School programs that build confidence and participation."
            description="Explore school programs, important dates and community activities that bring learning to life."
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {items.slice(0, 3).map((event, index) => (
            <Reveal key={event.id || event.title} delay={index * 0.04}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
                <div className="relative aspect-[4/3] bg-royal-50">
                  <Image
                    src={event.imageUrl || schoolPhotos.activity}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.12em] text-royal-600">
                    {event.date ? (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {event.date}
                      </span>
                    ) : null}
                    {event.location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-ink">{event.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-600">{event.description}</p>
                  <DetailsDialogButton
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    label="View Details"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
