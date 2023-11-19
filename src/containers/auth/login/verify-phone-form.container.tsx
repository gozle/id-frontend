import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CodeForm } from '@components/auth';
import { formatPhone } from '@lib/helpers';
import { useVerifyPhoneMutation, VerifyPhoneResponse } from '@services/auth';

import { LoginFormState } from './auth-form-login.container';

type P = {
  inView?: boolean;
  onAfterSubmit: (data: VerifyPhoneResponse) => void;
  onResendCode: () => void;
  state: LoginFormState;
  time: number;
};

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',

  position: 'relative',
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const MyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: theme.spacing(2),
}));

export const VerifyPhoneFormContainer = ({
  inView,
  onAfterSubmit,
  onResendCode,
  state,
  time,
}: P) => {
  const { t } = useTranslation();

  const [verifyPhone, { error, isLoading, reset }] = useVerifyPhoneMutation();

  const handleSubmit = async (body: { code: string }) => {
    if (state.phone) {
      const res = await verifyPhone({
        code: body.code,
        phoneNumber: state.phone,
      })?.unwrap();

      if (res) onAfterSubmit(res);
    }
  };

  return (
    <Root>
      <FormContainer>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('we_sent_sms')}
        </Typography>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          {formatPhone(state.phone || '')}
        </Typography>
        <CodeForm
          error={error}
          inView={inView}
          loading={isLoading}
          onSubmit={handleSubmit}
          reset={reset}
        />
      </FormContainer>
      <MyButton
        onClick={onResendCode}
        size="small"
        disabled={isLoading || !!time}
        variant="text"
      >
        {t('resend_code')} {time || ''}
      </MyButton>
    </Root>
  );
};
