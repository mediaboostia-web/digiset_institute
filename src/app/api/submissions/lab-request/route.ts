import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNotificationEmail } from "@/lib/email";
import { labRequestSchema } from "@/lib/validations/lab-request";
import {
  honeypotOkResponse,
  isHoneypotTriggered,
  serverErrorResponse,
  zodErrorResponse,
} from "@/lib/api-helpers";

/** Formulaire Demande location de laboratoire de TP (PRD §3.15, §5, §6 US-04). */
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (isHoneypotTriggered(body.website)) {
    return honeypotOkResponse();
  }

  const parsed = labRequestSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const data = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("submissions_lab_request").insert({
      institution_name: data.institutionName,
      contact_name: data.contactName,
      phone: data.phone,
      email: data.email,
      lab_type: data.labType,
      desired_slots: data.desiredSlots ?? null,
      headcount: data.headcount ?? null,
    });

    if (error) throw error;

    await sendNotificationEmail({
      subject: `Nouvelle demande de location de labo — ${data.institutionName}`,
      html: `<p>Nouvelle demande de location de laboratoire de TP.</p>
        <p><strong>Établissement :</strong> ${data.institutionName}<br/>
        <strong>Contact :</strong> ${data.contactName}<br/>
        <strong>Téléphone :</strong> ${data.phone}<br/>
        <strong>Email :</strong> ${data.email}<br/>
        <strong>Type de laboratoire :</strong> ${data.labType}<br/>
        <strong>Créneaux souhaités :</strong> ${data.desiredSlots ?? "non précisés"}<br/>
        <strong>Effectif :</strong> ${data.headcount ?? "non précisé"}</p>
        <p>Voir dans le back-office : /admin/soumissions</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/submissions/lab-request]", error);
    return serverErrorResponse();
  }
}
