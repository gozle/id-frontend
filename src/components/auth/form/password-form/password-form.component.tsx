import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { PasswordInput } from '@components/base/inputs';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './password-form.schema';

type P = {
  error?: FetchBaseQueryError | SerializedError;
  inView?: boolean;
  loading: boolean;
  onSubmit: (data: { password: string }) => void;
  reset: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const PasswordForm = ({
  error,
  inView,
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
    if (inView) setFocus('password');
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
        <PasswordInput
          {...formControlType}
          {...register('password')}
          disabled={loading}
          error={errors.password != null}
          helperText={errors.password?.message}
          label={t('password')}
          placeholder={t('password') || ''}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
      </Grid>
    </FormContainer>
  );
};
