import { Box, styled } from '@mui/material';
import React from 'react';

import { PasswordForm } from '@components/auth';
import { useDeactivate2faMutation } from '@services/auth';

const MyPasswordForm = styled(PasswordForm)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

interface P {
  onAfterSubmit?: () => void;
}

export const RemovePasswordFormContainer = ({ onAfterSubmit }: P) => {
  const [deactivate2fa, { error, isLoading, reset }] =
    useDeactivate2faMutation();

  const handleSubmit = async (data: { password: string }) => {
    await deactivate2fa(data);

    onAfterSubmit?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: '100%',
        py: 1,
      }}
    >
      <MyPasswordForm
        error={error}
        loading={isLoading}
        onSubmit={handleSubmit}
        reset={reset}
      />
    </Box>
  );
};
