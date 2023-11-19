import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import {
  CityFormSelect,
  ColorSchemeSelect,
  LanguageFormSelect,
  RegionFormSelect,
} from '@components/common';
import { formControlType } from '@lib/constants';
import { User } from '@lib/types';

import { SettingsFormSchema, formSchema } from './settings.schema';

type P = {
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  initialData: User;
  loading: boolean;
  onSubmit: (data: SettingsFormSchema) => void;
  reset: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const SettingsForm = ({
  className,
  error,
  initialData,
  loading,
  onSubmit,
  reset,
}: P) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SettingsFormSchema>({
    defaultValues: {
      colorScheme: initialData.theme,
      languageId: initialData.language || undefined,
      cityId: initialData.city || undefined,
      regionId: initialData.region || undefined,
    },
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const { t } = useTranslation();

  const regionId = watch('regionId');

  return (
    <FormContainer
      className={className}
      buttons={
        <MyButton
          type="submit"
          disabled={loading || !isValid}
          sx={{ mt: 'auto' }}
        >
          {t('save')}
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
          name="colorScheme"
          render={({ field, formState: { errors } }) => (
            <ColorSchemeSelect
              {...field}
              error={errors.colorScheme != null}
              formControlType={formControlType}
              helperText={errors.colorScheme?.message}
              value={field.value || ''}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="languageId"
          render={({ field, formState: { errors } }) => (
            <LanguageFormSelect
              {...field}
              error={errors.languageId != null}
              formControlType={formControlType}
              helperText={errors.languageId?.message}
              value={field.value || ''}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="regionId"
          render={({ field, formState: { errors } }) => (
            <RegionFormSelect
              {...field}
              error={errors.regionId != null}
              formControlType={formControlType}
              helperText={errors.regionId?.message}
              value={field.value || ''}
            />
          )}
        />
      </Grid>
      {regionId && (
        <Grid item>
          <Controller
            control={control}
            name="cityId"
            render={({ field, formState: { errors } }) => (
              <CityFormSelect
                {...field}
                error={errors.cityId != null}
                formControlType={formControlType}
                helperText={errors.cityId?.message}
                regionId={regionId}
                value={field.value || ''}
              />
            )}
          />
        </Grid>
      )}
    </FormContainer>
  );
};
