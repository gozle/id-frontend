import { z } from 'zod';

import { Gender } from '@lib/enums';

export const formSchema = z.object({
  gender: z.nativeEnum(Gender),
});

export type FormSchema = z.infer<typeof formSchema>;
