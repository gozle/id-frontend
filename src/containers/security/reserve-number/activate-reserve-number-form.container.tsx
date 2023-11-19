import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CodeForm } from '@components/auth';
import { formatPhone } from '@lib/helpers';
import { useActivateReserveNumberMutation } from '@services/security';

type P = {
  inView?: boolean;
  onAfterSubmit: () => void;
  onResendCode: () => void;
  phoneNumber: string;
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

  flexGrow: 1,
});

const MyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: theme.spacing(2),
}));

export const ActivateReserveNumberFormContainer = ({
  inView,
  onAfterSubmit,
  onResendCode,
  phoneNumber,
  time,
}: P) => {
  const { t } = useTranslation();

  const [activateRN, { error, isLoading, reset }] =
    useActivateReserveNumberMutation();

  const handleSubmit = async (body: { code: string }) => {
    if (phoneNumber) {
      await activateRN({ code: body.code, phoneNumber });

      onAfterSubmit();
    }
  };

  return (
    <Root>
      <FormContainer>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('we_sent_sms')}
        </Typography>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          {formatPhone(phoneNumber || '')}
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
