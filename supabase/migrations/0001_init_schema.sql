-- ============================================================================
-- DigiSET Institute — schéma initial (100% Idempotent)
-- Référence : PRD-digiset-institute.md §7 (Modèle de données Supabase)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------------------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Enums (Idempotents)
-- ----------------------------------------------------------------------------
do $$ begin create type content_status as enum ('draft', 'published'); exception when duplicate_object then null; end $$;
do $$ begin create type program_family as enum ('classe_preparatoire', 'licence_professionnelle', 'formation_continue', 'certifications', 'digiset_online'); exception when duplicate_object then null; end $$;
do $$ begin create type admin_role as enum ('super_admin', 'editor'); exception when duplicate_object then null; end $$;
do $$ begin create type submission_status as enum ('nouveau', 'en_cours', 'traite', 'archive'); exception when duplicate_object then null; end $$;
do $$ begin create type lab_type as enum ('physique', 'informatique'); exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- admin_users — profils des comptes back-office, liés à auth.users (SupaAuth)
-- ----------------------------------------------------------------------------
create table if not exists admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role admin_role not null default 'editor',
  created_at timestamptz not null default now()
);

-- Fonctions utilitaires (SECURITY DEFINER)
create or replace function is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admin_users where id = uid);
$$;

create or replace function is_super_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admin_users where id = uid and role = 'super_admin');
$$;

alter table admin_users enable row level security;

drop policy if exists "admin_users: lecture par tout compte admin authentifié" on admin_users;
create policy "admin_users: lecture par tout compte admin authentifié"
  on admin_users for select
  using (is_admin(auth.uid()));

drop policy if exists "admin_users: gestion réservée au super-admin" on admin_users;
create policy "admin_users: gestion réservée au super-admin"
  on admin_users for all
  using (is_super_admin(auth.uid()))
  with check (is_super_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- programs — fiches programme
-- ----------------------------------------------------------------------------
create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  family program_family not null,
  public_cible text,
  duration text,
  credits text,
  summary text,
  objective text,
  admission_profiles text,
  outcomes text,
  career_paths text,
  admission_requirements text,
  status content_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table programs enable row level security;

drop policy if exists "programs: lecture publique du contenu publié" on programs;
create policy "programs: lecture publique du contenu publié" on programs for select using (status = 'published');

drop policy if exists "programs: lecture complète par les admins" on programs;
create policy "programs: lecture complète par les admins" on programs for select using (is_admin(auth.uid()));

drop policy if exists "programs: écriture réservée aux admins" on programs;
create policy "programs: écriture réservée aux admins" on programs for insert with check (is_admin(auth.uid()));

drop policy if exists "programs: modification réservée aux admins" on programs;
create policy "programs: modification réservée aux admins" on programs for update using (is_admin(auth.uid()));

drop policy if exists "programs: suppression réservée aux admins" on programs;
create policy "programs: suppression réservée aux admins" on programs for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- program_options — options rattachées à un programme
-- ----------------------------------------------------------------------------
create table if not exists program_options (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  slug text not null,
  title text not null,
  sigle text,
  content text,
  status content_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, slug)
);

alter table program_options enable row level security;

drop policy if exists "program_options: lecture publique du contenu publié" on program_options;
create policy "program_options: lecture publique du contenu publié" on program_options for select using (status = 'published');

drop policy if exists "program_options: lecture complète par les admins" on program_options;
create policy "program_options: lecture complète par les admins" on program_options for select using (is_admin(auth.uid()));

drop policy if exists "program_options: écriture réservée aux admins" on program_options;
create policy "program_options: écriture réservée aux admins" on program_options for insert with check (is_admin(auth.uid()));

drop policy if exists "program_options: modification réservée aux admins" on program_options;
create policy "program_options: modification réservée aux admins" on program_options for update using (is_admin(auth.uid()));

drop policy if exists "program_options: suppression réservée aux admins" on program_options;
create policy "program_options: suppression réservée aux admins" on program_options for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- news — actualités
-- ----------------------------------------------------------------------------
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  cover_image_url text,
  excerpt text,
  body text not null,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table news enable row level security;

drop policy if exists "news: lecture publique du contenu publié" on news;
create policy "news: lecture publique du contenu publié" on news for select using (status = 'published');

drop policy if exists "news: lecture complète par les admins" on news;
create policy "news: lecture complète par les admins" on news for select using (is_admin(auth.uid()));

drop policy if exists "news: écriture réservée aux admins" on news;
create policy "news: écriture réservée aux admins" on news for insert with check (is_admin(auth.uid()));

drop policy if exists "news: modification réservée aux admins" on news;
create policy "news: modification réservée aux admins" on news for update using (is_admin(auth.uid()));

