import { t } from 'i18next';
import { z } from 'zod';

import { PASSWORD_REGEXP } from '@lib/constants';

export const formSchema = z
  .object({
    password: z
      .string()
      .min(6)
      .max(64)
      .regex(PASSWORD_REGEXP, t('password_helper_text') || undefined),
    repeatPassword: z
      .string()
      .min(6)
      .max(64)
      .regex(PASSWORD_REGEXP, t('password_helper_text') || undefined),
  })
  .transform((data, ctx) => {
    if (data.password !== data.repeatPassword)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('password_mismatch') || undefined,
      });

    return { password: data.password };
  });

export type FormSchema = z.input<typeof formSchema>;
export type FormSchemaOutput = z.infer<typeof formSchema>;
