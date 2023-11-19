import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { CityFormSelect, RegionFormSelect } from '@components/common';
import { formControlType } from '@lib/constants';

import { formSchema, FormSchema } from './region-form.schema';

type P = {
  error?: FetchBaseQueryError | SerializedError;
  loading: boolean;
  onSubmit: (data: FormSchema) => void;
  reset?: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const RegionForm = ({ error, loading, onSubmit, reset }: P) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    resetField,
    watch,
  } = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const { t } = useTranslation();

  const regionId = watch('regionId');

  useEffect(() => {
    resetField('cityId');
  }, [regionId, resetField]);

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
          name="regionId"
          render={({ field, formState: { errors } }) => (
            <RegionFormSelect
              {...field}
              error={errors.regionId != null}
              formControlType={formControlType}
              helperText={errors.regionId?.message}
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
              />
            )}
          />
        </Grid>
      )}
    </FormContainer>
  );
};
