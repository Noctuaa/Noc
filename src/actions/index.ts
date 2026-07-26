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

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Nocdev <contact@nocdev.fr>',
          to: [EMAIL_TO],
          reply_to: email,
          subject: `Contact Nocdev - ${subject} - ${firstName} ${lastName}`,
          html: `
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
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
