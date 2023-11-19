import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, styled, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@components/base/form-container.component';
import { formControlType } from '@lib/constants';

import {
  ContactUsFormSchema,
  contactUsFormSchema,
} from './contact-us-form.schema';

type P = {
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  loading: boolean;
  onSubmit: (data: ContactUsFormSchema) => void;
  reset: () => void;
};

const MyButton = styled(Button)`
  width: 100%;
`;

export const ContactUsForm = ({
  className,
  error,
  loading,
  onSubmit,
  reset,
}: P) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset: resetForm,
  } = useForm<ContactUsFormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(contactUsFormSchema),
  });

  const { t } = useTranslation();

  return (
    <FormContainer
      className={className}
      buttons={
        <MyButton type="submit" disabled={loading || !isValid}>
          {t('send')}
        </MyButton>
      }
      error={error}
      hasError={!isValid}
      loading={loading}
      onSubmit={async (event) => {
        handleSubmit(onSubmit)(event);

        resetForm();
      }}
      reset={reset}
    >
      <Grid item>
        <TextField
          {...formControlType}
          {...register('text')}
          disabled={loading}
          error={errors.text != null}
          helperText={errors.text?.message}
          label={t('text')}
          placeholder={t('text') || ''}
          type="text"
          aria-invalid={errors.text ? 'true' : 'false'}
          multiline
          minRows={3}
          maxRows={6}
        />
      </Grid>
    </FormContainer>
  );
};
