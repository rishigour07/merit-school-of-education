import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Merit School of Education Rampura website.",
  alternates: { canonical: "/privacy-policy" }
};

const sections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "When a parent or guardian submits an admission enquiry, we may collect the parent name, student name, class of interest, phone number and optional message provided in the form.",
      "Basic technical information may also be processed by our hosting provider to operate, secure and improve the website."
    ]
  },
  {
    title: "How Information Is Used",
    paragraphs: [
      "Enquiry details are used only to respond to admission questions, arrange school visits, provide requested information and support school-parent communication.",
      "We do not sell personal information or use enquiry details for unrelated advertising."
    ]
  },
  {
    title: "Storage and Security",
    paragraphs: [
      "Where the school database is enabled, submitted enquiries are stored in the school's secured administration system. Access is limited to authorized school administrators.",
      "No online system can guarantee absolute security, but reasonable technical and organizational safeguards are used to protect submitted information."
    ]
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "The website may open WhatsApp, Google Maps, Instagram or email services when a visitor chooses those actions. Their own privacy policies apply after leaving this website."
    ]
  },
  {
    title: "Your Choices",
    paragraphs: [
      "Parents and guardians may contact the school to ask about, correct or request deletion of enquiry information, subject to applicable record-keeping requirements."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Website Information"
      title="Privacy Policy"
      introduction="This policy explains how Merit School of Education Rampura handles information submitted through its public website."
      sections={sections}
    />
  );
}
