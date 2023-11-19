import { Container, styled } from '@mui/material';
import React from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { PaymentFormContainer } from '@containers/payment';
import { ServicesLayout } from '@layouts/services';

const Root = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const PaymentView = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('payment_page_title')}</title>
      </Head>

      <ServicesLayout>
        <Root>
          <PaymentFormContainer />
        </Root>
      </ServicesLayout>
    </>
  );
};

export default PaymentView;
