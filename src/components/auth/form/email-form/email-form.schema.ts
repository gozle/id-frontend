import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().min(1).email(),
});

export type FormSchema = z.infer<typeof formSchema>;
