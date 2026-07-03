import { school, schoolPhotos, galleryPhotos, documentsRequired } from "@/lib/school";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type HeroContent = {
  badgeText: string;
  mainHeading: string;
  subheading: string;
  description: string;
  ctaText: string;
  heroImageUrl: string;
  admissionStatusText: string;
};

export type AboutContent = {
  heading: string;
  description: string;
  imageUrl: string;
  values: string[];
};

export type AdmissionContent = {
  session: string;
  status: string;
  classesOffered: string;
  medium: string;
  officeTiming: string;
  schoolCode: string;
  diseCode: string;
  documentsRequired: string[];
  ctaText: string;
};

export type ContentCard = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  imageUrl?: string;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
  category?: string;
  altText?: string;
  isFeatured?: boolean;
  date?: string;
  location?: string;
  attachmentUrl?: string;
};

export type TeacherProfile = {
  id?: string;
  name: string;
  designation: string;
  qualification: string;
  subject: string;
  experience: string;
  photoUrl?: string;
  shortBio: string;
};

export type Testimonial = {
  id?: string;
  parentName: string;
  studentClass: string;
  message: string;
  rating: number;
};

export type ContactContent = {
  address: string;
  phoneNumbers: string[];
  whatsappNumber: string;
  email: string;
  instagramHandle: string;
  officeTiming: string;
  googleMapEmbedUrl?: string;
};

export type SiteSettingsContent = {
  schoolName: string;
  footerText: string;
  copyrightText: string;
  designedByText: string;
};

export type PublicContent = {
  hero: HeroContent;
  about: AboutContent;
  admission: AdmissionContent;
  academics: ContentCard[];
  facilities: ContentCard[];
  activities: ContentCard[];
  galleryImages: ContentCard[];
  notices: ContentCard[];
  events: ContentCard[];
  teachers: TeacherProfile[];
  testimonials: Testimonial[];
  contact: ContactContent;
  siteSettings: SiteSettingsContent;
};

export const defaultContent: PublicContent = {
  hero: {
    badgeText: school.admission,
    mainHeading: "Shaping Bright Futures with Quality Education",
    subheading:
      "A trusted English and Hindi medium school in Rampura where education, discipline and character help every child grow with confidence.",
    description:
      "A trusted English and Hindi medium school in Rampura for Play Group to 10th Class, focused on academic excellence, discipline, confidence and strong values.",
    ctaText: "Explore Admissions",
    heroImageUrl: schoolPhotos.campus,
    admissionStatusText: school.admission
  },
  about: {
    heading: "Welcome to Merit School of Education Rampura",
    description:
      "Merit School supports children through academic clarity, discipline, activities and strong values. The school is built around parent trust, classroom focus and practical all-round development.",
    imageUrl: schoolPhotos.campus,
    values: ["शिक्षा", "सेवा", "संस्कार"]
  },
  admission: {
    session: "2025-26",
    status: "open",
    classesOffered: school.classes,
    medium: school.medium,
    officeTiming: school.officeTime,
    schoolCode: school.schoolCode,
    diseCode: school.diseCode,
    documentsRequired,
    ctaText: "Apply for Admission"
  },
  academics: [
    {
      title: "Play Group",
      description:
        "Activity-based learning, classroom routine, language exposure and joyful confidence building.",
      imageUrl: schoolPhotos.activity,
      icon: "Baby"
    },
    {
      title: "Primary Classes",
      description:
        "Concept clarity, reading habits, numeracy, regular practice, discipline and values.",
      imageUrl: schoolPhotos.classroom,
      icon: "BookOpenCheck"
    },
    {
      title: "Middle Classes",
      description:
        "Regular assessment, guided learning, communication skills and responsibility.",
      imageUrl: schoolPhotos.students,
      icon: "School"
    },
    {
      title: "High School up to 10th",
      description:
        "Focused academics, exam readiness, confidence building and strong study habits.",
      imageUrl: schoolPhotos.teacher,
      icon: "GraduationCap"
    }
  ],
  facilities: [
    { title: "Smart Classrooms", description: "Interactive and structured classroom learning.", icon: "Presentation" },
    { title: "Experienced Faculty", description: "Teachers focused on discipline, clarity and care.", icon: "BookOpen" },
    { title: "Library Support", description: "Reading habits and reference support for learners.", icon: "Library" },
    { title: "Sports Activities", description: "Outdoor activity and confidence building.", icon: "Trophy" },
    { title: "Cultural Programs", description: "Stage exposure, celebration and school participation.", icon: "CalendarDays" },
    { title: "Safe Campus", description: "A parent-friendly, disciplined school routine.", icon: "Shield" }
  ],
  activities: [
    { title: "Sports", description: "Team play, fitness and participation.", imageUrl: schoolPhotos.sports },
    { title: "Cultural Programs", description: "Confidence through school events.", imageUrl: schoolPhotos.assembly },
    { title: "Morning Assembly", description: "Routine, discipline and values.", imageUrl: schoolPhotos.students },
    { title: "Art & Craft", description: "Creative expression and fine motor skills.", imageUrl: schoolPhotos.activity },
    { title: "Personality Development", description: "Confidence, speaking and self-expression.", imageUrl: schoolPhotos.hero },
    { title: "Moral Education", description: "Values, manners and responsible behaviour.", imageUrl: schoolPhotos.classroom }
  ],
  galleryImages: galleryPhotos.map((photo, index) => ({
    title: photo.title,
    description: photo.alt,
    imageUrl: photo.src,
    altText: photo.alt,
    sortOrder: index,
    category: photo.title,
    isFeatured: index === 0
  })),
  notices: [
    {
      title: "Admission Open 2025-26",
      description: "Admissions are open for Play Group to 10th Class.",
      date: "2025-04-01",
      isFeatured: true
    },
    {
      title: "School Office Timing",
      description: school.officeTime,
      date: "2025-04-01"
    }
  ],
  events: [
    {
      title: "Parent Interaction Week",
      description: "Meet the school office for admission guidance and campus visit support.",
      date: "2025-06-15",
      location: "Merit School Campus",
      imageUrl: schoolPhotos.campus
    },
    {
      title: "Student Activity Day",
      description: "A school activity day focused on creativity, confidence and participation.",
      date: "2025-07-10",
      location: "Rampura",
      imageUrl: schoolPhotos.activity
    }
  ],
  teachers: [
    {
      name: "Academic Faculty",
      designation: "Teaching Team",
      qualification: "Trained Educators",
      subject: "All Subjects",
      experience: "Experienced",
      photoUrl: schoolPhotos.teacher,
      shortBio:
        "Our teachers support students with classroom clarity, discipline and regular guidance."
    }
  ],
  testimonials: [
    {
      parentName: "Parent Community",
      studentClass: "Merit School",
      message:
        "The school gives children a disciplined, caring and confidence-building environment.",
      rating: 5
    }
  ],
  contact: {
    address: school.address,
    phoneNumbers: school.phones,
    whatsappNumber: school.phones[0],
    email: school.email,
    instagramHandle: school.instagram,
    officeTiming: school.officeTime
  },
  siteSettings: {
    schoolName: school.name,
    footerText: "Quality education from Play Group to 10th Class with discipline, activities and values.",
    copyrightText: "2026 Merit School of Education Rampura. All Rights Reserved.",
    designedByText: "Designed & Developed by Kamkimat Technologies"
  }
};

