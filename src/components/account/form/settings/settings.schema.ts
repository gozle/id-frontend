import { z } from 'zod';

import { ColorScheme } from '@lib/enums';

export const formSchema = z.object({
  cityId: z.number().int().min(1).optional(),
  colorScheme: z.nativeEnum(ColorScheme),
  languageId: z.number().int().min(1),
  regionId: z.number().int().min(1),
});

export type SettingsFormSchema = z.infer<typeof formSchema>;
