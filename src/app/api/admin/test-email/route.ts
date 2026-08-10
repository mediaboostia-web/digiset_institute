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

    const targetEmail = recipient || process.env.NOTIFICATION_EMAIL_TO || "contact@digiset-gabon.com";

    const data = await resend.emails.send({
      from: fromAddress,
      to: [targetEmail],
      subject: "🧪 Test d'envoi d'email — DigiSET Institute",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #002F6E;">Test d'envoi d'email réussi !</h2>
          <p>Ceci est un message de test envoyé depuis le back-office de <strong>DigiSET Institute</strong> via Resend API.</p>
          <p><strong>Destinataire :</strong> ${targetEmail}</p>
          <p><strong>Date & Heure :</strong> ${new Date().toLocaleString("fr-FR")}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">DigiSET Institute — Akanda, Gabon</p>
        </div>
      `,
    });

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
