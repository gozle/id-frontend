import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PasswordForm } from '@components/auth';
import { GetToken2faResponse, useGetToken2faMutation } from '@services/auth';

import { LoginFormState } from './auth-form-login.container';

type P = {
  inView: boolean;
  onAfterSubmit: (data: GetToken2faResponse) => void;
  state: LoginFormState;
};

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const ForgotPassword = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: theme.typography.fontSize,
  marginTop: theme.spacing(1),

  ['&:hover']: {
    textDecoration: 'underline',
  },
}));

export const TwoFactorAuthCheckFormContainer = ({
  inView,
  onAfterSubmit,
  state,
}: P) => {
  const { t } = useTranslation();

  const [getToken, { error, isLoading, reset }] = useGetToken2faMutation();

  const handleSubmit = async (body: { password: string }) => {
    if (state['2fa']) {
      const res = await getToken({
        password: body.password,
        token: state['2fa'],
      })?.unwrap();

      if (res) onAfterSubmit(res);
    }
  };

  return (
    <Root>
      <Typography
        variant="body2"
        sx={{ fontWeight: '700', mb: 2, textAlign: 'center' }}
      >
        {t('enter_2fa_password')}
      </Typography>
      <PasswordForm
        error={error}
        inView={inView}
        loading={isLoading}
        onSubmit={handleSubmit}
        reset={reset}
      />
      {/* <ForgotPassword to={RoutePaths.PASSWORD_RESET}>
        {t('forgot_password')}
      </ForgotPassword> */}
    </Root>
  );
};
