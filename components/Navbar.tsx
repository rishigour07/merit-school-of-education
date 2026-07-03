"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  Phone,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AdmissionModalTrigger, { admissionModalEvent } from "@/components/AdmissionModalTrigger";
import { navLinks, school } from "@/lib/school";
import type { ContactContent, SiteSettingsContent } from "@/lib/content";

type DropdownItem = { label: string; href?: string; action?: "enquiry" };

const dropdowns: Record<string, DropdownItem[]> = {
  "About Us": [
    { label: "About School", href: "/#about" },
    { label: "Principal Message", href: "/#principal-message" },
    { label: "Vision & Mission", href: "/#vision-mission" },
    { label: "School Values", href: "/#values" }
  ],
  Academics: [
    { label: "Play Group", href: "/#academics" },
    { label: "Primary Classes", href: "/#academics" },
    { label: "Middle Classes", href: "/#academics" },
    { label: "High School", href: "/#academics" },
    { label: "Teaching Methodology", href: "/#academics" }
  ],
  Admissions: [
    { label: "Admission Process", href: "/#admission-process" },
    { label: "Documents Required", href: "/#documents-required" },
    { label: "Fee Enquiry", action: "enquiry" },
    { label: "Apply Now", action: "enquiry" }
  ],
  Facilities: [
    { label: "Smart Classrooms", href: "/#facilities" },
    { label: "Library", href: "/#facilities" },
    { label: "Sports", href: "/#facilities" },
    { label: "Safe Campus", href: "/#facilities" },
    { label: "Parent Communication", href: "/#facilities" }
  ],
  "School Life": [
    { label: "Activities", href: "/#beyond-classroom" },
    { label: "Events & News", href: "/#events" },
    { label: "Faculty", href: "/#faculty" },
    { label: "Gallery", href: "/#gallery" }
  ]
};

