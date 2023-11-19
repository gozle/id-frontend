import { Container, styled } from '@mui/material';
import React from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { OAuthFormContainer } from '@containers/oauth';
import { ServicesLayout } from '@layouts/services';

const Root = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const OAuthV2View = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('auth_page_title')}</title>
      </Head>

      <ServicesLayout>
        <Root>
          <OAuthFormContainer />
        </Root>
      </ServicesLayout>
    </>
  );
};

export default OAuthV2View;
