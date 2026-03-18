import { z } from 'astro/zod'

export const contactSchema = z.object({
  name: z.string().trim().min(6, 'Minimum 6 caractères.').max(60, 'Maximum 60 caractères.'),
  email: z.email('Email invalide.'),
  subject: z.enum(['vitrine', 'integration', 'refonte', 'autre'], {
    error: 'Veuillez sélectionner un type de projet.',
  }),
  message: z.string().trim().min(10, 'Minimum 10 caractères.').max(2000, 'Maximum 2000 caractères.'),
})

export type ContactData = z.infer<typeof contactSchema>;
