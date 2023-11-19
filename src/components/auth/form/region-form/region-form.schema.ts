import { z } from 'zod';

export const formSchema = z.object({
  cityId: z.number().int().min(1),
  regionId: z.number().int().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;
