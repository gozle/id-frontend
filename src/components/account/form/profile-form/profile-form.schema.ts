import { z } from 'zod';

import { Gender } from '@lib/enums';

export const profileFormSchema = z.object({
  avatar: z.instanceof(File).nullable(),
  birthday: z.date().optional(),
  email: z
    .union([z.string().min(1).email(), z.string().length(0)])
    .transform((e) => (e === '' ? undefined : e))
    .optional(),
  firstName: z.string().min(3),
  gender: z.nativeEnum(Gender),
  lastName: z.string().min(3),
  username: z.string().min(1).max(16),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
