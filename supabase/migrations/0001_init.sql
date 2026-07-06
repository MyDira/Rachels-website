-- Rachel's portfolio website schema
-- Run this in the Supabase SQL editor (or `supabase db push`) for project bnxjwiltforduwopnrly

create extension if not exists pgcrypto;

-- ─── Tables ────────────────────────────────────────────────────────────────

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  brand_font text,
  attributes text[] default '{}',
  palette text[] default '{}',
  logo_url text,
  cover_url text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  caption text,
  sort_order int not null default 0
);

create table if not exists public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─── Row Level Security ────────────────────────────────────────────────────

alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.site_content enable row level security;
alter table public.contact_messages enable row level security;

-- Public (anon) can read site content
create policy "public read projects" on public.projects
  for select using (true);
create policy "public read project_images" on public.project_images
  for select using (true);
create policy "public read site_content" on public.site_content
  for select using (true);

-- Anyone can send a contact message
create policy "public insert contact_messages" on public.contact_messages
  for insert with check (true);

-- Authenticated (Rachel) manages everything
create policy "auth manage projects" on public.projects
  for all to authenticated using (true) with check (true);
create policy "auth manage project_images" on public.project_images
  for all to authenticated using (true) with check (true);
create policy "auth manage site_content" on public.site_content
  for all to authenticated using (true) with check (true);
create policy "auth manage contact_messages" on public.contact_messages
  for all to authenticated using (true) with check (true);

-- ─── Storage bucket for admin uploads ──────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read portfolio bucket" on storage.objects
  for select using (bucket_id = 'portfolio');
create policy "auth upload portfolio bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio');
create policy "auth update portfolio bucket" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio');
create policy "auth delete portfolio bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio');
