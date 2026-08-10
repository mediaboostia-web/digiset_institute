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

const FROM_ADDRESS = "DigiSET Institute <notifications@digiset-gabon.com>";

export async function sendNotificationEmail(params: {
  subject: string;
  html: string;
}) {
  const to = process.env.NOTIFICATION_EMAIL_TO;

  if (!resend || !to) {
    // En développement local sans clé Resend configurée, on log au lieu
    // d'échouer silencieusement — voir CONFIGURATION.md.
    console.warn(
      "[email] RESEND_API_KEY ou NOTIFICATION_EMAIL_TO manquant — email non envoyé.",
      params.subject,
    );
    return;
  }

  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: params.subject,
    html: params.html,
  });
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

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
}
