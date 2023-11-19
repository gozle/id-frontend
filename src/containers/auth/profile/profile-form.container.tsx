import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileForm } from '@components/auth';
import { useUpdateUserMutation } from '@services/user';

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

interface P {
  inView: boolean;
  onAfterSubmit?: () => void;
}

export const ProfileFormContainer = ({ inView, onAfterSubmit }: P) => {
  const { t } = useTranslation();

  const [updateUser, { error, isLoading, reset }] = useUpdateUserMutation();

  const handleSubmit = async (body: {
    firstName: string;
    lastName: string;
  }) => {
    await updateUser(body);

    onAfterSubmit?.();
  };

  return (
    <Root>
      <Typography
        variant="body2"
        sx={{ fontWeight: '700', mb: 2, textAlign: 'center' }}
      >
        {t('enter_firstname_lastname')}
      </Typography>
      <ProfileForm
        error={error}
        inView={inView}
        loading={isLoading}
        onSubmit={handleSubmit}
        reset={reset}
      />
    </Root>
  );
};
