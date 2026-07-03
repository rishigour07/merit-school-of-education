import { CheckCircle2, FileCheck2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { documentsRequired } from "@/lib/school";

export default function DocumentsRequired({ items }: { items?: string[] }) {
  const documents = items?.length ? items : documentsRequired;

  return (
    <section id="documents-required" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Documents Required"
            title="Keep these documents ready for admission."
            description="The admission office will guide parents if any document needs clarification."
          />
        </Reveal>

        <Reveal className="mt-9 sm:mt-10">
          <div className="mx-auto max-w-4xl rounded-lg border border-royal-100 bg-white p-6 shadow-premium sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                <FileCheck2 className="h-7 w-7" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-royal-600">
                  Admission Checklist
                </p>
                <h3 className="text-2xl font-black text-ink">Required documents</h3>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {documents.map((document) => (
                <div
                  key={document}
                  className="flex items-center gap-3 rounded-lg bg-mist p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-500" />
                  <span className="font-black text-slate-700">{document}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
