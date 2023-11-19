import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { SlideScreensContainer } from '@components/common';
import {
  BankCardForm,
  PayError,
  PayPending,
  PaySuccess,
  RedirectToPaymentPage,
} from '@components/pay';
import { PayErrorType } from '@lib/enums';
import {
  GetBalanceReplenishmentByBankCardResponse,
  useGetBalanceReplenishmentByBankCardQuery,
  useReplenishBalanceByBankCardMutation,
} from '@services/pay';

const MyBankCardForm = styled(BankCardForm)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

interface P {
  returnUrl: string;
}

export const BankCardFormContainer = ({ returnUrl }: P) => {
  const [params] = useSearchParams();

  const { i18n } = useTranslation();

  const [replenishBalance, { error, isLoading }] =
    useReplenishBalanceByBankCardMutation();
  const [screen, setScreen] = useState(0);

  const orderId = params.get('orderId');

  const { data: status, error: statusError } =
    useGetBalanceReplenishmentByBankCardQuery(
      { orderId: orderId!, language: i18n.language },
      { skip: !orderId },
    );

  const handleSubmit = async (body: { amount: number; bankId: number }) => {
    const res = await replenishBalance({
      amount: body.amount,
      bank: body.bankId,
      language: i18n.language,
      returnUrl,
    }).unwrap();

    if (res) {
      setScreen(1);

      if ('formUrl' in res) window.location.href = res.formUrl;
    }
  };

  useEffect(() => {
    if (params.has('orderId') && (status || statusError)) {
      const orderId = params.get('orderId');

      if (orderId) setScreen(2);
    }
  }, [params, status, statusError]);

  const screens = [
    <MyBankCardForm
      key="form"
      error={error}
      loading={isLoading}
      onSubmit={handleSubmit}
    />,
    <RedirectToPaymentPage key="redirect" />,
  ];

  if (status || statusError) {
    const order = status
      ? status['order']
      : (statusError as { data: GetBalanceReplenishmentByBankCardResponse })
          .data['order'];

    if (order) {
      if (order.status === 'pending') screens.push(<PayPending key="status" />);
      else if (order.status === 'completed')
        screens.push(<PaySuccess key="status" value={order.amount / 100} />);
      else screens.push(<PayError key="status" type={PayErrorType.GENERAL} />);
    } else
      screens.push(<PayError key="status" type={PayErrorType.NOT_FOUND} />);
  }

  return (
    <SlideScreensContainer
      screen={screen}
      screenContent={screens}
      screenSx={{ height: '100%' }}
    />
  );
};
