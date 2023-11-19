import { Paper, styled } from '@mui/material';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { SlideScreensContainer } from '@components/common';
import { useAppSelector } from '@modules/store/store.hooks';
import { AcceptPaymentResponse, PaymentQueryParams } from '@services/payment';

import { AskPermissionFormContainer } from './ask-permission-form.container';
import { RedirectToContainer } from './redirect-to.container';

const Root = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  maxWidth: theme.spacing(80),
  width: '100%',

  padding: `${theme.spacing(6)} ${theme.spacing(2)}`,

  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(6)} ${theme.spacing(12)}`,
  },
}));

export const PaymentFormContainer = () => {
  const [screen, setScreen] = useState(0);

  const params = useLoaderData() as PaymentQueryParams;
  const { user } = useAppSelector((s) => s.auth);

  const handleOnAfterAllowSubmit = (data: AcceptPaymentResponse) => {
    setScreen(1);

    window.location.replace(`${params.redirect_uri}?code=${data.code}`);
  };

  return user ? (
    <Root>
      {/* <Logo sx={{ height: (t) => t.spacing(5), mb: 2 }} /> */}
      <SlideScreensContainer
        screen={screen}
        screenContent={[
          <AskPermissionFormContainer
            clientId={params.client_id}
            key="ask-permission"
            onAfterSubmit={handleOnAfterAllowSubmit}
            paymentId={params.payment_id}
          />,
          <RedirectToContainer
            key="redirect"
            redirectUrl={params.redirect_uri}
          />,
        ]}
      />
    </Root>
  ) : (
    <></>
  );
};
