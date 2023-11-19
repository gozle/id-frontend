import { styled } from '@mui/material';
import React from 'react';

import { SetPasswordForm } from '@components/security';
import { useActivate2faMutation } from '@services/auth';

const MySetPasswordForm = styled(SetPasswordForm)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

interface P {
  onAfterSubmit?: () => void;
}

export const SetPasswordFormContainer = ({ onAfterSubmit }: P) => {
  const [activate2fa, { error, isLoading, reset }] = useActivate2faMutation();

  const handleSubmit = async (body: { password: string }) => {
    await activate2fa(body);

    onAfterSubmit?.();
  };

  return (
    <MySetPasswordForm
      error={error}
      loading={isLoading}
      onSubmit={handleSubmit}
      reset={reset}
    />
  );
};
