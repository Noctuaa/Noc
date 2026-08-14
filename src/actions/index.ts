import { ActionError, defineAction } from "astro:actions";
import { contactSchema } from "../schemas/contact";
import { RESEND_API_KEY, EMAIL_TO } from 'astro:env/server';

export const server = {
  contact: defineAction({
    input: contactSchema,
    handler: async ({ firstName, lastName, email, subject, message, website }) => {
      // Honeypot rempli = bot. On "réussit" silencieusement sans envoyer d'email,
      // pour ne pas indiquer au bot qu'il a été détecté.
      if (website) {
        console.log('🍯 Honeypot déclenché — email bloqué, valeur reçue :', website);
        return { success: true };
      }

      // Nettoyage anti-injection d'en-tête : retire tout caractère qui pourrait
      // casser le format "Nom <email>" ou injecter de nouveaux en-têtes.
      const safeDisplayName = `${firstName} ${lastName}`.replace(/[\r\n<>"]/g, '').trim();

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: `${safeDisplayName} via Nocdev <contact@nocdev.fr>`,
          to: [EMAIL_TO],
          reply_to: email,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; color: #101828; font-size: 14px; line-height: 1.5;">
              <p style="white-space: pre-wrap;">${message}</p>
              <p>${firstName} ${lastName}<br>${email}</p>
              <hr style="border: none; border-top: 1px solid #e2e5ea; margin: 20px 0;">
              <p style="color: #98a2b3; font-size: 12px;">Envoyé depuis le formulaire de contact de nocdev.fr</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.log('❌ Erreur Resend :', response.status, errorBody);
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Erreur lors de l\'envoi du mail.',
        });
      }

      return { success: true };
    },
  }),
};
