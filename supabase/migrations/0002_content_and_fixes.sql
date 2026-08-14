-- ============================================================================
-- DigiSET Institute — correctifs & mini-CMS (100% Idempotent)
-- Complète 0001_init_schema.sql sans le modifier :
--   1. Politique RLS manquante sur le bucket privé candidate-documents
--   2. Colonne de persistance du programme choisi (submissions_registration)
--   3. Colonnes manquantes sur site_settings (bannière d'annonce, tél. secondaire)
--   4. Table générique content_blocks (mini-CMS Accueil / Institution / Programmes)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. candidate-documents — politique de lecture réservée aux admins
-- (0001 supprimait cette policy sans jamais la recréer : aucun client non
-- service-role ne pouvait donc lire ce bucket)
-- ----------------------------------------------------------------------------
drop policy if exists "candidate-documents: lecture réservée aux admins" on storage.objects;
create policy "candidate-documents: lecture réservée aux admins"
  on storage.objects for select
  using (bucket_id = 'candidate-documents' and is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- 2. submissions_registration — libellé lisible du programme choisi
-- (desired_program_id reste une FK uuid réservée à une future intégration
-- avec la table programs ; ce champ texte est celui réellement affiché)
-- ----------------------------------------------------------------------------
alter table submissions_registration add column if not exists desired_program_label text;

-- ----------------------------------------------------------------------------
-- 3. site_settings — champs manquants
-- (0001 ne définit que id/phone/email/address/social_links/default_seo/
-- announcement_banner — src/app/api/admin/settings/route.ts référençait déjà
-- des colonnes notification_email/contact_email/contact_phone/updated_at qui
-- n'ont jamais existé en base ; cette section corrige ce décalage en plus
-- d'ajouter les champs de la bannière d'annonce et du 2e téléphone)
-- ----------------------------------------------------------------------------
alter table site_settings add column if not exists notification_email text;
alter table site_settings add column if not exists phone2 text;
alter table site_settings add column if not exists announcement_text text;
alter table site_settings add column if not exists announcement_cta_text text;
alter table site_settings add column if not exists announcement_cta_href text;
alter table site_settings add column if not exists is_announcement_enabled boolean not null default true;
alter table site_settings add column if not exists updated_at timestamptz not null default now();

drop trigger if exists set_updated_at on site_settings;
create trigger set_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. content_blocks — mini-CMS générique (Accueil / Institution / Programmes)
-- ----------------------------------------------------------------------------
create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  block_key text not null,
  content_type text not null default 'text', -- 'text' | 'image_url'
  value text,
  updated_at timestamptz not null default now(),
  unique (page_key, block_key)
);

alter table content_blocks enable row level security;

drop policy if exists "content_blocks: lecture publique" on content_blocks;
create policy "content_blocks: lecture publique" on content_blocks for select using (true);

drop policy if exists "content_blocks: gestion réservée aux admins" on content_blocks;
create policy "content_blocks: gestion réservée aux admins" on content_blocks for all
  using (is_admin(auth.uid())) with check (is_admin(auth.uid()));

drop trigger if exists set_updated_at on content_blocks;
create trigger set_updated_at before update on content_blocks
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- Fin des correctifs & mini-CMS DigiSET Institute
-- ----------------------------------------------------------------------------
