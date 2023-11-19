import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface P {
  className?: string;
}

export const PayPending = ({ className }: P) => {
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
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, maxWidth: '80%', textAlign: 'center' }}
      >
        {t('pay_pending')}
      </Typography>
    </Box>
  );
};
