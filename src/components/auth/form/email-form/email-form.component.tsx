import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './email-form.schema';

type P = {
  error?: FetchBaseQueryError | SerializedError;
  inView?: boolean;
  loading: boolean;
  onSubmit: (data: FormSchema) => void;
  reset: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const EmailForm = ({ error, inView, loading, onSubmit, reset }: P) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (inView) setFocus('email');
  }, [inView, setFocus]);

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
          {...register('email')}
          disabled={loading}
          error={errors.email != null}
          helperText={errors.email?.message}
          label={t('email')}
          placeholder={t('email') || ''}
          type="text"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
      </Grid>
    </FormContainer>
  );
};
