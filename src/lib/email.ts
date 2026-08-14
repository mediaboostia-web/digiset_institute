import "server-only";
import { Resend } from "resend";
import { getActiveNotificationEmail } from "@/lib/notification-email";

/**
 * Envoi d'email transactionnel (notification interne DigiSET + confirmation au demandeur).
 * Fournisseur : Resend API.
 */
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "DigiSET Institute <onboarding@resend.dev>";

export async function sendNotificationEmail(params: {
  subject: string;
  html: string;
  to?: string;
}) {
  const recipient =
    params.to ||
    (await getActiveNotificationEmail()) ||
    process.env.NOTIFICATION_EMAIL_TO ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    "mediaboostia@gmail.com";

  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY manquant dans .env.local — notification enregistrée en base mais email non envoyé.",
      params.subject
    );
    return;
  }

  try {
    const res = await resend.emails.send({
      from: FROM_ADDRESS,
      to: recipient,
      subject: params.subject,
      html: params.html,
    });

    if (res.error && res.error.message.includes("testing emails to your own email address")) {
      console.warn("[email] Restriction Resend détectée (mode test). Redirection sur mediaboostia@gmail.com");
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: "mediaboostia@gmail.com",
        subject: `[Redirigé Test DigiSET] ${params.subject}`,
        html: params.html,
      });
    } else {
      console.log(`[email] Notification envoyée avec succès à ${recipient}`);
    }
  } catch (error) {
    console.error("[email] Erreur envoi Resend:", error);
  }
}

export async function sendConfirmationEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY manquant — confirmation non envoyée.", params.subject);
    return;
  }

  try {
    const res = await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    if (res.error && res.error.message.includes("testing emails to your own email address")) {
      console.warn(`[email] Resend test mode: impossible d'envoyer à ${params.to}. Envoi sur mediaboostia@gmail.com à la place.`);
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: "mediaboostia@gmail.com",
        subject: `[Confirmation Étudiant pour ${params.to}] ${params.subject}`,
        html: params.html,
      });
    }
  } catch (error) {
    console.error("[email] Erreur confirmation Resend:", error);
  }
}
