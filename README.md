# Merit School of Education Rampura

Production-ready Next.js website and Supabase-powered CMS for Merit School of Education Rampura, Sirali, District Harda, Madhya Pradesh.

## Features

- Premium responsive public school website
- Admission enquiry form with Indian mobile validation and WhatsApp handoff
- Contact form with validated Supabase message storage
- Supabase Auth-protected admin dashboard
- CMS modules for hero, about, admissions, academics, facilities, activities, gallery, notices, events, faculty, testimonials, admission enquiries, contact messages, contact details, site settings and SEO
- Supabase Storage image uploads
- Accessible navigation, modals, gallery lightbox and mobile menus
- Dynamic sitemap, robots rules, metadata, Open Graph and favicon

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- Optional Supabase project for persistent CMS data

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Admin routes:

- `http://localhost:3000/admin/login`
- `http://localhost:3000/admin/dashboard`
- `http://localhost:3000/admin/notices`
- `http://localhost:3000/admin/events`
- `http://localhost:3000/admin/gallery`
- `http://localhost:3000/admin/faculty`
- `http://localhost:3000/admin/enquiries`
- `http://localhost:3000/admin/contact-messages`
- `http://localhost:3000/admin/site-settings`

Without Supabase variables, the public site remains available and enquiries can still validate and open WhatsApp, but they are not persisted. The demo CMS is available only during local development; production blocks dashboard access until Supabase Auth is configured and `ADMIN_CMS_ENABLED=true` is set on the server.

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=optional_legacy_anon_key
ADMIN_CMS_ENABLED=true
```

Use either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or the legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Run `supabase/schema.sql` in the Supabase SQL editor, then create the admin user in Supabase Auth. Add one matching administrator profile using the Auth user's UUID:

```sql
insert into public.admin_profiles (user_id, name, role)
values ('AUTH_USER_UUID', 'Merit School Admin', 'admin')
on conflict (user_id) do update
set name = excluded.name, role = excluded.role;
```

## Quality Gates

```bash
npm run lint
npx tsc --noEmit
npm run build
npm audit --omit=dev
```

## Vercel Deployment

1. Import the GitHub repository into Vercel.
2. Add the required environment variables for Production and Preview.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy the `main` branch.
5. Re-test `/`, `/admin/login`, `/admin/dashboard`, both forms and image uploads.

The project uses standard Next.js build settings; no custom Vercel build command is required.
