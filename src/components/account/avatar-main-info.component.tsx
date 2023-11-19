import { Box } from '@mui/material';
import React from 'react';

import { User } from '@lib/types';

import { Avatar, AvatarSize } from './avatar.component';
import { MainInfo } from './main-info.component';

type P = {
  avatarSize?: AvatarSize;
  className?: string;
  data: User;
};

export const AvatarMainInfo = ({ avatarSize = 'md', className, data }: P) => (
  <Box
    className={className}
    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
  >
    <Avatar size={avatarSize} src={data.avatar} />
    <MainInfo data={data} sx={{ alignItems: 'flex-start', ml: 2 }} />
  </Box>
);
