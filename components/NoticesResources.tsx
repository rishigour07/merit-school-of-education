import {
  BadgeCheck,
  BookOpenText,
  CalendarClock,
  FileCheck2,
  Hash,
  MapPinned
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import DetailsDialogButton from "@/components/DetailsDialogButton";
import { documentsRequired, school } from "@/lib/school";
import type { ContentCard } from "@/lib/content";

const notices = [
  {
    title: "Admissions for Session 2025-26",
    text: "Parent enquiries are open for Play Group to 10th Class.",
    icon: BadgeCheck
  },
  {
    title: "School Office Timing",
    text: school.officeTime,
    icon: CalendarClock
  },
  {
    title: "Medium of Instruction",
    text: school.medium,
    icon: BookOpenText
  }
];

export default function NoticesResources({ notices: cmsNotices }: { notices?: ContentCard[] }) {
  const noticesToShow = cmsNotices?.length
    ? cmsNotices.slice(0, 3).map((notice, index) => ({
        title: notice.title,
        text: notice.description,
        date: notice.date,
        attachmentUrl: notice.attachmentUrl,
        icon: notice.isFeatured ? BadgeCheck : notices[index]?.icon || BookOpenText
      }))
    : notices.map((notice) => ({
        ...notice,
        date: undefined,
        attachmentUrl: undefined
      }));

  return (
    <section id="notices" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Parent Resources"
            title="Important school information in one clear place."
            description="Essential admission, office and student information, organized clearly for parents and guardians."
          />
        </Reveal>

        <div className="mt-9 grid gap-5 sm:mt-10 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <div className="h-full rounded-lg border border-slate-200 bg-mist p-5 shadow-soft">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-royal-600">
                  Latest Notices
                </p>
                <div className="mt-6 grid gap-4">
                  {noticesToShow.map((notice) => {
                    const Icon = notice.icon;
                    return (
                      <div
                        key={notice.title}
                        className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:grid-cols-[auto_1fr]"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span>
                          <span className="block text-lg font-black text-ink">
                            {notice.title}
                          </span>
                          <span className="mt-1 block leading-7 text-slate-600">
                            {notice.text}
                          </span>
                          <DetailsDialogButton
                            title={notice.title}
                            description={notice.text}
                            date={notice.date}
                            attachmentUrl={notice.attachmentUrl}
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-5">
              <div className="rounded-lg border border-royal-100 bg-royal-700 p-6 text-white shadow-premium">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-royal-800">
                    <Hash className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-gold-200">
                      Official School Codes
                    </p>
                    <h3 className="text-2xl font-black">Recognition Details</h3>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-gold-200">
                      School Code
                    </p>
                    <p className="mt-2 text-2xl font-black">{school.schoolCode}</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-gold-200">
                      DISE Code
                    </p>
                    <p className="mt-2 text-2xl font-black">{school.diseCode}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-royal-800">
                    <FileCheck2 className="h-6 w-6" />
                  </span>
                  <h3 className="text-2xl font-black text-ink">
                    Admission Documents
                  </h3>
                </div>
                <div className="mt-5 grid gap-3">
                  {documentsRequired.slice(0, 4).map((document) => (
                    <div
                      key={document}
                      className="rounded-md bg-mist px-4 py-3 text-sm font-black text-slate-700"
                    >
                      {document}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex gap-4">
                  <MapPinned className="mt-1 h-6 w-6 shrink-0 text-royal-700" />
                  <div>
                    <h3 className="text-xl font-black text-ink">Campus Visit</h3>
                    <p className="mt-2 leading-7 text-slate-600">{school.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
