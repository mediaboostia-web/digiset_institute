import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AnySubmission } from "@/lib/admin-data";

const TABLE_MAP: Record<string, string> = {
  registration: "submissions_registration",
  training: "submissions_training_request",
  lab: "submissions_lab_request",
  contact: "contact_messages",
};

/**
 * GET /api/admin/submissions
 * Récupère l'ensemble des soumissions (candidatures, formations, labo, contact) depuis Supabase.
 */
export async function GET() {
  try {
    const admin = createAdminClient();

    const [regRes, trainRes, labRes, contactRes] = await Promise.all([
      admin.from("submissions_registration").select("*").order("created_at", { ascending: false }),
      admin.from("submissions_training_request").select("*").order("created_at", { ascending: false }),
      admin.from("submissions_lab_request").select("*").order("created_at", { ascending: false }),
      admin.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);

    if (regRes.error) console.error("Error fetching registrations:", regRes.error);
    if (trainRes.error) console.error("Error fetching training requests:", trainRes.error);
    if (labRes.error) console.error("Error fetching lab requests:", labRes.error);
    if (contactRes.error) console.error("Error fetching contact messages:", contactRes.error);

    const submissions: AnySubmission[] = [];

    // Map registration
    if (regRes.data) {
      for (const row of regRes.data) {
        submissions.push({
          id: row.id,
          type: "registration",
          full_name: row.full_name,
          phone: row.phone,
          email: row.email,
          last_diploma: row.last_diploma || "Non renseigné",
          program_title: row.desired_program_label || "Licence / Prépa",
          attachments: row.attachments || [],
          status: row.status || "nouveau",
          created_at: row.created_at,
        });
      }
    }

    // Map training
    if (trainRes.data) {
      for (const row of trainRes.data) {
        submissions.push({
          id: row.id,
          type: "training",
          company_name: row.company_name,
          contact_name: row.contact_name,
          phone: row.phone,
          email: row.email,
          domain: row.domain,
          participants_count: row.participants_count || 1,
          desired_dates: row.desired_dates || "À convenir",
          message: row.message || "",
          status: row.status || "nouveau",
          created_at: row.created_at,
        });
      }
    }

    // Map lab
    if (labRes.data) {
      for (const row of labRes.data) {
        submissions.push({
          id: row.id,
          type: "lab",
          institution_name: row.institution_name,
          contact_name: row.contact_name,
          phone: row.phone,
          email: row.email,
          lab_type: row.lab_type || "physique",
          desired_slots: row.desired_slots || "",
          headcount: row.headcount || 1,
          status: row.status || "nouveau",
          created_at: row.created_at,
        });
      }
    }

    // Map contact
    if (contactRes.data) {
      for (const row of contactRes.data) {
        submissions.push({
          id: row.id,
          type: "contact",
          full_name: row.full_name,
          email: row.email,
          phone: row.phone || "",
          subject: row.subject || "Message de contact",
          message: row.message,
          status: row.status || "nouveau",
          created_at: row.created_at,
        });
      }
    }

    // Trier toutes les soumissions par date décroissante
    submissions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ ok: true, data: submissions });
  } catch (error) {
    console.error("[api/admin/submissions GET]", error);
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/submissions
 * Met à jour le statut d'une soumission dans Supabase.
 */
export async function PATCH(request: NextRequest) {
  try {
    const { id, type, status } = await request.json();

    if (!id || !type || !status) {
      return NextResponse.json({ ok: false, error: "Paramètres manquants" }, { status: 400 });
    }

    const table = TABLE_MAP[type];
    if (!table) {
      return NextResponse.json({ ok: false, error: "Type de soumission invalide" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from(table).update({ status }).eq("id", id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/submissions PATCH]", error);
    return NextResponse.json({ ok: false, error: "Impossible de mettre à jour le statut" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/submissions
 * Supprime une soumission dans Supabase.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id || !type) {
      return NextResponse.json({ ok: false, error: "ID ou type manquant" }, { status: 400 });
    }

    const table = TABLE_MAP[type];
    if (!table) {
      return NextResponse.json({ ok: false, error: "Type de soumission invalide" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from(table).delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/submissions DELETE]", error);
    return NextResponse.json({ ok: false, error: "Impossible de supprimer la soumission" }, { status: 500 });
  }
}
