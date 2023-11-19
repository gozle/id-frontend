import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@components/common';
import { RoutePaths } from '@lib/enums';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  maxWidth: theme.spacing(90),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    fontSize: theme.spacing(4),
    lineHeight: '1.1',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    fontSize: theme.spacing(2),
    lineHeight: '1.2',
  },
}));

const MyButton = styled(Button)(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
}));

export const Welcome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => navigate(RoutePaths.AUTH);

  return (
    <Root>
      <Logo sx={{ height: (t) => t.spacing(5), mb: 3 }} />
      <Title>{t('home_title')}</Title>
      <Description variant="body2">{t('home_description')}</Description>
      <MyButton onClick={handleClick} size="large" sx={{ width: '100%' }}>
        {t('login_or_create_account')}
      </MyButton>
    </Root>
  );
};
