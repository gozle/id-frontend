import { z } from 'zod';

export const PASSWORD_REGEXP = /^6\d{7}$/;

export const formSchema = z.object({
  avatar: z.instanceof(File).optional(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export type FormSchema = z.infer<typeof formSchema>;
