import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { LanguageToggleButtons } from '@components/common/language-select/language-toggle-buttons.component';
import { formControlType } from '@lib/constants';

import { formSchema, LanguageFormSchema } from './language-form.schema';

type P = {
  error?: FetchBaseQueryError | SerializedError;
  loading: boolean;
  onSubmit: (data: LanguageFormSchema) => void;
  reset?: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const LanguageForm = ({ error, loading, onSubmit, reset }: P) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LanguageFormSchema>({
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
          name="languageId"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <LanguageToggleButtons
              error={errors.languageId != null}
              formControlType={formControlType}
              helperText={errors.languageId?.message}
              onChange={(_, value) => value !== null && onChange(value)}
              value={value || null}
            />
          )}
        />
      </Grid>
    </FormContainer>
  );
};
