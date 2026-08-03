import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNotificationEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validations/contact";
import {
  honeypotOkResponse,
  isHoneypotTriggered,
  serverErrorResponse,
  zodErrorResponse,
} from "@/lib/api-helpers";

/** Formulaire de contact générique (PRD §3.16). */
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (isHoneypotTriggered(body.website)) {
    return honeypotOkResponse();
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const data = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject,
      message: data.message,
    });

    if (error) throw error;

    await sendNotificationEmail({
      subject: `Nouveau message de contact — ${data.subject}`,
      html: `<p>Nouveau message via le formulaire de contact.</p>
        <p><strong>Nom :</strong> ${data.name}<br/>
        <strong>Email :</strong> ${data.email}<br/>
        <strong>Téléphone :</strong> ${data.phone ?? "non précisé"}<br/>
        <strong>Sujet :</strong> ${data.subject}</p>
        <p>${data.message}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact]", error);
    return serverErrorResponse();
  }
}
