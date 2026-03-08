# KM School Rebuild

This workspace contains a modern replacement for the Wix site at `ritul2020.wixsite.com/kmschool`.

## What is included

- A rebuilt public site in Next.js 16 with the same primary page structure:
  - `/`
  - `/our-school`
  - `/academics`
  - `/admissions`
  - `/blog`
  - `/file-share`
  - `/contact`
  - `/post/[slug]`
  - `/events/[slug]`
- A secure login path at `/login`
- An admin/content portal at `/portal`
- Supabase-ready content queries and server actions for:
  - news posts
  - documents
  - result notices
  - gallery images

## What was extracted from Wix

- Key page content and public navigation
- Multiple site images, saved locally in [`public/media`](/Users/arjunsarkar/school%20website/public/media)
- Teacher photos and homepage/gallery visuals
- Public post titles and excerpts

No public video URLs were found in the downloaded Wix pages, so there is currently no video asset pack in this rebuild.

## What was intentionally replaced

- Wix Members / Groups
  - These are not portable in a reliable or secure way.
  - They are replaced with a custom login + admin portal architecture.
- Generic Wix placeholder content
  - The original site still contains some template/demo sections.
  - The rebuild removes or rewrites those so the site feels more professional.

## Stack

- Next.js 16
- React 19
- Supabase Auth
- Supabase Postgres
- Supabase Storage

## Local development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run lint
npm run build
```

## Enable login features

1. Create a Supabase project.
2. Copy [`.env.example`](/Users/arjunsarkar/school%20website/.env.example) to `.env.local`.
3. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` only if you later add service-role admin tooling
4. In Supabase SQL Editor, run [`supabase/schema.sql`](/Users/arjunsarkar/school%20website/supabase/schema.sql).
5. In Supabase Auth:
   - enable `Email`
   - enable `Google` if you want OAuth
   - add your local/dev/prod callback URL:
     - `http://localhost:3000/auth/callback`
     - your production `https://.../auth/callback`
6. Sign up once through the app.
7. Promote yourself to `super_admin` in the `profiles` table.

## Admin model

- `super_admin`
  - you
  - trusted people who can control roles and overall publishing policy
- `content_admin`
  - non-technical staff who add/remove notices, documents, results, and images
- `viewer`
  - signed-in user without publishing rights

Important: code editing is not part of the portal. Repository and deployment access should stay restricted to you or other technical maintainers.

## How the portal works

The portal page at [`/portal`](/Users/arjunsarkar/school%20website/src/app/portal/page.tsx) includes forms to add and remove:

- news items
- document resources
- result notices
- gallery images

Uploaded files go to the `school-assets` storage bucket defined in the SQL schema.

## Security notes

- New users default to `viewer`
- Public reads are limited to published content
- Content mutations require `content_admin` or `super_admin`
- Storage upload/update/delete policies are admin-only

## Current limitation

This is a strong replacement foundation, not a byte-for-byte export of Wix runtime behavior. The public design, content structure, and media are preserved, but proprietary Wix member features were replaced with a more secure custom architecture.
