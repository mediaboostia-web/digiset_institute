import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_SITE_SETTINGS, SiteSettings } from "@/lib/site-settings";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Repli "mode sans Supabase" uniquement — dès que Supabase est configuré,
 * la table `site_settings` fait autorité (cf. migration 0002_content_and_fixes.sql
 * pour les colonnes notification_email, phone2, announcement_text and co,
 * absentes du schéma initial 0001 malgré leur usage historique dans cette route).
 */
let devFallbackStore: SiteSettings = { ...DEFAULT_SITE_SETTINGS };

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("example.supabase.co");
}

function rowToSettings(row: Record<string, unknown> | null): SiteSettings {
  if (!row) return { ...DEFAULT_SITE_SETTINGS };
  return {
    isAnnouncementEnabled:
      typeof row.is_announcement_enabled === "boolean"
        ? row.is_announcement_enabled
        : DEFAULT_SITE_SETTINGS.isAnnouncementEnabled,
    announcementText: (row.announcement_text as string) || DEFAULT_SITE_SETTINGS.announcementText,
    announcementCtaText: (row.announcement_cta_text as string) || DEFAULT_SITE_SETTINGS.announcementCtaText,
    announcementCtaHref: (row.announcement_cta_href as string) || DEFAULT_SITE_SETTINGS.announcementCtaHref,
    notificationEmail: (row.notification_email as string) || DEFAULT_SITE_SETTINGS.notificationEmail,
    institutionEmail: (row.email as string) || DEFAULT_SITE_SETTINGS.institutionEmail,
    institutionPhone1: (row.phone as string) || DEFAULT_SITE_SETTINGS.institutionPhone1,
    institutionPhone2: (row.phone2 as string) || DEFAULT_SITE_SETTINGS.institutionPhone2,
    institutionAddress: (row.address as string) || DEFAULT_SITE_SETTINGS.institutionAddress,
  };
}

export async function GET() {
  const { response: authError } = await requireAdmin();
  if (authError) return authError;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, data: devFallbackStore });
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("site_settings").select("*").eq("id", 1).single();

    if (error || !data) {
      return NextResponse.json({ ok: true, data: devFallbackStore });
    }

    return NextResponse.json({ ok: true, data: rowToSettings(data) });
  } catch (error) {
    console.error("[api/admin/settings GET]", error);
    return NextResponse.json({ ok: true, data: devFallbackStore });
  }
}

export async function POST(request: NextRequest) {
  const { response: authError } = await requireAdmin();
  if (authError) return authError;

  try {
    const body = (await request.json()) as Partial<SiteSettings>;

    if (!isSupabaseConfigured()) {
      devFallbackStore = { ...devFallbackStore, ...body };
      return NextResponse.json({ ok: true, data: devFallbackStore });
    }

    const admin = createAdminClient();
    const current = rowToSettings(
      (await admin.from("site_settings").select("*").eq("id", 1).single()).data ?? null,
    );
    const merged: SiteSettings = { ...current, ...body };

    const { error } = await admin.from("site_settings").upsert({
      id: 1,
      is_announcement_enabled: merged.isAnnouncementEnabled,
      announcement_text: merged.announcementText,
      announcement_cta_text: merged.announcementCtaText,
      announcement_cta_href: merged.announcementCtaHref,
      notification_email: merged.notificationEmail,
      email: merged.institutionEmail,
      phone: merged.institutionPhone1,
      phone2: merged.institutionPhone2,
      address: merged.institutionAddress,
    });

    if (error) {
      console.error("[api/admin/settings POST Supabase error]", error);
      return NextResponse.json({ ok: false, error: "Erreur sauvegarde paramètres" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data: merged });
  } catch (error) {
    console.error("[api/admin/settings POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur sauvegarde paramètres" }, { status: 500 });
  }
}
