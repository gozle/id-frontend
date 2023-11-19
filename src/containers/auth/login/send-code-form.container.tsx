import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PhoneForm } from '@components/auth';
import { RoutePaths } from '@lib/enums';
import { useSendCodeMutation } from '@services/auth';

type P = {
  inView?: boolean;
  onAfterSubmit?: (data: { phone: string }) => void;
};

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const A = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const Warning = styled(Typography)(({ theme }) => ({
  color: 'text.secondary',
  marginTop: theme.spacing(2),
  textAlign: 'center',
  lineHeight: '1.2',
}));

export const SendCodeFormContainer = ({ inView, onAfterSubmit }: P) => {
  const { t } = useTranslation();

  const [sendCode, { error, isLoading, reset }] = useSendCodeMutation();

  const handleSubmit = async (body: { phone: string }) => {
    await sendCode({ phoneNumber: body.phone })?.unwrap();

    onAfterSubmit?.(body);
  };

  return (
    <Root>
      <PhoneForm
        error={error}
        inView={inView}
        loading={isLoading}
        onSubmit={handleSubmit}
        reset={reset}
      />
      <Warning variant="subtitle2">
        <Trans i18nKey="sign_in_warning">
          {'Нажимая на “Продолжить”, вы принимаете '}
          <A to={RoutePaths.TERMS}>{t('terms_link_title')}</A>
          {' и '}
          <A to={RoutePaths.PRIVACY}>{t('privacy_link_title')}</A>
        </Trans>
      </Warning>
    </Root>
  );
};
