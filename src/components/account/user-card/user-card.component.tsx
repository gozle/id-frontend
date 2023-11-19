import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@lib/types';

import { AvatarMainInfo } from '../avatar-main-info.component';

type P = {
  className?: string;
  data: User;
};

export const UserCard = ({ className, data }: P) => {
  const { t } = useTranslation();

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        background: (t) => t.palette.primary.main,
        borderRadius: (t) => t.spacing(1),
        color: '#fff',
      }}
    >
      <AvatarMainInfo data={data} />
      <Box>
        <Typography
          sx={{ fontWeight: 700, textAlign: 'center' }}
          variant="body1"
        >
          {data.balance}GC
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant="body2">
          {t('balance')}
        </Typography>
      </Box>
    </Box>
  );
};
