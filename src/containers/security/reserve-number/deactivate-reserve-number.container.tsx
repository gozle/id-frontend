import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { formatPhone } from '@lib/helpers';
import {
  ActivateReserveNumberResponse,
  useDeactivateReserveNumberMutation,
} from '@services/security';

type P = {
  onAfterSubmit?: (data: ActivateReserveNumberResponse) => void;
  phoneNumber: string;
};

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',

  position: 'relative',
});

const MyButton = styled(Button)`
  margin-top: auto;
`;

export const DectivateReserveNumberContainer = ({
  onAfterSubmit,
  phoneNumber,
}: P) => {
  const { t } = useTranslation();

  const [deactivateRN, { isLoading }] = useDeactivateReserveNumberMutation();

  return (
    <Root>
      <Typography sx={{ color: 'text.secondary' }} variant="h6">
        {t('you_have_activated_reserve_number')}
      </Typography>
      <Typography sx={{ fontWeight: 700, mb: 2 }}>
        {formatPhone(phoneNumber || '')}
      </Typography>
      <MyButton
        color="error"
        disabled={isLoading}
        fullWidth
        onClick={async () => {
          await deactivateRN();

          onAfterSubmit?.();
        }}
      >
        {t('deactivate')}
      </MyButton>
    </Root>
  );
};
