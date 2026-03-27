import { ActionError, defineAction } from "astro:actions";
import { contactSchema } from "../schemas/contact";
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } from 'astro:env/server';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

export const server = {
  contact: defineAction({
    input: contactSchema,
    handler: async ({ name, email, subject, message }) => {
      try {
        await transporter.sendMail({
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
        })
      } catch (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Erreur lors de l\'envoi du mail.',
        });
      }
      return { success: true };
    },
  }),
};
