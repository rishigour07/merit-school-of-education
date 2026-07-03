import { notFound, redirect } from "next/navigation";

const sections = new Set([
  "hero",
  "about",
  "admissions",
  "academics",
  "facilities",
  "activities",
  "gallery",
  "notices",
  "events",
  "teachers",
  "testimonials",
  "enquiries",
  "contact-messages",
  "contact",
  "seo",
  "settings"
]);

const aliases: Record<string, string> = {
  faculty: "teachers",
  "contact-messages": "contact-messages",
  "site-settings": "settings"
};

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const target = aliases[section] || section;
  if (!sections.has(target)) notFound();
  redirect(`/admin/dashboard?section=${target}`);
}