type CmsRow = Record<string, unknown>;

function text(row: CmsRow | null | undefined, key: string, fallback: string) {
  const value = row?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function bool(row: CmsRow | null | undefined, key: string, fallback = false) {
  const value = row?.[key];
  return typeof value === "boolean" ? value : fallback;
}

function list(row: CmsRow | null | undefined, key: string, fallback: string[]) {
  const value = row?.[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
}

function mapCards(rows: CmsRow[] | null | undefined, fallback: ContentCard[]) {
  if (!rows?.length) return fallback;
  return rows.map((row) => ({
    id: text(row, "id", ""),
    title: text(row, "title", "Untitled"),
    slug: text(row, "slug", ""),
    description: text(row, "description", ""),
    imageUrl: text(row, "image_url", ""),
    icon: text(row, "icon", ""),
    category: text(row, "category", ""),
    altText: text(row, "alt_text", ""),
    date: text(row, "notice_date", text(row, "event_date", "")),
    location: text(row, "location", ""),
    attachmentUrl: text(row, "attachment_url", ""),
    isFeatured: bool(row, "is_featured", bool(row, "is_important", false)),
    sortOrder: Number(row.sort_order || 0),
    isActive: bool(row, "is_active", true)
  }));
}

export async function getPublicContent(): Promise<PublicContent> {
  if (!isSupabaseConfigured()) return defaultContent;

  try {
    const supabase = await createClient();
    const [
      siteSettingsResult,
      heroResult,
      aboutResult,
      admissionResult,
      academicsResult,
      facilitiesResult,
      activitiesResult,
      galleryResult,
      noticesResult,
      eventsResult,
      teachersResult,
      testimonialsResult,
      contactResult
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("is_active", true).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("hero_section").select("*").eq("is_active", true).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("about_section").select("*").eq("is_active", true).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("admission_info").select("*").eq("is_active", true).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("academics").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("facilities").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("activities").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("gallery_images").select("*").eq("is_active", true).order("sort_order", { ascending: true }).limit(24),
      supabase.from("notices").select("*").eq("is_active", true).order("notice_date", { ascending: false }).limit(6),
      supabase.from("events").select("*").eq("is_active", true).order("event_date", { ascending: false }).limit(6),
      supabase.from("teachers").select("*").eq("is_active", true).order("sort_order", { ascending: true }).limit(12),
      supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order", { ascending: true }).limit(12),
      supabase.from("contact_details").select("*").eq("is_active", true).order("updated_at", { ascending: false }).limit(1).maybeSingle()
    ]);

    const settings = siteSettingsResult.data as CmsRow | null;
    const hero = heroResult.data as CmsRow | null;
    const about = aboutResult.data as CmsRow | null;
    const admission = admissionResult.data as CmsRow | null;
    const contact = contactResult.data as CmsRow | null;

    const contactPhones = list(contact, "phone_numbers", defaultContent.contact.phoneNumbers);
    const primaryPhone = text(settings, "phone_number", "");

    return {
      hero: {
        badgeText: text(hero, "badge_text", defaultContent.hero.badgeText),
        mainHeading: text(settings, "homepage_headline", text(hero, "main_heading", defaultContent.hero.mainHeading)),
        subheading: text(settings, "homepage_subtitle", text(hero, "subheading", defaultContent.hero.subheading)),
        description: text(hero, "description", defaultContent.hero.description),
        ctaText: text(settings, "admission_cta_text", text(hero, "cta_text", defaultContent.hero.ctaText)),
        heroImageUrl: text(hero, "hero_image_url", defaultContent.hero.heroImageUrl),
        admissionStatusText: text(hero, "admission_status_text", defaultContent.hero.admissionStatusText)
      },
      about: {
        heading: text(about, "heading", defaultContent.about.heading),
        description: text(settings, "about_text", text(about, "description", defaultContent.about.description)),
        imageUrl: text(about, "image_url", defaultContent.about.imageUrl),
        values: list(about, "values", defaultContent.about.values)
      },
      admission: {
        session: text(admission, "session", defaultContent.admission.session),
        status: text(admission, "status", defaultContent.admission.status),
        classesOffered: text(admission, "classes_offered", defaultContent.admission.classesOffered),
        medium: text(admission, "medium", defaultContent.admission.medium),
        officeTiming: text(admission, "office_timing", defaultContent.admission.officeTiming),
        schoolCode: text(admission, "school_code", defaultContent.admission.schoolCode),
        diseCode: text(admission, "dise_code", defaultContent.admission.diseCode),
        documentsRequired: list(admission, "documents_required", defaultContent.admission.documentsRequired),
        ctaText: text(settings, "admission_cta_text", text(admission, "cta_text", defaultContent.admission.ctaText))
      },
      academics: mapCards(academicsResult.data as CmsRow[] | null, defaultContent.academics),
      facilities: mapCards(facilitiesResult.data as CmsRow[] | null, defaultContent.facilities),
      activities: mapCards(activitiesResult.data as CmsRow[] | null, defaultContent.activities),
      galleryImages: mapCards(galleryResult.data as CmsRow[] | null, defaultContent.galleryImages),
      notices: mapCards(noticesResult.data as CmsRow[] | null, defaultContent.notices),
      events: mapCards(eventsResult.data as CmsRow[] | null, defaultContent.events),
      teachers: (teachersResult.data as CmsRow[] | null)?.map((row) => ({
        id: text(row, "id", ""),
        name: text(row, "name", "Teacher"),
        designation: text(row, "designation", ""),
        qualification: text(row, "qualification", ""),
        subject: text(row, "subject", ""),
        experience: text(row, "experience", ""),
        photoUrl: text(row, "photo_url", ""),
        shortBio: text(row, "short_bio", "")
      })) || defaultContent.teachers,
      testimonials: (testimonialsResult.data as CmsRow[] | null)?.map((row) => ({
        id: text(row, "id", ""),
        parentName: text(row, "parent_name", "Parent"),
        studentClass: text(row, "student_class", ""),
        message: text(row, "message", ""),
        rating: Number(row.rating || 5)
      })) || defaultContent.testimonials,
      contact: {
        address: text(settings, "address", text(contact, "address", defaultContent.contact.address)),
        phoneNumbers: primaryPhone ? [primaryPhone, ...contactPhones.filter((phone) => phone !== primaryPhone)] : contactPhones,
        whatsappNumber: primaryPhone || text(contact, "whatsapp_number", defaultContent.contact.whatsappNumber),
        email: text(settings, "email", text(contact, "email", defaultContent.contact.email)),
        instagramHandle: text(settings, "instagram_handle", text(contact, "instagram_handle", defaultContent.contact.instagramHandle)),
        officeTiming: text(settings, "school_timing", text(contact, "office_timing", defaultContent.contact.officeTiming)),
        googleMapEmbedUrl: text(contact, "google_map_embed_url", "")
      },
      siteSettings: {
        schoolName: text(settings, "school_name", defaultContent.siteSettings.schoolName),
        footerText: text(settings, "footer_text", defaultContent.siteSettings.footerText),
        copyrightText: text(settings, "copyright_text", defaultContent.siteSettings.copyrightText),
        designedByText: text(settings, "designed_by_text", defaultContent.siteSettings.designedByText)
      }
    };
  } catch {
    return defaultContent;
  }
}
