import { MessageCircle } from "lucide-react";
import AdmissionEnquiryForm from "@/components/AdmissionEnquiryForm";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function EnquiryForm() {
  return (
    <section id="enquiry" className="section-y bg-royal-700 text-white">
      <div className="container-pad grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <SectionHeading
            align="left"
            inverse
            eyebrow="Enquiry Form"
            title="Connect with the admission office."
            description="Share a few details. Your enquiry will be saved when Supabase is configured and WhatsApp will open with the completed admission message."
          />
          <div className="mt-8 rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-300 text-royal-900">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black">WhatsApp Admission Office</p>
                <p className="text-sm font-semibold text-white/70">9926909903</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <AdmissionEnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
