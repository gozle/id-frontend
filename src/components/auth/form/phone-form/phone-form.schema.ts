import { z } from 'zod';

export const PHONE_REGEXP = /^6\d{7}$/;

export const formSchema = z.object({
  phone: z.string().length(8).regex(PHONE_REGEXP),
});

export type FormSchema = z.infer<typeof formSchema>;
