import Image from "next/image";
import { BookOpenCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { TeacherProfile } from "@/lib/content";
import { schoolPhotos } from "@/lib/school";

export default function Teachers({ items }: { items: TeacherProfile[] }) {
  return (
    <section id="faculty" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Teachers"
            title="A caring faculty focused on clarity, discipline and values."
            description="Our teachers guide students with subject clarity, individual attention and consistent encouragement."
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {items.slice(0, 6).map((teacher, index) => (
            <Reveal key={teacher.id || teacher.name} delay={index * 0.04}>
              <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-royal-50">
                  <Image
                    src={teacher.photoUrl || schoolPhotos.teacher}
                    alt={teacher.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-royal-600">
                    {teacher.designation || "Faculty"}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-ink">
                    {teacher.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-slate-600">
                    <span className="rounded-full bg-royal-50 px-3 py-1">
                      {teacher.qualification || teacher.subject || "Academic Guidance"}
                    </span>
                    <span className="rounded-full bg-gold-50 px-3 py-1">
                      {teacher.experience || "Experienced"}
                    </span>
                  </div>
                  <p className="mt-4 leading-7 text-slate-600">{teacher.shortBio}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-royal-50 px-4 py-2 text-sm font-black text-royal-800">
                    <BookOpenCheck className="h-4 w-4" />
                    Student-focused learning
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
