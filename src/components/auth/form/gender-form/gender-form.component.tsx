import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { GenderToggleButtons } from '@components/common';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './gender-form.schema';

type P = {
  error?: FetchBaseQueryError | SerializedError;
  loading: boolean;
  onSubmit: (data: FormSchema) => void;
  reset?: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const GenderForm = ({ error, loading, onSubmit, reset }: P) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const { t } = useTranslation();

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
        <Controller
          control={control}
          name="gender"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <GenderToggleButtons
              error={errors.gender != null}
              formControlType={formControlType}
              helperText={errors.gender?.message}
              onChange={(_, value) => value !== null && onChange(value)}
              value={value || null}
            />
          )}
        />
      </Grid>
    </FormContainer>
  );
};
