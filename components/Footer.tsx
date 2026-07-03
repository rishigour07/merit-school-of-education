import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  Clock,
  FileCheck2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { navLinks, school } from "@/lib/school";
import type { ContactContent, SiteSettingsContent } from "@/lib/content";

const admissionLinks = [
  { label: school.admission, href: "/#admissions", icon: BadgeCheck },
  { label: "How To Apply", href: "/#admission-process", icon: BookOpenCheck },
  { label: "Documents Required", href: "/#documents-required", icon: FileCheck2 },
  { label: "Parent Enquiry", href: "/#enquiry", icon: MessageCircle }
];

export default function Footer({ settings, contact }: { settings?: SiteSettingsContent; contact?: ContactContent }) {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Merit%20School%20of%20Education%20Rampura%20Sirali%20Harda%20Madhya%20Pradesh";
  const address = contact?.address || school.address;
  const phones = contact?.phoneNumbers || school.phones;
  const email = contact?.email || school.email;
  const instagramHandle = (contact?.instagramHandle || school.instagram).replace(/^@/, "");
  const officeTime = contact?.officeTiming || school.officeTime;
  return (
    <footer className="bg-royal-900 text-white">
      <div className="container-pad grid gap-8 py-12 md:grid-cols-2 xl:grid-cols-[1.2fr_0.7fr_0.85fr_1.05fr]">
        <div>
          <Link href="/#home" className="focus-ring flex items-center gap-4 rounded-md" aria-label="Return to Merit School homepage">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/95 p-2 shadow-soft">
              <Image
                src="/assets/logo.png"
                alt="Merit School of Education Rampura Logo"
                width={150}
                height={150}
                sizes="88px"
                className="h-[88px] w-[88px] object-contain"
              />
            </span>
            <div>
              <h2 className="text-xl font-bold">{settings?.schoolName || school.name}</h2>
              <p className="mt-1 text-sm font-semibold text-white/68">
                {school.taglineHindi}
              </p>
            </div>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/72">
            {settings?.footerText || "Quality education from Play Group to 10th Class with academic focus, discipline, activities and strong values."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-gold-200">
            Quick Links
          </h3>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-white/72 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-gold-200">
            Admissions
          </h3>
          <div className="mt-5 grid gap-3">
            {admissionLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 text-sm font-bold text-white/72 transition hover:text-white"
                >
                  <Icon className="h-4 w-4 text-gold-200" />
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-gold-200">
              Classes
            </p>
            <p className="mt-2 text-sm font-bold text-white/78">
              {school.classes} | {school.medium}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-gold-200">
            Get In Touch
          </h3>
          <div className="mt-5 grid gap-4 text-sm font-semibold leading-6 text-white/72">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="focus-ring flex gap-3 rounded transition hover:text-white">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-200" />
              {address}
            </a>
            <div className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold-200" />
              <span className="flex flex-wrap gap-x-3 gap-y-1">
                {phones.map((phone) => (
                  <a key={phone} href={`tel:${phone}`} className="focus-ring rounded transition hover:text-white">{phone}</a>
                ))}
              </span>
            </div>
            <a href={`mailto:${email}`} className="focus-ring flex gap-3 rounded transition hover:text-white">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-gold-200" />
              {email}
            </a>
            <a href={`https://www.instagram.com/${instagramHandle}`} target="_blank" rel="noreferrer" className="focus-ring flex gap-3 rounded transition hover:text-white">
              <Instagram className="mt-1 h-4 w-4 shrink-0 text-gold-200" />
              @{instagramHandle}
            </a>
            <p className="flex gap-3">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-gold-200" />
              {officeTime}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-pad flex flex-col gap-3 text-sm font-semibold text-white/58 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {settings?.copyrightText || "2026 Merit School of Education Rampura. All Rights Reserved."}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacy-policy" className="focus-ring rounded transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="focus-ring rounded transition hover:text-white">Terms & Conditions</Link>
            <span>{settings?.designedByText || "Designed & Developed by Kamkimat Technologies"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
