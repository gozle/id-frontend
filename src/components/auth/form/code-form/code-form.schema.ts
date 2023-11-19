import { z } from 'zod';

export const CODE_REGEXP = /^\d{4}$/;

export const formSchema = z.object({
  code: z.string().length(4).regex(CODE_REGEXP),
});

export type FormSchema = z.infer<typeof formSchema>;
