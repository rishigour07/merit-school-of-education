import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ClipboardList,
  Contact,
  FileText,
  GalleryHorizontalEnd,
  GraduationCap,
  Home,
  ImageIcon,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound
} from "lucide-react";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "image"
  | "boolean"
  | "array"
  | "select";

export type AdminField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  defaultValue?: string | number | boolean | string[];
};

export type AdminModule = {
  key: string;
  label: string;
  table?: string;
  description: string;
  kind: "dashboard" | "singleton" | "collection" | "enquiries";
  icon: typeof LayoutDashboard;
  fields?: AdminField[];
  columns?: string[];
  statusOptions?: string[];
};

const commonFields: AdminField[] = [
  { name: "is_active", label: "Active", type: "boolean", defaultValue: true },
  { name: "sort_order", label: "Display Order", type: "number", placeholder: "0", defaultValue: 0 }
];

export const adminModules: AdminModule[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    description: "School website overview, latest enquiries and quick actions.",
    kind: "dashboard",
    icon: LayoutDashboard
  },
  {
    key: "hero",
    label: "Hero Section",
    table: "hero_section",
    description: "Update the main website hero, CTA and admission badge.",
    kind: "singleton",
    icon: Home,
    fields: [
      { name: "badge_text", label: "Hero Badge Text", type: "text", required: true },
      { name: "main_heading", label: "Main Heading", type: "text", required: true },
      { name: "subheading", label: "Subheading", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "cta_text", label: "CTA Button Text", type: "text" },
      { name: "hero_image_url", label: "Hero Image", type: "image" },
      { name: "admission_status_text", label: "Admission Status Text", type: "text" },
      ...commonFields
    ],
    columns: ["main_heading", "badge_text", "admission_status_text", "is_active"]
  },
  {
    key: "about",
    label: "About School",
    table: "about_section",
    description: "Manage the welcome copy, school image and values.",
    kind: "singleton",
    icon: Building2,
    fields: [
      { name: "heading", label: "About Heading", type: "text", required: true },
      { name: "description", label: "About Description", type: "textarea" },
      { name: "image_url", label: "About Image", type: "image" },
      { name: "values", label: "School Values", type: "array", placeholder: "शिक्षा\nसेवा\nसंस्कार" },
      ...commonFields
    ],
    columns: ["heading", "is_active"]
  },
  {
    key: "admissions",
    label: "Admissions",
    table: "admission_info",
    description: "Update admission session, class range, office timing and documents.",
    kind: "singleton",
    icon: BadgeCheck,
    fields: [
      { name: "session", label: "Admission Session", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: ["open", "closed"], required: true },
      { name: "classes_offered", label: "Classes Offered", type: "text" },
      { name: "medium", label: "Medium", type: "text" },
      { name: "office_timing", label: "Office Timing", type: "text" },
      { name: "school_code", label: "School Code", type: "text" },
      { name: "dise_code", label: "DISE Code", type: "text" },
      { name: "documents_required", label: "Documents Required", type: "array" },
      { name: "cta_text", label: "CTA Text", type: "text" },
      ...commonFields
    ],
    columns: ["session", "status", "classes_offered", "is_active"]
  },
  {
    key: "academics",
    label: "Academics",
    table: "academics",
    description: "Add, edit and reorder academic programs.",
    kind: "collection",
    icon: GraduationCap,
    fields: [
      { name: "title", label: "Program Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "class_range", label: "Class Range", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "features", label: "Features", type: "array" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "icon", label: "Icon Name", type: "text" },
      ...commonFields
    ],
    columns: ["title", "class_range", "is_active", "sort_order"]
  },
  {
    key: "facilities",
    label: "Facilities",
    table: "facilities",
    description: "Manage school facilities with icon/image support.",
    kind: "collection",
    icon: ShieldCheck,
    fields: [
      { name: "title", label: "Facility Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon Name", type: "text" },
      { name: "image_url", label: "Image Optional", type: "image" },
      ...commonFields
    ],
    columns: ["title", "icon", "is_active", "sort_order"]
  },
  {
    key: "activities",
    label: "Activities",
    table: "activities",
    description: "Sports, cultural programs, assembly, competitions and more.",
    kind: "collection",
    icon: Sparkles,
    fields: [
      { name: "title", label: "Activity Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      ...commonFields
    ],
    columns: ["title", "is_active", "sort_order"]
  },
  {
    key: "gallery",
    label: "Gallery",
    table: "gallery_images",
    description: "Upload, preview, categorize and feature school-life images.",
    kind: "collection",
    icon: GalleryHorizontalEnd,
    fields: [
      { name: "title", label: "Image Title", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Classroom Learning", "Sports Activity", "Cultural Program", "Student Life", "Campus Environment", "Creative Learning"] },
      { name: "alt_text", label: "Alt Text", type: "text" },
      { name: "image_url", label: "Image Upload / URL", type: "image", required: true },
      { name: "is_featured", label: "Featured Image", type: "boolean" },
      ...commonFields
    ],
    columns: ["title", "category", "is_featured", "is_active"]
  },
  {
    key: "notices",
    label: "Notices",
    table: "notices",
    description: "Publish active notices on the public notice board.",
    kind: "collection",
    icon: Megaphone,
    fields: [
      { name: "title", label: "Notice Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "notice_date", label: "Notice Date", type: "date" },
      { name: "is_important", label: "Important Badge", type: "boolean" },
      { name: "attachment_url", label: "Attachment Optional", type: "image" },
      ...commonFields
    ],
    columns: ["title", "notice_date", "is_important", "is_active"]
  },
  {
    key: "events",
    label: "Events",
    table: "events",
    description: "Manage latest events and school programs.",
    kind: "collection",
    icon: CalendarDays,
    fields: [
      { name: "title", label: "Event Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "event_date", label: "Event Date", type: "date" },
      { name: "image_url", label: "Event Image", type: "image" },
      { name: "location", label: "Location", type: "text" },
      ...commonFields
    ],
    columns: ["title", "event_date", "location", "is_active"]
  },
  {
    key: "teachers",
    label: "Faculty",
    table: "teachers",
    description: "Manage teacher profiles and faculty details.",
    kind: "collection",
    icon: UsersRound,
    fields: [
      { name: "name", label: "Teacher Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text" },
      { name: "qualification", label: "Qualification", type: "text" },
      { name: "subject", label: "Subject", type: "text" },
      { name: "experience", label: "Experience", type: "text" },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "short_bio", label: "Short Bio", type: "textarea" },
      ...commonFields
    ],
    columns: ["name", "designation", "qualification", "sort_order", "is_active"]
  },
  {
    key: "testimonials",
    label: "Testimonials",
    table: "testimonials",
    description: "Manage parent testimonials and ratings.",
    kind: "collection",
    icon: Star,
    fields: [
      { name: "parent_name", label: "Parent Name", type: "text", required: true },
      { name: "student_class", label: "Student Class", type: "text" },
      { name: "message", label: "Testimonial Message", type: "textarea", required: true },
      { name: "rating", label: "Rating", type: "number" },
      ...commonFields
    ],
    columns: ["parent_name", "student_class", "rating", "is_active"]
  },
  {
    key: "enquiries",
    label: "Enquiries",
    table: "enquiries",
    description: "View admission enquiries, change status and contact parents.",
    kind: "enquiries",
    icon: MessageSquareText,
    columns: ["parent_name", "student_name", "class_interested", "phone_number", "status", "created_at"],
    statusOptions: ["New", "Contacted", "Follow-up", "Converted", "Closed"]
  },
  {
    key: "contact-messages",
    label: "Contact Messages",
    table: "contact_messages",
    description: "Review parent messages, update response status and follow up directly.",
    kind: "enquiries",
    icon: MessageSquareText,
    columns: ["name", "phone_number", "email", "subject", "message", "status", "created_at"],
    statusOptions: ["New", "Replied", "Closed"]
  },
  {
    key: "contact",
    label: "Contact Details",
    table: "contact_details",
    description: "Update phone numbers, WhatsApp, email, Instagram and map details.",
    kind: "singleton",
    icon: Contact,
    fields: [
      { name: "address", label: "Address", type: "textarea" },
      { name: "phone_numbers", label: "Phone Numbers", type: "array" },
      { name: "whatsapp_number", label: "WhatsApp Number", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "instagram_handle", label: "Instagram Handle", type: "text" },
      { name: "office_timing", label: "Office Timing", type: "text" },
      { name: "google_map_embed_url", label: "Google Map Embed URL", type: "textarea" },
      ...commonFields
    ],
    columns: ["email", "whatsapp_number", "is_active"]
  },
  {
    key: "seo",
    label: "SEO Settings",
    table: "seo_settings",
    description: "Manage metadata, keywords, Open Graph image and favicon.",
    kind: "singleton",
    icon: Search,
    fields: [
      { name: "website_title", label: "Website Title", type: "text" },
      { name: "meta_description", label: "Meta Description", type: "textarea" },
      { name: "keywords", label: "Keywords", type: "array" },
      { name: "og_title", label: "Open Graph Title", type: "text" },
      { name: "og_description", label: "Open Graph Description", type: "textarea" },
      { name: "og_image_url", label: "OG Image", type: "image" },
      { name: "favicon_url", label: "Favicon / App Icon", type: "image" },
      ...commonFields
    ],
    columns: ["website_title", "is_active"]
  },
  {
    key: "settings",
    label: "Website Settings",
    table: "site_settings",
    description: "Logo, footer text, brand color and floating button settings.",
    kind: "singleton",
    icon: Settings,
    fields: [
      { name: "school_name", label: "School Name", type: "text" },
      { name: "homepage_headline", label: "Homepage Headline", type: "text" },
      { name: "homepage_subtitle", label: "Homepage Subtitle", type: "textarea" },
      { name: "about_text", label: "About School Text", type: "textarea" },
      { name: "phone_number", label: "Primary Phone Number", type: "text" },
      { name: "email", label: "School Email", type: "text" },
      { name: "address", label: "School Address", type: "textarea" },
      { name: "school_timing", label: "School Timing", type: "text" },
      { name: "instagram_handle", label: "Instagram Handle", type: "text" },
      { name: "admission_cta_text", label: "Admission CTA Text", type: "text" },
      { name: "logo_url", label: "School Logo", type: "image" },
      { name: "footer_text", label: "Footer Text", type: "textarea" },
      { name: "copyright_text", label: "Copyright Text", type: "text" },
      { name: "designed_by_text", label: "Designed By Text", type: "text" },
      { name: "primary_color", label: "Primary Color", type: "text" },
      { name: "admission_open", label: "Admission Open", type: "boolean", defaultValue: true },
      { name: "floating_whatsapp_visible", label: "Floating WhatsApp Visible", type: "boolean", defaultValue: true },
      { name: "floating_call_visible", label: "Floating Call Visible", type: "boolean", defaultValue: true },
      ...commonFields
    ],
    columns: ["school_name", "admission_open", "is_active"]
  }
];

export const adminTables = adminModules
  .map((module) => module.table)
  .filter((table): table is string => Boolean(table));

export const dashboardQuickActions = [
  { label: "Add Notice", moduleKey: "notices", icon: Megaphone },
  { label: "Add Gallery Image", moduleKey: "gallery", icon: ImageIcon },
  { label: "Update Admission Info", moduleKey: "admissions", icon: ClipboardList },
  { label: "View Contact Messages", moduleKey: "contact-messages", icon: MessageSquareText },
  { label: "View Website", href: "/", icon: FileText }
];
