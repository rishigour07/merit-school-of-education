"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  adminModules,
  adminTables,
  dashboardQuickActions,
  enquiryStatuses,
  type AdminField,
  type AdminModule
} from "@/lib/admin-config";
import { defaultContent } from "@/lib/default-content";
import { school, toWhatsAppNumber, whatsappNumber } from "@/lib/school";
import {
  createClient,
  isBrowserSupabaseConfigured
} from "@/lib/supabase/client";
import { storageBucket } from "@/lib/supabase/env";

type CmsRecord = Record<string, unknown> & { id?: string };
type RecordsMap = Record<string, CmsRecord[]>;
type Toast = { type: "success" | "error"; message: string } | null;

const cmsRecordSchema = z.record(z.string(), z.unknown());

function demoRecords(): RecordsMap {
  return {
    hero_section: [
      {
        badge_text: defaultContent.hero.badgeText,
        main_heading: defaultContent.hero.mainHeading,
        subheading: defaultContent.hero.subheading,
        description: defaultContent.hero.description,
        cta_text: defaultContent.hero.ctaText,
        hero_image_url: defaultContent.hero.heroImageUrl,
        admission_status_text: defaultContent.hero.admissionStatusText,
        is_active: true,
        sort_order: 0
      }
    ],
    about_section: [
      {
        heading: defaultContent.about.heading,
        description: defaultContent.about.description,
        image_url: defaultContent.about.imageUrl,
        values: defaultContent.about.values,
        is_active: true,
        sort_order: 0
      }
    ],
    admission_info: [
      {
        session: defaultContent.admission.session,
        status: defaultContent.admission.status,
        classes_offered: defaultContent.admission.classesOffered,
        medium: defaultContent.admission.medium,
        office_timing: defaultContent.admission.officeTiming,
        school_code: defaultContent.admission.schoolCode,
        dise_code: defaultContent.admission.diseCode,
        documents_required: defaultContent.admission.documentsRequired,
        cta_text: defaultContent.admission.ctaText,
        is_active: true,
        sort_order: 0
      }
    ],
    academics: defaultContent.academics.map((item, index) => ({
      title: item.title,
      description: item.description,
      image_url: item.imageUrl,
      icon: item.icon,
      is_active: true,
      sort_order: index
    })),
    facilities: defaultContent.facilities.map((item, index) => ({
      title: item.title,
      description: item.description,
      icon: item.icon,
      is_active: true,
      sort_order: index
    })),
    activities: defaultContent.activities.map((item, index) => ({
      title: item.title,
      description: item.description,
      image_url: item.imageUrl,
      is_active: true,
      sort_order: index
    })),
    gallery_images: defaultContent.galleryImages.map((item, index) => ({
      title: item.title,
      category: item.category,
      alt_text: item.altText,
      image_url: item.imageUrl,
      is_featured: index === 0,
      is_active: true,
      sort_order: index
    })),
    notices: defaultContent.notices.map((item, index) => ({
      title: item.title,
      description: item.description,
      notice_date: item.date,
      is_important: item.isFeatured,
      is_active: true,
      sort_order: index
    })),
    events: defaultContent.events.map((item, index) => ({
      title: item.title,
      description: item.description,
      event_date: item.date,
      image_url: item.imageUrl,
      location: item.location,
      is_active: true,
      sort_order: index
    })),
    teachers: defaultContent.teachers.map((item, index) => ({
      name: item.name,
      designation: item.designation,
      subject: item.subject,
      experience: item.experience,
      photo_url: item.photoUrl,
      short_bio: item.shortBio,
      is_active: true,
      sort_order: index
    })),
    testimonials: defaultContent.testimonials.map((item, index) => ({
      parent_name: item.parentName,
      student_class: item.studentClass,
      message: item.message,
      rating: item.rating,
      is_active: true,
      sort_order: index
    })),
    enquiries: [],
    contact_details: [
      {
        address: defaultContent.contact.address,
        phone_numbers: defaultContent.contact.phoneNumbers,
        whatsapp_number: defaultContent.contact.whatsappNumber,
        email: defaultContent.contact.email,
        instagram_handle: defaultContent.contact.instagramHandle,
        office_timing: defaultContent.contact.officeTiming,
        google_map_embed_url: "",
        is_active: true,
        sort_order: 0
      }
    ],
    seo_settings: [
      {
        website_title: "Merit School of Education Rampura | Admission Open 2025-26",
        meta_description:
          "Premium school website for Merit School of Education Rampura.",
        keywords: [
          "Merit School Rampura",
          "School in Harda",
          "Admission Open 2025-26"
        ],
        og_title: "Merit School of Education Rampura",
        og_description: "Admissions open for Play Group to 10th Class.",
        og_image_url: "/assets/logo.png",
        favicon_url: "/assets/logo.png",
        is_active: true,
        sort_order: 0
      }
    ],
    site_settings: [
      {
        school_name: school.name,
        logo_url: "/assets/logo.png",
        footer_text:
          "Quality education from Play Group to 10th Class with discipline, activities and values.",
        copyright_text:
          "2025 Merit School of Education Rampura. All Rights Reserved.",
        designed_by_text: "Designed & Developed by Kamkimat Technologies",
        primary_color: "#172B85",
        admission_open: true,
        floating_whatsapp_visible: true,
        floating_call_visible: true,
        is_active: true,
        sort_order: 0
      }
    ]
  };
}

