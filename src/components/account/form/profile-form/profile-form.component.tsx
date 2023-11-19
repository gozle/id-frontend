import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Grid, styled, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { AvatarInput } from '@components/base/inputs';
import { GenderSelect } from '@components/common';
import { formControlType } from '@lib/constants';
import { User } from '@lib/types';
import { tunedDayjs } from '@modules/dayjs';

import { ProfileFormSchema, profileFormSchema } from './profile-form.schema';

type P = {
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  initialData: User;
  loading: boolean;
  onSubmit: (data: ProfileFormSchema) => void;
  reset: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const ProfileForm = ({
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
  } = useForm<ProfileFormSchema>({
    defaultValues: {
      avatar: null,
      birthday: initialData.birthday
        ? tunedDayjs(initialData.birthday).toDate()
        : undefined,
      email: initialData.email || undefined,
      firstName: initialData.firstName,
      gender: initialData.gender || undefined,
      lastName: initialData.lastName,
      username: initialData.username,
    },
    mode: 'onBlur',
    resolver: zodResolver(profileFormSchema),
  });

  const { t, i18n } = useTranslation();

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
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          mb: 2,
        }}
      >
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <AvatarInput
              defaultValue={initialData.avatar || undefined}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Grid>
      <Grid item>
        <TextField
          {...formControlType}
          {...register('username')}
          disabled={loading}
          error={errors.username != null}
          helperText={errors.username?.message}
          label={t('username')}
          placeholder={t('username') || ''}
          type="text"
          aria-invalid={errors.username ? 'true' : 'false'}
        />
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <TextField
          {...formControlType}
          {...register('firstName')}
          disabled={loading}
          error={errors.firstName != null}
          helperText={errors.firstName?.message}
          label={t('first_name')}
          placeholder={t('first_name') || ''}
          type="text"
          aria-invalid={errors.firstName ? 'true' : 'false'}
        />
      </Grid>
      <Grid item>
        <TextField
          {...formControlType}
          {...register('lastName')}
          disabled={loading}
          error={errors.lastName != null}
          helperText={errors.lastName?.message}
          label={t('last_name')}
          placeholder={t('last_name') || ''}
          type="text"
          aria-invalid={errors.lastName ? 'true' : 'false'}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="birthday"
          render={({ field, formState: { errors } }) => (
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={i18n.language}
            >
              <DatePicker
                disabled={loading}
                label={t('birthday')}
                onChange={(value) => {
                  if (value) field.onChange(value.toDate());
                }}
                slotProps={{
                  textField: {
                    ...formControlType,
                    error: errors.birthday != null,
                    helperText: errors.birthday?.message,
                  },
                }}
                value={tunedDayjs(field.value)}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="gender"
          render={({ field, formState: { errors } }) => (
            <GenderSelect
              {...field}
              error={errors.gender != null}
              formControlType={formControlType}
              helperText={errors.gender?.message}
              value={field.value || ''}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
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
