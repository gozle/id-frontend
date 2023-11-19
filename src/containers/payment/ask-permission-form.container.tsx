import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AvatarMainInfo } from '@components/account';
import { useAppSelector } from '@modules/store/store.hooks';
import {
  AcceptPaymentResponse,
  useAcceptPaymentMutation,
  useGetPaymentQuery,
} from '@services/payment';

const MyAvatarMainInfo = styled(AvatarMainInfo)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const MyButton = styled(Button)`
  font-weight: 700;
`;

interface P {
  clientId: string;
  onAfterSubmit?: (res: AcceptPaymentResponse) => void;
  paymentId: string;
}

export const AskPermissionFormContainer = ({
  clientId,
  onAfterSubmit,
  paymentId,
}: P) => {
  const { t } = useTranslation();
  const { isAuth, user } = useAppSelector((s) => s.auth);

  const { data: payment } = useGetPaymentQuery(
    { client_id: clientId, payment_id: paymentId },
    { skip: !isAuth },
  );
  const [acceptPayment] = useAcceptPaymentMutation();

  const handleAllowClick = async () => {
    const res = await acceptPayment({ payment_id: paymentId })?.unwrap();

    if (res && onAfterSubmit) onAfterSubmit(res);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {user && <MyAvatarMainInfo data={user} />}
      {payment && (
        <>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
            {t('payment_alert_text', {
              name: payment.client_name,
            })}
          </Typography>
          <MyButton onClick={handleAllowClick} color="success" size="large">
            {t('to_pay')} {payment.amount}GC
          </MyButton>
        </>
      )}
    </Box>
  );
};
