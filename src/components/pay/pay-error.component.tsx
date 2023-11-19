import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DenyIcon } from '@icons/deny.icon';
import { PayErrorType } from '@lib/enums';

interface P {
  className?: string;
  type: PayErrorType;
}

const paymentErrorMessageMap = {
  [PayErrorType.GENERAL]: 'payment_error',
  [PayErrorType.INVALID_GIFT_CARD]: 'invalid_gift_card',
  [PayErrorType.NOT_FOUND]: 'payment_not_found',
};

export const PayError = ({ className, type }: P) => {
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
          backgroundColor: 'error.main',
          borderRadius: '50%',
          mb: 1,
        }}
      >
        <DenyIcon />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, maxWidth: '80%', textAlign: 'center' }}
      >
        {t(paymentErrorMessageMap[type])}
      </Typography>
    </Box>
  );
};
