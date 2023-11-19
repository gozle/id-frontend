import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './gift-card-form.schema';

type P = {
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  loading: boolean;
  onSubmit: (data: { code: string }) => void;
  reset?: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const GiftCardForm = ({
  className,
  error,
  loading,
  onSubmit,
  reset,
}: P) => {
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
    setTimeout(() => setFocus('code'), 300);
  }, [setFocus]);

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
      className={className}
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
          label={t('code')}
          placeholder={t('code') || ''}
          type="text"
          aria-invalid={errors.code ? 'true' : 'false'}
        />
      </Grid>
    </FormContainer>
  );
};
