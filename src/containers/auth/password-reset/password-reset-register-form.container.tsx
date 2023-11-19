import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { EmailForm } from '@components/auth';
import { usePasswordResetRegisterMutation } from '@services/auth';

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',

  position: 'relative',
});

interface P {
  inView: boolean;
  onAfterSubmit: (res: { email: string }) => void;
}

export const PasswordResetRegisterFormContainer = ({
  inView,
  onAfterSubmit,
}: P) => {
  const { t } = useTranslation();

  const [register, { error, isLoading, reset }] =
    usePasswordResetRegisterMutation();

  const handleRegisterSubmit = async (body: { email: string }) => {
    await register(body)?.unwrap();
    onAfterSubmit(body);
  };

  return (
    <Root>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {t('password_reset_email_description')}
      </Typography>
      <EmailForm
        error={error}
        inView={inView}
        loading={isLoading}
        onSubmit={handleRegisterSubmit}
        reset={reset}
      />
    </Root>
  );
};
