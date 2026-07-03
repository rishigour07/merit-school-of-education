-- Merit School of Education Rampura CMS schema
-- Run this in the Supabase SQL editor, create one user in Supabase Auth, then set
-- that user's app_metadata role to "admin" as documented in README.md.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  school_name text not null default 'Merit School of Education Rampura',
  homepage_headline text,
  homepage_subtitle text,
  about_text text,
  phone_number text,
  email text,
  address text,
  school_timing text,
  instagram_handle text,
  admission_cta_text text,
  logo_url text default '/assets/logo.png',
  footer_text text,
  copyright_text text,
  designed_by_text text default 'Designed & Developed by Kamkimat Technologies',
  primary_color text default '#172B85',
  admission_open boolean not null default true,
  floating_whatsapp_visible boolean not null default true,
  floating_call_visible boolean not null default true,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_section (
  id uuid primary key default gen_random_uuid(),
  badge_text text not null,
  main_heading text not null,
  subheading text not null,
  description text,
  cta_text text,
  hero_image_url text,
  admission_status_text text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.about_section (
  id uuid primary key default gen_random_uuid(),
  heading text not null,
  description text,
  image_url text,
  values jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admission_info (
  id uuid primary key default gen_random_uuid(),
  session text not null,
  status text not null default 'open',
  classes_offered text,
  medium text,
  office_timing text,
  school_code text,
  dise_code text,
  documents_required jsonb not null default '[]'::jsonb,
  cta_text text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.academics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  class_range text,
  description text,
  features jsonb not null default '[]'::jsonb,
  image_url text,
  icon text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.facilities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  icon text,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text,
  category text,
  alt_text text,
  image_url text not null,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text,
  description text,
  notice_date date,
  is_important boolean not null default false,
  attachment_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text,
  description text,
  event_date date,
  image_url text,
  location text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  qualification text,
  subject text,
  experience text,
  photo_url text,
  short_bio text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  student_class text,
  message text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  student_name text not null,
  class_interested text not null,
  phone_number text not null,
  message text,
  status text not null default 'New'
    check (status in ('New', 'Contacted', 'Follow-up', 'Converted', 'Closed')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone_number text not null,
  email text,
  subject text not null,
  message text not null,
  status text not null default 'New'
    check (status in ('New', 'Replied', 'Closed')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_details (
  id uuid primary key default gen_random_uuid(),
  address text,
  phone_numbers jsonb not null default '[]'::jsonb,
  whatsapp_number text,
  email text,
  instagram_handle text,
  office_timing text,
  google_map_embed_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_settings (
  id uuid primary key default gen_random_uuid(),
  website_title text,
  meta_description text,
  keywords jsonb not null default '[]'::jsonb,
  og_title text,
  og_description text,
  og_image_url text,
  favicon_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_settings add column if not exists homepage_headline text;
alter table public.site_settings add column if not exists homepage_subtitle text;
alter table public.site_settings add column if not exists about_text text;
alter table public.site_settings add column if not exists phone_number text;
alter table public.site_settings add column if not exists email text;
alter table public.site_settings add column if not exists address text;
alter table public.site_settings add column if not exists school_timing text;
alter table public.site_settings add column if not exists instagram_handle text;
alter table public.site_settings add column if not exists admission_cta_text text;
alter table public.teachers add column if not exists qualification text;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'site_settings', 'hero_section', 'about_section', 'admission_info',
    'academics', 'facilities', 'activities', 'gallery_images', 'notices',
    'events', 'teachers', 'testimonials', 'enquiries', 'contact_messages', 'contact_details',
    'seo_settings'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name,
      table_name
    );
    execute format('alter table public.%I enable row level security', table_name);
    execute format('grant select on public.%I to anon, authenticated', table_name);
    execute format('grant insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end $$;

drop policy if exists "Public can read active site settings" on public.site_settings;
create policy "Public can read active site settings" on public.site_settings
  for select to anon using (is_active = true);
drop policy if exists "Public can read active hero" on public.hero_section;
create policy "Public can read active hero" on public.hero_section
  for select to anon using (is_active = true);
drop policy if exists "Public can read active about" on public.about_section;
create policy "Public can read active about" on public.about_section
  for select to anon using (is_active = true);
drop policy if exists "Public can read active admission" on public.admission_info;
create policy "Public can read active admission" on public.admission_info
  for select to anon using (is_active = true);
drop policy if exists "Public can read active academics" on public.academics;
create policy "Public can read active academics" on public.academics
  for select to anon using (is_active = true);
drop policy if exists "Public can read active facilities" on public.facilities;
create policy "Public can read active facilities" on public.facilities
  for select to anon using (is_active = true);
drop policy if exists "Public can read active activities" on public.activities;
create policy "Public can read active activities" on public.activities
  for select to anon using (is_active = true);
drop policy if exists "Public can read active gallery" on public.gallery_images;
create policy "Public can read active gallery" on public.gallery_images
  for select to anon using (is_active = true);
drop policy if exists "Public can read active notices" on public.notices;
create policy "Public can read active notices" on public.notices
  for select to anon using (is_active = true);
drop policy if exists "Public can read active events" on public.events;
create policy "Public can read active events" on public.events
  for select to anon using (is_active = true);
drop policy if exists "Public can read active teachers" on public.teachers;
create policy "Public can read active teachers" on public.teachers
  for select to anon using (is_active = true);
drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials" on public.testimonials
  for select to anon using (is_active = true);
drop policy if exists "Public can read active contact" on public.contact_details;
create policy "Public can read active contact" on public.contact_details
  for select to anon using (is_active = true);
drop policy if exists "Public can read active seo" on public.seo_settings;
create policy "Public can read active seo" on public.seo_settings
  for select to anon using (is_active = true);

drop policy if exists "Anyone can create admission enquiry" on public.enquiries;
create policy "Anyone can create admission enquiry" on public.enquiries
  for insert to anon
  with check (parent_name <> '' and student_name <> '' and phone_number <> '');

drop policy if exists "Anyone can create contact message" on public.contact_messages;
create policy "Anyone can create contact message" on public.contact_messages
  for insert to anon
  with check (name <> '' and phone_number <> '' and subject <> '' and message <> '');

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'site_settings', 'hero_section', 'about_section', 'admission_info',
    'academics', 'facilities', 'activities', 'gallery_images', 'notices',
    'events', 'teachers', 'testimonials', 'enquiries', 'contact_messages', 'contact_details',
    'seo_settings'
  ]
  loop
    execute format('drop policy if exists "Admin can manage %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Admin can manage %s" on public.%I for all to authenticated using (((select auth.jwt()) -> ''app_metadata'' ->> ''role'') = ''admin'') with check (((select auth.jwt()) -> ''app_metadata'' ->> ''role'') = ''admin'')',
      table_name,
      table_name
    );
  end loop;
end $$;

insert into storage.buckets (id, name, public)
values ('website-assets', 'website-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read website assets" on storage.objects;

drop policy if exists "Admins can upload website assets" on storage.objects;
create policy "Admins can upload website assets" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'website-assets' and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update website assets" on storage.objects;
create policy "Admins can update website assets" on storage.objects
  for update to authenticated
  using (bucket_id = 'website-assets' and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'website-assets' and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete website assets" on storage.objects;
create policy "Admins can delete website assets" on storage.objects
  for delete to authenticated
  using (bucket_id = 'website-assets' and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

insert into public.site_settings (school_name, logo_url, footer_text, copyright_text)
values (
  'Merit School of Education Rampura',
  '/assets/logo.png',
  'Quality education from Play Group to 10th Class with discipline, activities and values.',
  '2025 Merit School of Education Rampura. All Rights Reserved.'
) on conflict do nothing;

insert into public.hero_section (badge_text, main_heading, subheading, description, cta_text, hero_image_url, admission_status_text)
values (
  'Admission Open 2025-26',
  'Shaping Bright Futures with Quality Education',
  'A trusted English and Hindi medium school in Rampura where education, discipline and character help every child grow with confidence.',
  'A trusted English and Hindi medium school in Rampura for Play Group to 10th Class, focused on academic excellence, discipline, confidence and strong values.',
  'Explore Admissions',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85',
  'Admission Open 2025-26'
) on conflict do nothing;

insert into public.about_section (heading, description, image_url, values)
values (
  'Welcome to Merit School of Education Rampura',
  'Merit School supports children through academic clarity, discipline, activities and strong values.',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85',
  '["शिक्षा", "सेवा", "संस्कार"]'::jsonb
) on conflict do nothing;

insert into public.admission_info (session, status, classes_offered, medium, office_timing, school_code, dise_code, documents_required, cta_text)
values (
  '2025-26',
  'open',
  'Play Group to 10th Class',
  'English & Hindi Medium',
  'Morning 10 AM to Evening 4 PM',
  '682100',
  '23360310003',
  '["Student Photo", "Aadhaar Card", "Birth Certificate", "Previous Marksheet / TC if applicable", "Parent ID Proof"]'::jsonb,
  'Apply for Admission'
) on conflict do nothing;

insert into public.contact_details (address, phone_numbers, whatsapp_number, email, instagram_handle, office_timing)
values (
  'Near Gramin Khel Maidan, Chachruva Road, Rampura, Sirali, District Harda, Madhya Pradesh',
  '["9926909903", "9977525216", "9926414771"]'::jsonb,
  '9926909903',
  'meritschoolofeducation@gmail.com',
  'merit_school_of_education',
  'Morning 10 AM to Evening 4 PM'
) on conflict do nothing;
