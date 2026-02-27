export const prerender = false;

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } from 'astro:env/server';

/**
 * Zod validation schema for contact form data
 * @type {z.ZodObject}
 */
const contactSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères.'),
  email: z.string().email('Email invalide.'),
  subject: z.enum(['vitrine', 'integration', 'refonte', 'autre'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de projet.' }),
  }),
  message: z.string().min(10, 'Minimum 10 caractères.'),
});

/**
 * SMTP transporter configuration using Astro env variables
 * @type {nodemailer.Transporter}
 */
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * Sends contact email with formatted content
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Contact's name
 * @param {string} contactData.email - Contact's email
 * @param {string} contactData.subject - Contact's project type
 * @param {string} contactData.message - Contact's message
 * @returns {Promise<void>}
 */
const sendContactEmail = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from: SMTP_USER,
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
};

/**
 * POST endpoint to handle contact form submissions
 * @param {Object} context - Astro request context
 * @param {Request} context.request - HTTP request object
 * @returns {Promise<Response>} JSON response with operation result
 */
export async function POST({ request }) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: result.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    await sendContactEmail(result.data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Formulaire soumis avec succès.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Erreur API:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Erreur serveur.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
