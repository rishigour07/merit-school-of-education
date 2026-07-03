import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Testimonial } from "@/lib/content";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="section-y bg-royal-700 text-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            inverse
            eyebrow="Parent Testimonials"
            title="Trust built through everyday school experience."
            description="What families value about the school's caring, disciplined and confidence-building environment."
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {items.slice(0, 6).map((testimonial, index) => (
            <Reveal key={testimonial.id || testimonial.parentName} delay={index * 0.04}>
              <article className="h-full rounded-lg border border-white/12 bg-white/10 p-6 shadow-soft backdrop-blur">
                <div className="flex gap-1 text-gold-300">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-white/82">
                  {testimonial.message}
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <h3 className="font-black text-white">{testimonial.parentName}</h3>
                  <p className="mt-1 text-sm font-semibold text-white/66">
                    {testimonial.studentClass}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
