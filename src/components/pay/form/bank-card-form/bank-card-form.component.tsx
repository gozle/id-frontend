import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { BankRadioGroup } from '@components/common';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './bank-card-form.schema';

type P = {
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  loading: boolean;
  onSubmit: (data: { amount: number; bankId: number }) => void;
  reset?: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const BankCardForm = ({
  className,
  error,
  loading,
  onSubmit,
  reset,
}: P) => {
  const {
    control,
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
    setTimeout(() => setFocus('amount'), 300);
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
      <Grid item sx={{ width: '100%' }}>
        <Controller
          control={control}
          name="bankId"
          render={({ field, formState: { errors } }) => (
            <BankRadioGroup
              {...field}
              error={errors.bankId != null}
              formControlType={formControlType}
              helperText={errors.bankId?.message}
              value={field.value || ''}
            />
          )}
        />
      </Grid>
      <Grid item>
        <TextField
          {...formControlType}
          {...register('amount', { setValueAs: (val) => Number(val) })}
          disabled={loading}
          error={errors.amount != null}
          helperText={errors.amount?.message}
          label={t('amount')}
          placeholder={t('amount') || ''}
          type="text"
          aria-invalid={errors.amount ? 'true' : 'false'}
        />
      </Grid>
    </FormContainer>
  );
};
