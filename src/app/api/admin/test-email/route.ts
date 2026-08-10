import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { recipient } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Clé RESEND_API_KEY non configurée dans le fichier .env.local." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || "DigiSET Institute <onboarding@resend.dev>";

    let targetEmail = recipient || process.env.NOTIFICATION_EMAIL_TO || process.env.ADMIN_NOTIFICATION_EMAIL || "mediaboostia@gmail.com";

    // tentative d'envoi principal
    let data = await resend.emails.send({
      from: fromAddress,
      to: [targetEmail],
      subject: "🧪 Test d'envoi d'email — DigiSET Institute",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #002F6E;">Test d'envoi d'email réussi !</h2>
          <p>Ceci est un message de test envoyé depuis le back-office de <strong>DigiSET Institute</strong> via Resend API.</p>
          <p><strong>Destinataire ciblé :</strong> ${targetEmail}</p>
          <p><strong>Expéditeur (From) :</strong> ${fromAddress}</p>
          <p><strong>Date & Heure :</strong> ${new Date().toLocaleString("fr-FR")}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">DigiSET Institute — Akanda, Gabon</p>
        </div>
      `,
    });

    // Si Resend bloque à cause de la restriction du compte de test (onboarding@resend.dev)
    if (data.error && data.error.message.includes("testing emails to your own email address")) {
      console.warn("[test-email] Fallback automatique sur mediaboostia@gmail.com (mode test Resend).");
      targetEmail = "mediaboostia@gmail.com";
      data = await resend.emails.send({
        from: fromAddress,
        to: [targetEmail],
        subject: "🧪 Test d'envoi d'email (Mode Test Resend) — DigiSET Institute",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #002F6E;">Test d'envoi d'email réussi (Mode Test) !</h2>
            <p>Le message a été redirigé vers <strong>${targetEmail}</strong> car le domaine personnalisé n'est pas encore validé sur Resend.</p>
            <p><strong>Expéditeur :</strong> ${fromAddress}</p>
            <p><strong>Date & Heure :</strong> ${new Date().toLocaleString("fr-FR")}</p>
          </div>
        `,
      });
    }

    if (data.error) {
      return NextResponse.json(
        { ok: false, error: `Erreur Resend : ${data.error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Email de test envoyé avec succès à ${targetEmail} !`,
      id: data.data?.id,
    });
  } catch (error) {
    console.error("[api/admin/test-email]", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erreur lors de l'envoi d'email." },
      { status: 500 }
    );
  }
}
