create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'user_role'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.user_role as enum ('super_admin', 'content_admin', 'viewer');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_bn text,
  slug text not null unique,
  excerpt text not null,
  excerpt_bn text,
  body text not null,
  body_bn text,
  cover_image_url text,
  published_at date not null default current_date,
  featured boolean not null default false,
  published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_bn text,
  slug text not null unique,
  category text not null,
  category_bn text,
  description text not null,
  description_bn text,
  file_url text,
  published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_bn text,
  slug text not null unique,
  summary text not null,
  summary_bn text,
  details text not null,
  details_bn text,
  location text not null,
  location_bn text,
  result_date date,
  status text not null default 'Awaiting publication',
  status_bn text,
  published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_bn text,
  caption text,
  caption_bn text,
  image_url text not null,
  display_order integer not null default 0,
  published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news_posts add column if not exists title_bn text;
alter table public.news_posts add column if not exists excerpt_bn text;
alter table public.news_posts add column if not exists body_bn text;

alter table public.documents add column if not exists title_bn text;
alter table public.documents add column if not exists category_bn text;
alter table public.documents add column if not exists description_bn text;

alter table public.results add column if not exists title_bn text;
alter table public.results add column if not exists summary_bn text;
alter table public.results add column if not exists details_bn text;
alter table public.results add column if not exists location_bn text;
alter table public.results add column if not exists status_bn text;

alter table public.gallery_items add column if not exists title_bn text;
alter table public.gallery_items add column if not exists caption_bn text;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute procedure public.set_updated_at();

drop trigger if exists news_posts_set_updated_at on public.news_posts;
create trigger news_posts_set_updated_at
before update on public.news_posts
for each row
execute procedure public.set_updated_at();

drop trigger if exists documents_set_updated_at on public.documents;
create trigger documents_set_updated_at
before update on public.documents
for each row
execute procedure public.set_updated_at();

drop trigger if exists results_set_updated_at on public.results;
create trigger results_set_updated_at
before update on public.results
for each row
execute procedure public.set_updated_at();

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at
before update on public.gallery_items
for each row
execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'viewer'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

create or replace function public.is_content_admin(check_id uuid default auth.uid())
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_id
      and role in ('super_admin', 'content_admin')
  );
$$;

create or replace function public.is_super_admin(check_id uuid default auth.uid())
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_id
      and role = 'super_admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.news_posts enable row level security;
alter table public.documents enable row level security;
alter table public.results enable row level security;
alter table public.gallery_items enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles
for select
using (auth.uid() = id or public.is_content_admin());

drop policy if exists "profiles_update_self_or_super_admin" on public.profiles;
create policy "profiles_update_self_or_super_admin"
on public.profiles
for update
using (auth.uid() = id or public.is_super_admin())
with check (auth.uid() = id or public.is_super_admin());

drop policy if exists "public_news_read" on public.news_posts;
create policy "public_news_read"
on public.news_posts
for select
using (published = true);

drop policy if exists "admin_news_manage" on public.news_posts;
create policy "admin_news_manage"
on public.news_posts
for all
using (public.is_content_admin())
with check (public.is_content_admin());

drop policy if exists "public_documents_read" on public.documents;
create policy "public_documents_read"
on public.documents
for select
using (published = true);

drop policy if exists "admin_documents_manage" on public.documents;
create policy "admin_documents_manage"
on public.documents
for all
using (public.is_content_admin())
with check (public.is_content_admin());

drop policy if exists "public_results_read" on public.results;
create policy "public_results_read"
on public.results
for select
using (published = true);

drop policy if exists "admin_results_manage" on public.results;
create policy "admin_results_manage"
on public.results
for all
using (public.is_content_admin())
with check (public.is_content_admin());

drop policy if exists "public_gallery_read" on public.gallery_items;
create policy "public_gallery_read"
on public.gallery_items
for select
using (published = true);

drop policy if exists "admin_gallery_manage" on public.gallery_items;
create policy "admin_gallery_manage"
on public.gallery_items
for all
using (public.is_content_admin())
with check (public.is_content_admin());

insert into storage.buckets (id, name, public)
values ('school-assets', 'school-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public_read_school_assets" on storage.objects;
create policy "public_read_school_assets"
on storage.objects
for select
using (bucket_id = 'school-assets');

drop policy if exists "admin_upload_school_assets" on storage.objects;
create policy "admin_upload_school_assets"
on storage.objects
for insert
with check (
  bucket_id = 'school-assets'
  and public.is_content_admin()
);

drop policy if exists "admin_update_school_assets" on storage.objects;
create policy "admin_update_school_assets"
on storage.objects
for update
using (
  bucket_id = 'school-assets'
  and public.is_content_admin()
)
with check (
  bucket_id = 'school-assets'
  and public.is_content_admin()
);

drop policy if exists "admin_delete_school_assets" on storage.objects;
create policy "admin_delete_school_assets"
on storage.objects
for delete
using (
  bucket_id = 'school-assets'
  and public.is_content_admin()
);

-- After your first successful signup, promote your account:
-- update public.profiles
-- set role = 'super_admin'
-- where id = 'YOUR_AUTH_USER_ID';
