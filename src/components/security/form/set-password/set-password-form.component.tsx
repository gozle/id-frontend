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

import { formSchema, FormSchema } from './set-password-form.schema';

type P = {
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  inView?: boolean;
  loading: boolean;
  onSubmit: (data: FormSchema) => void;
  reset: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const SetPasswordForm = ({
  className,
  error,
  inView,
  loading,
  onSubmit,
  reset,
}: P) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
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
          {t('save')}
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
        <PasswordInput
          {...formControlType}
          {...register('password')}
          disabled={loading}
          error={errors.password != null}
          helperText={errors.password?.message}
          label={t('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
      </Grid>
      <Grid item>
        <PasswordInput
          {...formControlType}
          {...register('repeatPassword')}
          disabled={loading}
          error={errors.repeatPassword != null}
          helperText={errors.repeatPassword?.message}
          label={t('repeat_password')}
          aria-invalid={errors.repeatPassword ? 'true' : 'false'}
        />
      </Grid>
    </FormContainer>
  );
};
