import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_SITE_SETTINGS, SiteSettings } from "@/lib/site-settings";

let globalSettingsStore: SiteSettings = { ...DEFAULT_SITE_SETTINGS };

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (!error && data) {
        globalSettingsStore = {
          ...DEFAULT_SITE_SETTINGS,
          notificationEmail: data.notification_email || globalSettingsStore.notificationEmail,
          institutionEmail: data.contact_email || globalSettingsStore.institutionEmail,
          institutionPhone1: data.contact_phone || globalSettingsStore.institutionPhone1,
          institutionAddress: data.address || globalSettingsStore.institutionAddress,
        };
      }
    }

    return NextResponse.json({ ok: true, data: globalSettingsStore });
  } catch (error) {
    console.error("[api/admin/settings GET]", error);
    return NextResponse.json({ ok: true, data: globalSettingsStore });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    globalSettingsStore = {
      ...globalSettingsStore,
      ...body,
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("site_settings").upsert({
        id: 1,
        notification_email: globalSettingsStore.notificationEmail,
        contact_email: globalSettingsStore.institutionEmail,
        contact_phone: globalSettingsStore.institutionPhone1,
        address: globalSettingsStore.institutionAddress,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true, data: globalSettingsStore });
  } catch (error) {
    console.error("[api/admin/settings POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur sauvegarde paramètres" }, { status: 500 });
  }
}

export function getActiveNotificationEmail(): string {
  return globalSettingsStore.notificationEmail || process.env.NOTIFICATION_EMAIL_TO || "mediaboostia@gmail.com";
}
