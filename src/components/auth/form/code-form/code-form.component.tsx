import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './code-form.schema';

type P = {
  error?: FetchBaseQueryError | SerializedError;
  inView?: boolean;
  loading: boolean;
  onSubmit: (data: { code: string }) => void;
  reset?: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const CodeForm = ({ error, inView, loading, onSubmit, reset }: P) => {
  const ref = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (inView) {
      setFocus('code');

      // const input = ref.current;

      // if (input) {
      //   const ac = new AbortController();
      //   const form = input.closest('form');

      //   if (form) form.addEventListener('submit', () => ac.abort());

      //   navigator?.credentials
      //     ?.get({
      //       otp: { transport: ['sms'] },
      //       signal: ac.signal,
      //     } as CredentialRequestOptions)
      //     .then((otp) => {
      //       if (otp && 'code' in otp) setValue('code', otp['code'] as string);
      //       if (form) form.submit();
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    }
  }, [inView, setFocus, setValue]);

  return (
    <FormContainer
      buttons={
        <MyButton
          type="submit"
          disabled={loading || !isValid}
          sx={{ mt: 'auto' }}
        >
          {t('continue')}
        </MyButton>
      }
      error={error}
      hasError={!isValid}
      loading={loading}
      onSubmit={handleSubmit(onSubmit)}
      reset={reset}
    >
      <Grid item>
        <TextField
          {...formControlType}
          {...register('code')}
          disabled={loading}
          error={errors.code != null}
          helperText={errors.code?.message}
          inputProps={{
            style: { textAlign: 'center' },
            autoComplete: 'one-time-code',
            ref,
          }}
          label={t('code')}
          placeholder={t('code') || ''}
          type="text"
          aria-invalid={errors.code ? 'true' : 'false'}
        />
      </Grid>
    </FormContainer>
  );
};
