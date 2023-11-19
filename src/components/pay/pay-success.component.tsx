import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CheckCircleIcon } from '@icons/check-circle.icon';

interface P {
  className?: string;
  value: number;
}

export const PaySuccess = ({ className, value }: P) => {
  const { t } = useTranslation();

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          p: 2,
          width: (t) => t.spacing(16),
          height: (t) => t.spacing(16),
          backgroundColor: 'primary.main',
          borderRadius: '50%',
          mb: 1,
        }}
      >
        <CheckCircleIcon />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, maxWidth: '80%', textAlign: 'center' }}
      >
        {t('balance_topped_up', { value })}
      </Typography>
    </Box>
  );
};
