import { z } from 'zod';

export const contactUsFormSchema = z.object({
  text: z.string().min(1),
});

export type ContactUsFormSchema = z.infer<typeof contactUsFormSchema>;
