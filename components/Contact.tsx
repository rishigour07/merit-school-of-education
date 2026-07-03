import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactMessageForm from "@/components/ContactMessageForm";
import { admissionMessage, school, toWhatsAppNumber } from "@/lib/school";
import type { ContactContent } from "@/lib/content";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Merit%20School%20of%20Education%20Rampura%20Sirali%20Harda%20Madhya%20Pradesh";

export default function Contact({ content }: { content?: ContactContent }) {
  const contact = content || {
    address: school.address,
    phoneNumbers: school.phones,
    whatsappNumber: school.phones[0],
    email: school.email,
    instagramHandle: school.instagram,
    officeTiming: school.officeTime
  };
  const instagramHandle = contact.instagramHandle.replace(/^@/, "");
  const instagramUrl = `https://www.instagram.com/${instagramHandle}`;
  const whatsappHref = `https://wa.me/${toWhatsAppNumber(contact.whatsappNumber)}?text=${encodeURIComponent(admissionMessage)}`;
  const cards = [
    { title: "Address", value: contact.address, icon: MapPin, href: mapsUrl },
    { title: "Email", value: contact.email, icon: Mail, href: `mailto:${contact.email}` },
    { title: "Office Time", value: contact.officeTiming, icon: Clock },
    { title: "Instagram", value: `@${instagramHandle}`, icon: Instagram, href: instagramUrl }
  ];

  return (
    <section id="contact" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Contact & Location"
            title="Visit or contact Merit School of Education Rampura."
            description="Our school office is available during working hours for admission enquiries, school visits and parent support."
          />
        </Reveal>

        <div className="mt-8 grid items-stretch gap-5 sm:mt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          <Reveal>
            <div className="grid h-full gap-4">
              <div className="flex min-w-0 gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Phone</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {contact.phoneNumbers.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="focus-ring rounded-full bg-royal-50 px-3 py-2 text-sm font-black text-royal-800 transition hover:bg-royal-100" aria-label={`Call ${phone}`}>
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {cards.map((card) => {
                const Icon = card.icon;
                const contentNode = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black uppercase tracking-[0.12em] text-slate-500">{card.title}</span>
                      <span className="mt-1 block break-words font-black leading-7 text-slate-800">{card.value}</span>
                    </span>
                  </>
                );
                const className = "focus-ring flex min-w-0 gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-royal-200 hover:shadow-soft";
                return card.href ? (
                  <a key={card.title} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined} className={className}>
                    {contentNode}
                  </a>
                ) : (
                  <div key={card.title} className={className}>{contentNode}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactMessageForm />
          </Reveal>
        </div>

        <Reveal className="mt-5 sm:mt-6" delay={0.1}>
          <div className="grid items-center gap-5 rounded-lg border border-royal-100 bg-mist p-5 shadow-soft lg:grid-cols-[1fr_auto] lg:p-6">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="focus-ring flex min-w-0 items-start gap-4 rounded-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-royal-700 shadow-sm">
                <MapPin className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold uppercase tracking-[0.12em] text-royal-600">Campus Location</span>
                <span className="mt-1 block text-lg font-bold leading-7 text-ink">{contact.address}</span>
              </span>
            </a>
            <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-end">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-leaf-500 px-4 py-3 text-sm font-bold text-white">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-royal-800 shadow-sm">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-4 py-3 text-sm font-bold text-royal-900 sm:col-span-2">
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
