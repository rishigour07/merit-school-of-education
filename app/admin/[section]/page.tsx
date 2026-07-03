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
  "contact",
  "seo",
  "settings"
]);

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.has(section)) notFound();
  redirect(`/admin/dashboard?section=${section}`);
}
