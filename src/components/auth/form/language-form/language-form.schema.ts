import { z } from 'zod';

export const formSchema = z.object({
  languageId: z.number().int().min(1),
});

export type LanguageFormSchema = z.infer<typeof formSchema>;