export default function Navbar({ settings, contact }: { settings?: SiteSettingsContent; contact?: ContactContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandName = settings?.schoolName || school.name;
  const shortBrandName = brandName.replace(/\s+of Education.*$/i, "") || brandName;
  const primaryPhone = contact?.phoneNumbers[0] || school.phones[0];
  const contactEmail = contact?.email || school.email;
  const instagramHandle = (contact?.instagramHandle || school.instagram).replace(/^@/, "");

  function closeMenus() {
    setIsOpen(false);
    setMobileOpen(null);
    setDesktopOpen(null);
  }

  function openEnquiry() {
    closeMenus();
    window.dispatchEvent(new CustomEvent(admissionModalEvent));
  }

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-[80]"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hidden border-b border-white/10 bg-royal-800 text-white lg:block">
        <div className="container-pad flex h-10 items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-gold-200">
              <BadgeCheck className="h-4 w-4" />
              {school.admission}
            </span>
            <span>School Code: {school.schoolCode}</span>
            <span>DISE Code: {school.diseCode}</span>
          </div>
          <div className="flex items-center gap-5 text-white/86">
            <a href={`tel:${primaryPhone}`} className="focus-ring inline-flex items-center gap-2 rounded hover:text-gold-200">
              <Phone className="h-3.5 w-3.5" />
              {primaryPhone}
            </a>
            <a href={`mailto:${contactEmail}`} className="focus-ring inline-flex items-center gap-2 rounded hover:text-gold-200">
              <Mail className="h-3.5 w-3.5" />
              {contactEmail}
            </a>
            <a
              href={`https://www.instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded hover:text-gold-200"
            >
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      <nav className="glass-nav" aria-label="Main navigation">
        <div className="container-pad flex h-24 items-center justify-between lg:h-[88px]">
          <Link href="/#home" onClick={closeMenus} className="focus-ring flex shrink-0 items-center gap-3 rounded-md" aria-label="Merit School of Education home">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-royal-100 bg-white p-1 shadow-[0_8px_24px_rgba(16,24,40,0.10)] sm:h-16 sm:w-16 sm:p-1.5">
              <Image src="/assets/logo.png" alt={`${brandName} Logo`} width={128} height={128} sizes="(min-width: 640px) 60px, 44px" className="h-11 w-11 object-contain sm:h-[60px] sm:w-[60px]" priority />
            </span>
            <span className="min-w-0">
              <span className="block max-w-[10rem] truncate text-base font-bold text-royal-800 sm:max-w-[13rem] sm:text-xl">{shortBrandName}</span>
              <span className="block whitespace-nowrap text-sm font-bold text-slate-500">Rampura, Harda</span>
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => {
              const items = dropdowns[link.label];
              if (!items) {
                return (
                  <a key={link.href} href={link.href} onClick={closeMenus} className="focus-ring inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-royal-50 hover:text-royal-700">
                    {link.label}
                  </a>
                );
              }
              const open = desktopOpen === link.label;
              return (
                <div key={link.href} className="relative" onMouseEnter={() => setDesktopOpen(link.label)} onMouseLeave={() => setDesktopOpen(null)}>
                  <button
                    type="button"
                    onClick={() => setDesktopOpen((value) => value === link.label ? null : link.label)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    className="focus-ring inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-royal-50 hover:text-royal-700"
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    role="menu"
                    className={`absolute left-0 top-full z-[90] w-72 translate-y-2 rounded-lg border border-royal-100 bg-white p-3 shadow-premium transition ${open ? "visible opacity-100" : "invisible opacity-0"}`}
                  >
                    <div className="mb-2 rounded-md bg-royal-50 px-4 py-3">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-royal-600">{link.label}</p>
                    </div>
                    {items.map((item) => item.action === "enquiry" ? (
                      <button key={item.label} type="button" role="menuitem" onClick={openEnquiry} className="focus-ring block w-full rounded-md px-4 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-gold-50 hover:text-royal-800">
                        {item.label}
                      </button>
                    ) : (
                      <a key={item.label} href={item.href} role="menuitem" onClick={closeMenus} className="focus-ring block rounded-md px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-gold-50 hover:text-royal-800">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <AdmissionModalTrigger ariaLabel="Open enquiry form" className="focus-ring whitespace-nowrap rounded-full border border-royal-100 bg-white px-4 py-3 text-sm font-black text-royal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              Enquiry Form
            </AdmissionModalTrigger>
            <AdmissionModalTrigger ariaLabel="Apply for admission" className="focus-ring whitespace-nowrap rounded-full bg-gold-300 px-5 py-3 text-sm font-black text-royal-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-200 hover:shadow-soft">
              Apply Now
            </AdmissionModalTrigger>
          </div>

          <button type="button" onClick={() => setIsOpen((value) => !value)} className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-royal-100 bg-white text-royal-800 shadow-sm xl:hidden" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div className="border-t border-royal-100 bg-white shadow-premium xl:hidden" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
            <div className="container-pad max-h-[calc(100vh-6rem)] overflow-y-auto py-4">
              <div className="mb-4 rounded-lg bg-royal-700 p-4 text-white">
                <p className="text-sm font-black text-gold-200">{school.admission}</p>
                <p className="mt-1 text-xs font-semibold text-white/76">School Code: {school.schoolCode} | DISE: {school.diseCode}</p>
              </div>
              {navLinks.map((link) => {
                const items = dropdowns[link.label];
                return (
                  <div key={link.href} className="border-b border-slate-100 py-1">
                    {items ? (
                      <>
                        <button type="button" onClick={() => setMobileOpen((value) => value === link.label ? null : link.label)} className="focus-ring flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-black text-slate-800 hover:bg-royal-50" aria-expanded={mobileOpen === link.label}>
                          {link.label}
                          <ChevronDown className={`h-4 w-4 transition ${mobileOpen === link.label ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileOpen === link.label ? (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              {items.map((item) => item.action === "enquiry" ? (
                                <button key={item.label} type="button" onClick={openEnquiry} className="focus-ring block w-full rounded-md px-6 py-2 text-left text-sm font-semibold text-slate-600 hover:bg-gold-50">
                                  {item.label}
                                </button>
                              ) : (
                                <a key={item.label} href={item.href} onClick={closeMenus} className="focus-ring block rounded-md px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-gold-50">
                                  {item.label}
                                </a>
                              ))}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a href={link.href} onClick={closeMenus} className="focus-ring block rounded-md px-3 py-3 text-base font-black text-slate-800 hover:bg-royal-50">{link.label}</a>
                    )}
                  </div>
                );
              })}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={openEnquiry} className="focus-ring rounded-full border border-royal-100 px-5 py-3 text-center text-sm font-black text-royal-800">Enquiry Form</button>
                <button type="button" onClick={openEnquiry} className="focus-ring rounded-full bg-gold-300 px-5 py-3 text-center text-sm font-black text-royal-900">Apply Now</button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
