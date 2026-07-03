import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { school } from "@/lib/school";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  introduction,
  sections
}: LegalDocumentProps) {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-28 lg:pt-36">
        <header className="border-b border-royal-100 bg-mist py-12 sm:py-16">
          <div className="container-pad max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-royal-600">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {introduction}
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-500">
              Last updated: July 3, 2026
            </p>
          </div>
        </header>

        <div className="container-pad max-w-4xl py-12 sm:py-16">
          <div className="grid gap-9">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-ink">{section.title}</h2>
                <div className="mt-3 grid gap-3 text-base leading-8 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-7">
            <p className="text-sm leading-7 text-slate-600">
              Questions can be sent to{" "}
              <a className="font-bold text-royal-700 hover:text-royal-800" href={`mailto:${school.email}`}>
                {school.email}
              </a>{" "}
              or discussed with the school office during working hours.
            </p>
            <Link
              href="/#contact"
              className="focus-ring mt-5 inline-flex rounded-full bg-royal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-royal-800"
            >
              Contact the School
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
