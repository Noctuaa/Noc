import { z } from 'astro/zod'

export const contactSchema = z.object({
  firstName: z.string().trim().min(2, 'Minimum 2 caractères.').max(40, 'Maximum 40 caractères.'),
  lastName: z.string().trim().min(2, 'Minimum 2 caractères.').max(40, 'Maximum 40 caractères.'),
  email: z.email('Email invalide.'),
  subject: z.string().trim().min(3, 'Minimum 3 caractères.').max(100, 'Maximum 100 caractères.'),
  message: z.string().trim().min(10, 'Minimum 10 caractères.').max(2000, 'Maximum 2000 caractères.'),
  // Honeypot anti-spam : champ invisible pour les humains, rempli seulement par les bots.
  website: z.string().optional(),
})

export type ContactData = z.infer<typeof contactSchema>;