function serializeForField(value: unknown) {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return String(value);
  return value ? String(value) : "";
}

function normalizePayload(fields: AdminField[] = [], values: CmsRecord) {
  return fields.reduce<CmsRecord>((payload, field) => {
    const value = values[field.name];
    if (field.type === "array") {
      payload[field.name] = String(value || "")
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
      return payload;
    }
    if (field.type === "number") {
      payload[field.name] = Number(value || 0);
      return payload;
    }
    if (field.type === "boolean") {
      payload[field.name] = Boolean(value);
      return payload;
    }
    payload[field.name] = typeof value === "string" ? value.trim() : value;
    return payload;
  }, {});
}

function recordPreview(record: CmsRecord, columns: string[]) {
  return columns
    .map((column) => String(record[column] ?? ""))
    .join(" ")
    .toLowerCase();
}

function formatLabel(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function imageSource(record: CmsRecord, fields: AdminField[] = []) {
  const imageField = fields.find((field) => field.type === "image");
  const src = imageField ? record[imageField.name] : null;
  return typeof src === "string" && src ? src : null;
}

export default function AdminDashboard({
  adminEmail,
  supabaseReady
}: {
  adminEmail?: string;
  supabaseReady: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedSection = searchParams.get("section") || "dashboard";
  const [records, setRecords] = useState<RecordsMap>(() => demoRecords());
  const activeKey = adminModules.some((module) => module.key === requestedSection)
    ? requestedSection
    : "dashboard";
  const [editingRecord, setEditingRecord] = useState<CmsRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [deleteTarget, setDeleteTarget] = useState<CmsRecord | null>(null);
  const deleteConfirmRef = useRef<HTMLButtonElement>(null);

  const activeModule = useMemo(
    () => adminModules.find((module) => module.key === activeKey) || adminModules[0],
    [activeKey]
  );
  const tableName = activeModule.table;
  const currentRows = tableName ? records[tableName] || [] : [];
  const filteredRows = currentRows.filter((record) =>
    recordPreview(record, activeModule.columns || []).includes(searchTerm.toLowerCase())
  );

  const form = useForm<CmsRecord>({
    resolver: zodResolver(cmsRecordSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (!deleteTarget) return;
    deleteConfirmRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDeleteTarget(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [deleteTarget]);

  useEffect(() => {
    if (!supabaseReady || !isBrowserSupabaseConfigured()) return;

    let cancelled = false;
    async function loadData() {
      setLoading(true);
      try {
        const supabase = createClient();
        const results = await Promise.all(
          adminTables.map(async (table) => {
            const { data, error } = await supabase
              .from(table)
              .select("*")
              .order("created_at", { ascending: false });
            if (error) throw error;
            return [table, data || []] as const;
          })
        );
        if (!cancelled) {
          setRecords((existing) => ({
            ...existing,
            ...Object.fromEntries(results)
          }));
        }
      } catch {
        setToast({
          type: "error",
          message:
            "Could not load Supabase CMS data. Check schema, RLS policies and env keys."
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [supabaseReady]);

  useEffect(() => {
    const firstRow = tableName ? records[tableName]?.[0] : null;
    const nextRecord =
      editingRecord ||
      (activeModule.kind === "singleton" && firstRow ? firstRow : null);

    const defaults = (activeModule.fields || []).reduce<CmsRecord>((values, field) => {
      values[field.name] = serializeForField(nextRecord?.[field.name]);
      return values;
    }, {});

    form.reset(defaults);
  }, [activeModule, editingRecord, form, records, tableName]);

  function showToast(nextToast: Toast) {
    setToast(nextToast);
    window.setTimeout(() => setToast(null), 3800);
  }

  function selectModule(key: string) {
    setEditingRecord(null);
    setSearchTerm("");
    setMobileMenuOpen(false);
    router.replace(key === "dashboard" ? "/admin/dashboard" : `/admin/dashboard?section=${key}`, { scroll: false });
  }

  async function handleSave(values: CmsRecord) {
    if (!tableName || !activeModule.fields) return;

    const missingField = activeModule.fields.find((field) => {
      if (!field.required) return false;
      const value = values[field.name];
      return value === undefined || value === null || String(value).trim() === "";
    });
    if (missingField) {
      showToast({ type: "error", message: `${missingField.label} is required.` });
      return;
    }

    const payload = normalizePayload(activeModule.fields, values);
    const existing =
      editingRecord ||
      (activeModule.kind === "singleton" ? records[tableName]?.[0] : null);
    const nextPayload = existing?.id ? { ...payload, id: existing.id } : payload;
    setSaving(true);

    try {
      if (supabaseReady && isBrowserSupabaseConfigured()) {
        const supabase = createClient();
        const query = existing?.id
          ? supabase.from(tableName).update(payload).eq("id", existing.id).select("*").single()
          : supabase.from(tableName).insert(payload).select("*").single();
        const { data, error } = await query;
        if (error) throw error;

        setRecords((current) => ({
          ...current,
          [tableName]: existing?.id
            ? current[tableName].map((row) => (row.id === existing.id ? data : row))
            : [data, ...(current[tableName] || [])]
        }));
      } else {
        const recordSlug = String(
          payload.title || payload.name || payload.heading || payload.session || "record"
        )
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 40);
        const localId = existing?.id || `local-${tableName}-${recordSlug}-${(records[tableName]?.length || 0) + 1}`;
        const localRecord = { ...nextPayload, id: localId };
        setRecords((current) => ({
          ...current,
          [tableName]: existing
            ? current[tableName].map((row) => (row.id === existing.id ? localRecord : row))
            : [localRecord, ...(current[tableName] || [])]
        }));
      }

      setEditingRecord(null);
      form.reset();
      showToast({ type: "success", message: "Content saved successfully." });
    } catch {
      showToast({ type: "error", message: "Save failed. Please check Supabase permissions." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!tableName || !deleteTarget) return;
    const id = deleteTarget.id;

    try {
      if (supabaseReady && isBrowserSupabaseConfigured() && id) {
        const supabase = createClient();
        const { error } = await supabase.from(tableName).delete().eq("id", id);
        if (error) throw error;
      }
      setRecords((current) => ({
        ...current,
        [tableName]: current[tableName].filter((row) => row !== deleteTarget && row.id !== id)
      }));
      setDeleteTarget(null);
      showToast({ type: "success", message: "Record deleted." });
    } catch {
      showToast({ type: "error", message: "Delete failed. Check admin permissions." });
    }
  }

  async function updateEnquiryStatus(record: CmsRecord, status: string) {
    if (!tableName) return;

    setRecords((current) => ({
      ...current,
      [tableName]: current[tableName].map((row) =>
        row.id === record.id ? { ...row, status } : row
      )
    }));

    if (supabaseReady && isBrowserSupabaseConfigured() && record.id) {
      const supabase = createClient();
      await supabase.from(tableName).update({ status }).eq("id", record.id);
    }
  }

  async function handleImageUpload(field: AdminField, file: File) {
    const previewUrl = URL.createObjectURL(file);
    form.setValue(field.name, previewUrl);

    if (!supabaseReady || !isBrowserSupabaseConfigured()) {
      showToast({ type: "success", message: "Preview added. Configure Supabase to upload permanently." });
      return;
    }

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${activeModule.key}/${file.lastModified}-${file.name.replace(/\s+/g, "-")}.${ext}`;
      const { error } = await supabase.storage.from(storageBucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (error) throw error;
      const { data } = supabase.storage.from(storageBucket).getPublicUrl(path);
      form.setValue(field.name, data.publicUrl);
      showToast({ type: "success", message: "Image uploaded to Supabase Storage." });
    } catch {
      showToast({ type: "error", message: "Image upload failed. Check storage bucket policies." });
    }
  }

  async function logout() {
    if (supabaseReady && isBrowserSupabaseConfigured()) {
      await createClient().auth.signOut();
    }
    router.push("/admin/login");
  }

  const overviewCards = [
    { label: "Total Enquiries", value: records.enquiries?.length || 0 },
    { label: "Gallery Images", value: records.gallery_images?.length || 0 },
    { label: "Total Notices", value: records.notices?.length || 0 },
    { label: "Total Events", value: records.events?.length || 0 },
    {
      label: "Admission Status",
      value: String(records.admission_info?.[0]?.status || "open").toUpperCase()
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 border-r border-slate-200 bg-white shadow-premium transition lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft">
              <Image
                src="/assets/logo.png"
                alt="Merit School of Education Rampura Logo"
                width={56}
                height={56}
                className="h-10 w-10 object-contain"
                priority
              />
            </span>
            <div>
              <p className="text-base font-black text-royal-800">Merit Admin</p>
              <p className="text-xs font-bold text-slate-500">CMS Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            className="focus-ring rounded-full p-2 text-slate-500 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close admin menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="h-[calc(100vh-5rem)] overflow-y-auto p-4">
          {adminModules.map((module) => {
            const Icon = module.icon;
            const active = module.key === activeKey;
            return (
              <button
                type="button"
                key={module.key}
                onClick={() => selectModule(module.key)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-black transition ${
                  active
                    ? "bg-royal-700 text-white shadow-soft"
                    : "text-slate-600 hover:bg-royal-50 hover:text-royal-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                {module.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={logout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg border border-rose-100 px-4 py-3 text-left text-sm font-black text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      <div className="min-w-0 lg:pl-80">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/92 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="focus-ring rounded-full border border-slate-200 bg-white p-3 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open admin menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-royal-600">
                  Admin Panel
                </p>
                <h1 className="text-xl font-black text-ink sm:text-2xl">
                  {activeModule.label}
                </h1>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <a
                href="/"
                target="_blank"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-royal-800"
              >
                View Website
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={logout}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-royal-700 px-4 py-2 text-sm font-black text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          {!supabaseReady ? (
            <div className="mb-6 rounded-lg border border-gold-200 bg-gold-50 p-4 text-sm font-bold leading-6 text-royal-900">
              Supabase env vars are not configured yet. This dashboard is running
              in safe demo mode. Add `NEXT_PUBLIC_SUPABASE_URL` and
              `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, then run the SQL schema to
              enable real CMS saves.
            </div>
          ) : null}

          {toast ? (
            <div
              className={`mb-6 rounded-lg border p-4 text-sm font-bold ${
                toast.type === "success"
                  ? "border-leaf-100 bg-leaf-50 text-leaf-700"
                  : "border-rose-100 bg-rose-50 text-rose-700"
              }`}
            >
              {toast.message}
            </div>
          ) : null}

          <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
                  {activeKey === "dashboard" ? "Overview" : `CMS / ${activeModule.label}`}
                </p>
                <h2 className="mt-2 text-2xl font-black text-ink">
                  {activeModule.description}
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-royal-50 px-4 py-2 text-sm font-black text-royal-800">
                <CheckCircle2 className="h-4 w-4 text-leaf-500" />
                {supabaseReady ? adminEmail || "Authenticated" : "Demo Mode"}
              </div>
            </div>
          </div>

          {activeModule.kind === "dashboard" ? (
            <DashboardHome
              overviewCards={overviewCards}
              rows={records}
              onSelectModule={selectModule}
            />
          ) : (
            <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-royal-600">
                      {activeModule.kind === "enquiries" ? "Manage Enquiries" : "Content Form"}
                    </p>
                    <h3 className="mt-1 text-xl font-black text-ink">
                      {editingRecord ? "Edit Record" : activeModule.kind === "singleton" ? "Update Section" : "Add New"}
                    </h3>
                  </div>
                  {activeModule.kind !== "singleton" && activeModule.kind !== "enquiries" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingRecord(null);
                        form.reset({});
                      }}
                      className="focus-ring inline-flex items-center gap-2 rounded-full bg-gold-300 px-4 py-2 text-sm font-black text-royal-900"
                    >
                      <Plus className="h-4 w-4" />
                      New
                    </button>
                  ) : null}
                </div>

                {activeModule.kind === "enquiries" ? (
                  <EnquiryTools />
                ) : (
                  <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="mt-6 grid gap-4"
                  >
                    {(activeModule.fields || []).map((field) => (
                      <FieldControl
                        key={field.name}
                        field={field}
                        form={form}
                        onUpload={handleImageUpload}
                      />
                    ))}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="submit"
                        disabled={saving}
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-royal-700 px-6 py-3 text-sm font-black text-white shadow-soft transition hover:bg-royal-800 disabled:opacity-60"
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRecord(null);
                          form.reset({});
                        }}
                        className="focus-ring rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </section>

              <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-royal-600">
                      Records
                    </p>
                    <h3 className="mt-1 text-xl font-black text-ink">
                      {currentRows.length} item{currentRows.length === 1 ? "" : "s"}
                    </h3>
                  </div>
                  <label className="relative block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search records"
                      className="focus-ring w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-bold text-slate-700 sm:w-72"
                    />
                  </label>
                </div>

                {loading ? (
                  <div className="mt-8 grid place-items-center rounded-lg bg-slate-50 py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-royal-700" />
                  </div>
                ) : filteredRows.length ? (
                  <RecordTable
                    module={activeModule}
                    rows={filteredRows}
                    onEdit={(record) => setEditingRecord(record)}
                    onDelete={(record) => setDeleteTarget(record)}
                    onStatusChange={updateEnquiryStatus}
                  />
                ) : (
                  <div className="mt-8 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <p className="text-lg font-black text-ink">No records found</p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Add your first item or adjust the search filter.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
        </main>
      </div>

      {deleteTarget ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && setDeleteTarget(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title" className="w-full max-w-md rounded-lg bg-white p-6 shadow-premium">
            <h3 id="delete-dialog-title" className="text-2xl font-black text-ink">Delete record?</h3>
            <p className="mt-3 leading-7 text-slate-600">
              This action removes the selected record from the CMS. It cannot be
              undone from the dashboard.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                ref={deleteConfirmRef}
                type="button"
                onClick={handleDelete}
                className="focus-ring rounded-full bg-rose-600 px-5 py-3 text-sm font-black text-white"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="focus-ring rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FieldControl({
  field,
  form,
  onUpload
}: {
  field: AdminField;
  form: ReturnType<typeof useForm<CmsRecord>>;
  onUpload: (field: AdminField, file: File) => void;
}) {
  const value = form.watch(field.name);
  const common =
    "focus-ring w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-ink";

  if (field.type === "boolean") {
    return (
      <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
        <span className="font-black text-slate-700">{field.label}</span>
        <input type="checkbox" {...form.register(field.name)} className="h-5 w-5" />
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "array") {
    return (
      <label className="grid gap-2">
        <span className="text-sm font-black text-slate-700">{field.label}</span>
        <textarea
          rows={field.type === "array" ? 4 : 5}
          placeholder={field.placeholder}
          {...form.register(field.name)}
          className={`${common} resize-none`}
        />
        {field.type === "array" ? (
          <span className="text-xs font-semibold text-slate-500">
            Add one item per line or separate items with commas.
          </span>
        ) : null}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="grid gap-2">
        <span className="text-sm font-black text-slate-700">{field.label}</span>
        <span className="relative">
          <select {...form.register(field.name)} className={`${common} appearance-none`}>
            {(field.options || []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </span>
      </label>
    );
  }

  if (field.type === "image") {
    const src = typeof value === "string" && value ? value : "";
    return (
      <div className="grid gap-2">
        <span className="text-sm font-black text-slate-700">{field.label}</span>
        {src ? (
          <div className="relative h-40 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <Image
              src={src}
              alt={field.label}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : null}
        <input
          type="text"
          placeholder="Paste image URL"
          {...form.register(field.name)}
          className={common}
        />
        <label className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-royal-100 bg-white px-4 py-3 text-sm font-black text-royal-800">
          <Upload className="h-4 w-4" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(field, file);
            }}
          />
        </label>
      </div>
    );
  }

  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-700">{field.label}</span>
      <input
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        placeholder={field.placeholder}
        {...form.register(field.name)}
        className={common}
      />
    </label>
  );
}

function DashboardHome({
  overviewCards,
  rows,
  onSelectModule
}: {
  overviewCards: { label: string; value: string | number }[];
  rows: RecordsMap;
  onSelectModule: (key: string) => void;
}) {
  const latestEnquiries = rows.enquiries?.slice(0, 5) || [];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              {card.label}
            </p>
            <p className="mt-4 text-3xl font-black text-royal-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-2xl font-black text-ink">Quick Actions</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {dashboardQuickActions.map((action) => {
              const Icon = action.icon;
              if ("href" in action) {
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 font-black text-royal-800"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {action.label}
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                );
              }
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => onSelectModule(action.moduleKey)}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 text-left font-black text-royal-800 transition hover:bg-royal-50"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {action.label}
                  </span>
                  <Plus className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </section>

        <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-2xl font-black text-ink">Latest Enquiries</h3>
          <div className="mt-6 grid gap-3">
            {latestEnquiries.length ? (
              latestEnquiries.map((enquiry) => (
                <div
                  key={String(enquiry.id || enquiry.phone_number)}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-black text-ink">
                    {String(enquiry.parent_name || "Parent")} -{" "}
                    {String(enquiry.student_name || "Student")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {String(enquiry.class_interested || "")} |{" "}
                    {String(enquiry.status || "New")}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm font-bold text-slate-500">
                No enquiries yet. Public form submissions will appear here.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function EnquiryTools() {
  return (
    <div className="mt-6 rounded-lg bg-royal-50 p-5 text-sm font-bold leading-7 text-royal-900">
      Use the record list to change enquiry status, call parents, open WhatsApp,
      or delete resolved entries. Public form submissions are saved to Supabase
      when configured and still redirect to WhatsApp.
    </div>
  );
}

function RecordTable({
  module,
  rows,
  onEdit,
  onDelete,
  onStatusChange
}: {
  module: AdminModule;
  rows: CmsRecord[];
  onEdit: (record: CmsRecord) => void;
  onDelete: (record: CmsRecord) => void;
  onStatusChange: (record: CmsRecord, status: string) => void;
}) {
  const columns = module.columns || [];

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Preview</th>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3">
                  {formatLabel(column)}
                </th>
              ))}
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((record, index) => (
              <RecordRow
                key={String(record.id || index)}
                module={module}
                record={record}
                columns={columns}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 p-3 lg:hidden">
        {rows.map((record, index) => (
          <RecordCard
            key={String(record.id || index)}
            module={module}
            record={record}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

function RecordRow({
  module,
  record,
  columns,
  onEdit,
  onDelete,
  onStatusChange
}: {
  module: AdminModule;
  record: CmsRecord;
  columns: string[];
  onEdit: (record: CmsRecord) => void;
  onDelete: (record: CmsRecord) => void;
  onStatusChange: (record: CmsRecord, status: string) => void;
}) {
  const src = imageSource(record, module.fields);
  return (
    <tr className="bg-white">
      <td className="px-4 py-3">
        {src ? (
          <div className="relative h-12 w-16 overflow-hidden rounded-md bg-slate-100">
            <Image src={src} alt="" fill unoptimized className="object-cover" />
          </div>
        ) : (
          <span className="inline-flex h-12 w-16 items-center justify-center rounded-md bg-royal-50 text-xs font-black text-royal-700">
            CMS
          </span>
        )}
      </td>
      {columns.map((column) => (
        <td key={column} className="max-w-[14rem] truncate px-4 py-3 font-bold text-slate-700">
          {module.kind === "enquiries" && column === "status" ? (
            <select
              value={String(record.status || "New")}
              onChange={(event) => onStatusChange(record, event.target.value)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black"
            >
              {enquiryStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          ) : (
            String(record[column] ?? "")
          )}
        </td>
      ))}
      <td className="px-4 py-3">
        <ActionButtons module={module} record={record} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}

function RecordCard({
  module,
  record,
  columns,
  onEdit,
  onDelete,
  onStatusChange
}: {
  module: AdminModule;
  record: CmsRecord;
  columns: string[];
  onEdit: (record: CmsRecord) => void;
  onDelete: (record: CmsRecord) => void;
  onStatusChange: (record: CmsRecord, status: string) => void;
}) {
  const src = imageSource(record, module.fields);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      {src ? (
        <div className="relative mb-4 h-40 overflow-hidden rounded-lg bg-slate-100">
          <Image src={src} alt="" fill unoptimized className="object-cover" />
        </div>
      ) : null}
      <div className="grid gap-2">
        {columns.map((column) => (
          <div key={column} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              {formatLabel(column)}
            </p>
            {module.kind === "enquiries" && column === "status" ? (
              <select
                value={String(record.status || "New")}
                onChange={(event) => onStatusChange(record, event.target.value)}
                className="mt-2 w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-black"
              >
                {enquiryStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            ) : (
              <p className="mt-1 break-words font-bold text-slate-700">
                {String(record[column] ?? "")}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ActionButtons module={module} record={record} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

function ActionButtons({
  module,
  record,
  onEdit,
  onDelete
}: {
  module: AdminModule;
  record: CmsRecord;
  onEdit: (record: CmsRecord) => void;
  onDelete: (record: CmsRecord) => void;
}) {
  const phone = String(record.phone_number || "");
  const message = [
    "Hello Merit School, I want admission information.",
    "",
    `Parent Name: ${String(record.parent_name || "")}`,
    `Student Name: ${String(record.student_name || "")}`,
    `Class: ${String(record.class_interested || "")}`,
    `Phone: ${phone}`,
    `Message: ${String(record.message || "")}`
  ].join("\n");

  return (
    <div className="flex flex-wrap gap-2">
      {module.kind !== "enquiries" ? (
        <button
          type="button"
          onClick={() => onEdit(record)}
          className="focus-ring rounded-full bg-royal-50 px-3 py-2 text-xs font-black text-royal-800"
        >
          Edit
        </button>
      ) : (
        <>
          <a
            href={`https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`}
            target="_blank"
            className="focus-ring inline-flex items-center gap-1 rounded-full bg-leaf-50 px-3 py-2 text-xs font-black text-leaf-700"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <a
            href={`tel:${phone || whatsappNumber}`}
            className="focus-ring inline-flex items-center gap-1 rounded-full bg-royal-50 px-3 py-2 text-xs font-black text-royal-800"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
        </>
      )}
      <button
        type="button"
        onClick={() => onDelete(record)}
        className="focus-ring inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-2 text-xs font-black text-rose-700"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </div>
  );
}
