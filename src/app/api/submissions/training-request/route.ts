import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNotificationEmail } from "@/lib/email";
import { trainingRequestSchema } from "@/lib/validations/training-request";
import {
  honeypotOkResponse,
  isHoneypotTriggered,
  serverErrorResponse,
  zodErrorResponse,
} from "@/lib/api-helpers";

/** Formulaire Demande formation continue (PRD §3.15, §5, §6 US-03). */
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (isHoneypotTriggered(body.website)) {
    return honeypotOkResponse();
  }

  const parsed = trainingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const data = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("submissions_training_request").insert({
      company_name: data.companyName,
      contact_name: data.contactName,
      phone: data.phone,
      email: data.email,
      domain: data.domain,
      participants_count: data.participantsCount ?? null,
      desired_dates: data.desiredDates ?? null,
      message: data.message ?? null,
    });

    if (error) throw error;

    await sendNotificationEmail({
      subject: `Nouvelle demande de formation continue — ${data.companyName}`,
      html: `<p>Nouvelle demande de formation continue.</p>
        <p><strong>Société :</strong> ${data.companyName}<br/>
        <strong>Contact :</strong> ${data.contactName}<br/>
        <strong>Téléphone :</strong> ${data.phone}<br/>
        <strong>Email :</strong> ${data.email}<br/>
        <strong>Domaine :</strong> ${data.domain}<br/>
        <strong>Participants :</strong> ${data.participantsCount ?? "non précisé"}<br/>
        <strong>Dates souhaitées :</strong> ${data.desiredDates ?? "non précisées"}</p>
        <p>Voir dans le back-office : /admin/soumissions</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/submissions/training-request]", error);
    return serverErrorResponse();
  }
}
