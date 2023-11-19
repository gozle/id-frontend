import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const RedirectToPaymentPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: '100%',
        py: 1,
      }}
    >
      <Typography textAlign="center" variant="h5">
        {t('redirect_to_payment_page')}
      </Typography>
    </Box>
  );
};
