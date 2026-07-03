import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { school } from "@/lib/school";

export default function PrincipalMessage() {
  return (
    <section id="principal-message" className="bg-soft-section py-11 sm:py-16">
      <div className="container-pad">
        <Reveal>
          <div className="grid items-center gap-8 rounded-lg border border-royal-100 bg-white p-6 shadow-premium sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:p-10">
            <div className="flex items-center gap-5 lg:block">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-gold-200 bg-white p-2 shadow-soft lg:mx-auto lg:h-44 lg:w-44">
                <Image
                  src="/assets/logo.png"
                  alt="Merit School of Education Rampura Logo"
                  width={192}
                  height={192}
                  sizes="(min-width: 1024px) 160px, 96px"
                  className="h-24 w-24 object-contain lg:h-40 lg:w-40"
                />
              </div>
              <div className="lg:mt-6 lg:text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-royal-600">
                  Principal&apos;s Message
                </p>
                <h2 className="mt-2 text-2xl font-black text-ink">
                  {school.taglineHindi}
                </h2>
              </div>
            </div>

            <div>
              <Quote className="h-10 w-10 text-gold-400" />
              <p className="mt-5 text-balance text-2xl font-black leading-snug text-ink sm:text-3xl">
                &quot;At Merit School of Education Rampura, our aim is to nurture
                every child with knowledge, discipline and strong values.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                We believe education is not only about books, but about building a
                confident, responsible and successful future citizens.&quot;
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-royal-50 px-4 py-2 text-sm font-black text-royal-800">
                <Sparkles className="h-4 w-4 text-gold-500" />
                Merit School of Education Rampura
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
