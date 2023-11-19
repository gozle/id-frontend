import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface P {
  redirectUrl: string;
}

export const RedirectToContainer = ({ redirectUrl }: P) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        {t('redirecting_to')}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        {redirectUrl}
      </Typography>
    </Box>
  );
};
