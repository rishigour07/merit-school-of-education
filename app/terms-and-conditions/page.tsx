import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Website terms and conditions for Merit School of Education Rampura.",
  alternates: { canonical: "/terms-and-conditions" }
};

const sections = [
  {
    title: "Website Purpose",
    paragraphs: [
      "This website provides general information about Merit School of Education Rampura, including academics, facilities, activities, admissions and contact details.",
      "Information shown online is intended for guidance and may be updated by the school when sessions, schedules or policies change."
    ]
  },
  {
    title: "Admissions",
    paragraphs: [
      "Submitting an enquiry does not guarantee admission. Admission is confirmed only after the school's required process, document review and any applicable formalities are completed.",
      "Parents should confirm current class availability, fees, documents and important dates directly with the school office."
    ]
  },
  {
    title: "Acceptable Use",
    paragraphs: [
      "Visitors must not misuse the website, attempt unauthorized access, submit false or harmful information, or interfere with its availability and security."
    ]
  },
  {
    title: "External Links",
    paragraphs: [
      "Links to WhatsApp, Google Maps, Instagram and email are provided for convenience. The school is not responsible for the content or availability of those external services."
    ]
  },
  {
    title: "Content and Availability",
    paragraphs: [
      "The school aims to keep website content accurate and available, but does not guarantee uninterrupted access or that every item will always be free from error.",
      "School branding, written content and original materials may not be copied or reused in a misleading manner without permission."
    ]
  }
];

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      eyebrow="Website Information"
      title="Terms & Conditions"
      introduction="These terms describe the appropriate use of the Merit School website and the status of information provided through it."
      sections={sections}
    />
  );
}
