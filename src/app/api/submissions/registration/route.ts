import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/email";
import {
  ALLOWED_ATTACHMENT_TYPES,
  ATTACHMENT_FIELDS,
  MAX_ATTACHMENT_SIZE_BYTES,
  registrationSchema,
} from "@/lib/validations/registration";
import {
  honeypotOkResponse,
  isHoneypotTriggered,
  serverErrorResponse,
  zodErrorResponse,
} from "@/lib/api-helpers";

/**
 * Formulaire Inscription — formation initiale (PRD §3.15, §5, §6 US-02).
 * multipart/form-data : champs texte + jusqu'à 4 pièces jointes
 * (bulletin, diplome, cv, photo), cf. lib/validations/registration.ts.
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  if (isHoneypotTriggered(formData.get("website"))) {
    return honeypotOkResponse();
  }

  const parsed = registrationSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    lastDiploma: formData.get("lastDiploma"),
    desiredProgramId: formData.get("desiredProgramId") ?? "",
  });

  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const data = parsed.data;
  const admin = createAdminClient();
  const submissionFolder = crypto.randomUUID();
  const attachments: { field: string; name: string; path: string; size: number }[] = [];

  try {
    for (const field of ATTACHMENT_FIELDS) {
      const file = formData.get(field);
      if (!(file instanceof File) || file.size === 0) continue;

      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        return NextResponse.json(
          { ok: false, errors: { [field]: "Fichier trop volumineux (5 Mo maximum)." } },
          { status: 400 },
        );
      }
      if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
        return NextResponse.json(
          { ok: false, errors: { [field]: "Format de fichier non autorisé (PDF, JPG ou PNG uniquement)." } },
          { status: 400 },
        );
      }

      const path = `${submissionFolder}/${field}-${file.name}`;
      const { error: uploadError } = await admin.storage
        .from("candidate-documents")
        .upload(path, file, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      attachments.push({ field, name: file.name, path, size: file.size });
    }

    const supabase = await createClient();
    const { error: insertError } = await supabase.from("submissions_registration").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      last_diploma: data.lastDiploma,
      desired_program_id: data.desiredProgramId || null,
      attachments,
    });

    if (insertError) throw insertError;

    await sendNotificationEmail({
      subject: `Nouvelle candidature — ${data.fullName}`,
      html: `<p>Nouvelle candidature reçue.</p>
        <p><strong>Nom :</strong> ${data.fullName}<br/>
        <strong>Téléphone :</strong> ${data.phone}<br/>
        <strong>Email :</strong> ${data.email}<br/>
        <strong>Dernier diplôme :</strong> ${data.lastDiploma}<br/>
        <strong>Pièces jointes :</strong> ${attachments.length}</p>
        <p>Voir dans le back-office : /admin/soumissions</p>`,
    });

    await sendConfirmationEmail({
      to: data.email,
      subject: "Votre candidature a bien été reçue — Digi-SET Institute",
      html: `<p>Bonjour ${data.fullName},</p>
        <p>Nous avons bien reçu votre candidature. Notre équipe scolarité reviendra vers vous prochainement.</p>
        <p>L'équipe Digi-SET Institute</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/submissions/registration]", error);
    return serverErrorResponse();
  }
}
