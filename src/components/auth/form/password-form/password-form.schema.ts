import { t } from 'i18next';
import { z } from 'zod';

import { PASSWORD_REGEXP } from '@lib/constants';

export const formSchema = z.object({
  password: z
    .string()
    .min(6)
    .max(64)
    .regex(PASSWORD_REGEXP, t('password_helper_text') || undefined),
});

export type FormSchema = z.infer<typeof formSchema>;