drop policy if exists "news: suppression réservée aux admins" on news;
create policy "news: suppression réservée aux admins" on news for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- team_members — organigramme / équipe
-- ----------------------------------------------------------------------------
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role_title text not null,
  pole text,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table team_members enable row level security;

drop policy if exists "team_members: lecture publique" on team_members;
create policy "team_members: lecture publique" on team_members for select using (true);

drop policy if exists "team_members: gestion réservée aux admins" on team_members;
create policy "team_members: gestion réservée aux admins" on team_members for all using (is_admin(auth.uid())) with check (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- testimonials — témoignages
-- ----------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  quote text not null,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

drop policy if exists "testimonials: lecture publique" on testimonials;
create policy "testimonials: lecture publique" on testimonials for select using (true);

drop policy if exists "testimonials: gestion réservée aux admins" on testimonials;
create policy "testimonials: gestion réservée aux admins" on testimonials for all using (is_admin(auth.uid())) with check (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- partners — partenaires
-- ----------------------------------------------------------------------------
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table partners enable row level security;

drop policy if exists "partners: lecture publique" on partners;
create policy "partners: lecture publique" on partners for select using (true);

drop policy if exists "partners: gestion réservée aux admins" on partners;
create policy "partners: gestion réservée aux admins" on partners for all using (is_admin(auth.uid())) with check (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- media_library — galerie médias
-- ----------------------------------------------------------------------------
create table if not exists media_library (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text,
  caption text,
  uploaded_at timestamptz not null default now()
);

alter table media_library enable row level security;

drop policy if exists "media_library: lecture publique" on media_library;
create policy "media_library: lecture publique" on media_library for select using (true);

drop policy if exists "media_library: gestion réservée aux admins" on media_library;
create policy "media_library: gestion réservée aux admins" on media_library for all using (is_admin(auth.uid())) with check (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- documents — documents téléchargeables
-- ----------------------------------------------------------------------------
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  category text,
  updated_at timestamptz not null default now()
);

alter table documents enable row level security;

drop policy if exists "documents: lecture publique" on documents;
create policy "documents: lecture publique" on documents for select using (true);

drop policy if exists "documents: gestion réservée aux admins" on documents;
create policy "documents: gestion réservée aux admins" on documents for all using (is_admin(auth.uid())) with check (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- submissions_registration — Inscription
-- ----------------------------------------------------------------------------
create table if not exists submissions_registration (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  last_diploma text,
  desired_program_id uuid references programs (id),
  attachments jsonb not null default '[]'::jsonb,
  status submission_status not null default 'nouveau',
  created_at timestamptz not null default now()
);

alter table submissions_registration enable row level security;

drop policy if exists "submissions_registration: dépôt public" on submissions_registration;
create policy "submissions_registration: dépôt public" on submissions_registration for insert with check (true);

drop policy if exists "submissions_registration: lecture réservée aux admins" on submissions_registration;
create policy "submissions_registration: lecture réservée aux admins" on submissions_registration for select using (is_admin(auth.uid()));

drop policy if exists "submissions_registration: mise à jour réservée aux admins" on submissions_registration;
create policy "submissions_registration: mise à jour réservée aux admins" on submissions_registration for update using (is_admin(auth.uid()));

drop policy if exists "submissions_registration: suppression réservée aux admins" on submissions_registration;
create policy "submissions_registration: suppression réservée aux admins" on submissions_registration for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- submissions_training_request — Formations Inter & Intra
-- ----------------------------------------------------------------------------
create table if not exists submissions_training_request (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  domain text not null,
  participants_count int,
  desired_dates text,
  message text,
  status submission_status not null default 'nouveau',
  created_at timestamptz not null default now()
);

alter table submissions_training_request enable row level security;

drop policy if exists "submissions_training_request: dépôt public" on submissions_training_request;
create policy "submissions_training_request: dépôt public" on submissions_training_request for insert with check (true);

drop policy if exists "submissions_training_request: lecture réservée aux admins" on submissions_training_request;
create policy "submissions_training_request: lecture réservée aux admins" on submissions_training_request for select using (is_admin(auth.uid()));

drop policy if exists "submissions_training_request: mise à jour réservée aux admins" on submissions_training_request;
create policy "submissions_training_request: mise à jour réservée aux admins" on submissions_training_request for update using (is_admin(auth.uid()));

drop policy if exists "submissions_training_request: suppression réservée aux admins" on submissions_training_request;
create policy "submissions_training_request: suppression réservée aux admins" on submissions_training_request for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- submissions_lab_request — Location Labo
-- ----------------------------------------------------------------------------
create table if not exists submissions_lab_request (
  id uuid primary key default gen_random_uuid(),
  institution_name text not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  lab_type lab_type not null,
  desired_slots text,
  headcount int,
  status submission_status not null default 'nouveau',
  created_at timestamptz not null default now()
);

alter table submissions_lab_request enable row level security;

drop policy if exists "submissions_lab_request: dépôt public" on submissions_lab_request;
create policy "submissions_lab_request: dépôt public" on submissions_lab_request for insert with check (true);

drop policy if exists "submissions_lab_request: lecture réservée aux admins" on submissions_lab_request;
create policy "submissions_lab_request: lecture réservée aux admins" on submissions_lab_request for select using (is_admin(auth.uid()));

drop policy if exists "submissions_lab_request: mise à jour réservée aux admins" on submissions_lab_request;
create policy "submissions_lab_request: mise à jour réservée aux admins" on submissions_lab_request for update using (is_admin(auth.uid()));

drop policy if exists "submissions_lab_request: suppression réservée aux admins" on submissions_lab_request;
create policy "submissions_lab_request: suppression réservée aux admins" on submissions_lab_request for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- contact_messages — Contact
-- ----------------------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status submission_status not null default 'nouveau',
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

drop policy if exists "contact_messages: dépôt public" on contact_messages;
create policy "contact_messages: dépôt public" on contact_messages for insert with check (true);

drop policy if exists "contact_messages: lecture réservée aux admins" on contact_messages;
create policy "contact_messages: lecture réservée aux admins" on contact_messages for select using (is_admin(auth.uid()));

drop policy if exists "contact_messages: mise à jour réservée aux admins" on contact_messages;
create policy "contact_messages: mise à jour réservée aux admins" on contact_messages for update using (is_admin(auth.uid()));

drop policy if exists "contact_messages: suppression réservée aux admins" on contact_messages;
create policy "contact_messages: suppression réservée aux admins" on contact_messages for delete using (is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- site_settings — paramètres globaux
-- ----------------------------------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  phone text,
  email text,
  address text,
  social_links jsonb not null default '{}'::jsonb,
  default_seo jsonb not null default '{}'::jsonb,
  announcement_banner text,
  constraint site_settings_singleton check (id = 1)
);

insert into site_settings (id, phone, email, address)
values (1, null, 'contact@digiset-gabon.com', 'Angondje, Carrefour Moussavou, Akanda, Gabon')
on conflict (id) do nothing;

alter table site_settings enable row level security;

drop policy if exists "site_settings: lecture publique" on site_settings;
create policy "site_settings: lecture publique" on site_settings for select using (true);

drop policy if exists "site_settings: modification réservée au super-admin" on site_settings;
create policy "site_settings: modification réservée au super-admin" on site_settings for update using (is_super_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- Index (Idempotents)
-- ----------------------------------------------------------------------------
create index if not exists idx_programs_family_status on programs (family, status);
create index if not exists idx_news_status_published_at on news (status, published_at desc);
create index if not exists idx_submissions_registration_status on submissions_registration (status, created_at desc);
create index if not exists idx_submissions_training_status on submissions_training_request (status, created_at desc);
create index if not exists idx_submissions_lab_status on submissions_lab_request (status, created_at desc);
create index if not exists idx_contact_messages_status on contact_messages (status, created_at desc);

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on programs;
create trigger set_updated_at before update on programs for each row execute function set_updated_at();

drop trigger if exists set_updated_at on program_options;
create trigger set_updated_at before update on program_options for each row execute function set_updated_at();

drop trigger if exists set_updated_at on news;
create trigger set_updated_at before update on news for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- Storage Buckets & Policies (Idempotents)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('site-media', 'site-media', true),
  ('site-documents', 'site-documents', true),
  ('candidate-documents', 'candidate-documents', false)
on conflict (id) do nothing;

drop policy if exists "site-media: lecture publique" on storage.objects;
create policy "site-media: lecture publique" on storage.objects for select using (bucket_id = 'site-media');

drop policy if exists "site-media: gestion réservée aux admins" on storage.objects;
create policy "site-media: gestion réservée aux admins" on storage.objects for all using (bucket_id = 'site-media' and is_admin(auth.uid())) with check (bucket_id = 'site-media' and is_admin(auth.uid()));

drop policy if exists "site-documents: lecture publique" on storage.objects;
create policy "site-documents: lecture publique" on storage.objects for select using (bucket_id = 'site-documents');

drop policy if exists "site-documents: gestion réservée aux admins" on storage.objects;
create policy "site-documents: gestion réservée aux admins" on storage.objects for all using (bucket_id = 'site-documents' and is_admin(auth.uid())) with check (bucket_id = 'site-documents' and is_admin(auth.uid()));

drop policy if exists "candidate-documents: lecture réservée aux admins" on storage.objects;
-- ----------------------------------------------------------------------------
-- Fin du Schéma DigiSET Institute
-- ----------------------------------------------------------------------------


