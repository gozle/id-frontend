import { Box, Button, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PaySuccess } from '@components/pay';

const MyPaySuccess = styled(PaySuccess)`
  margin: auto;
`;

interface P {
  onClick: React.MouseEventHandler;
  value: number;
}

export const PaySuccessContainer = ({ onClick, value }: P) => {
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
      <MyPaySuccess value={value} />
      <Button onClick={onClick}>{t('thank_you')}</Button>
    </Box>
  );
};
