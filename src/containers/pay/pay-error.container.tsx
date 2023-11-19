import { Box, Button, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PayError } from '@components/pay';
import { PayErrorType } from '@lib/enums';

const MyPayError = styled(PayError)`
  margin: auto;
`;

interface P {
  onClick: React.MouseEventHandler;
  type: PayErrorType;
}

export const PayErrorContainer = ({ onClick, type }: P) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: '100%',
        py: 1,
      }}
    >
      <MyPayError type={type} />
      <Button onClick={onClick}>{t('thank_you')}</Button>
    </Box>
  );
};
