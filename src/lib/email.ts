import "server-only";
import { Resend } from "resend";

/**
 * Envoi d'email transactionnel (notification interne DigiSET + confirmation
 * au demandeur). Fournisseur : Resend, cf. CONFIGURATION.md — "Créer un
 * compte Resend et une clé API". Ne jamais importer ce module côté client.
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
    process.env.NOTIFICATION_EMAIL_TO ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    "contact@digiset-gabon.com";

  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY manquant dans les variables d'environnement — email non envoyé.",
      params.subject,
    );
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: recipient,
      subject: params.subject,
      html: params.html,
    });
    console.log(`[email] Notification envoyée avec succès à ${recipient}`);
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
    console.warn(
      "[email] RESEND_API_KEY manquant — confirmation non envoyée.",
      params.subject,
    );
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
  } catch (error) {
    console.error("[email] Erreur confirmation Resend:", error);
  }
}
