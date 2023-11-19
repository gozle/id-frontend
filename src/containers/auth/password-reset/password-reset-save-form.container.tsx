import React from 'react';

import { SetPasswordForm } from '@components/security';
import { usePasswordResetSaveMutation } from '@services/auth';

import { PasswordResetFormState } from './password-reset-form.container';

interface P {
  inView: boolean;
  onAfterSubmit: () => void;
  state: PasswordResetFormState;
}

export const PasswordResetSaveFormContainer = ({
  inView,
  onAfterSubmit,
  state,
}: P) => {
  const [save, { error, isLoading, reset }] = usePasswordResetSaveMutation();

  const handleSaveSubmit = async (body: { password: string }) => {
    if (state.code && state.email) {
      await save({ code: state.code, email: state.email, ...body })?.unwrap();
      onAfterSubmit();
    }
  };

  return (
    <SetPasswordForm
      error={error}
      inView={inView}
      loading={isLoading}
      onSubmit={handleSaveSubmit}
      reset={reset}
    />
  );
};
