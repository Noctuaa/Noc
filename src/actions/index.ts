import { ActionError, defineAction } from "astro:actions";
import { contactSchema } from "../schemas/contact";
import { Resend } from "resend";
import { RESEND_API_KEY, EMAIL_TO } from 'astro:env/server';

const resend = new Resend(RESEND_API_KEY);

export const server = {
  contact: defineAction({
    input: contactSchema,
    handler: async ({ name, email, subject, message }) => {
      const { error } = await resend.emails.send({
        from: 'Nocdev <contact@nocdev.fr>',
        to: EMAIL_TO,
        subject: `Contact Nocdev - ${subject} - ${name}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return { success: true };
    },
  }),
};
