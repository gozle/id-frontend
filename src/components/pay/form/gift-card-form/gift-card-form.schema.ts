import { z } from 'zod';

export const CODE_REGEXP = /^[A-Z0-9]{16}$/;

export const formSchema = z.object({
  code: z.string().length(16).regex(CODE_REGEXP),
});

export type FormSchema = z.infer<typeof formSchema>;
