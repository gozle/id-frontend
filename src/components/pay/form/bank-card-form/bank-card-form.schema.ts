import { z } from 'zod';

export const formSchema = z.object({
  amount: z.number().min(1),
  bankId: z
    .string()
    .regex(/^[1-9]{1}\d*$/)
    .transform((val) => Number(val)),
});

export type FormSchema = z.infer<typeof formSchema>;
