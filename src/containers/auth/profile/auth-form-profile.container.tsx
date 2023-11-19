import { Paper, styled } from '@mui/material';
import React from 'react';

import { Logo } from '@components/common';
import { User } from '@lib/types';

import { GenderFormContainer } from './gender-form.container';
import { LanguageFormContainer } from './language-form.container';
import { ProfileFormContainer } from './profile-form.container';
import { RegionFormContainer } from './region-form.container';

const Root = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  maxWidth: theme.spacing(80),
  width: '100%',

  padding: `${theme.spacing(6)} ${theme.spacing(2)}`,

  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(6)} ${theme.spacing(12)}`,
  },
}));

interface P {
  user: User;
}

export const AuthFormProfileContainer = ({ user }: P) => (
  <Root>
    <Logo sx={{ height: (t) => t.spacing(5), mb: 2 }} />
    {!user.firstName || !user.lastName ? (
      <ProfileFormContainer inView={true} key="profile" />
    ) : !user.language ? (
      <LanguageFormContainer key="language" />
    ) : !user.gender ? (
      <GenderFormContainer key="gender" />
    ) : !user.region ? (
      <RegionFormContainer key="region" />
    ) : (
      <></>
    )}
  </Root>
);
