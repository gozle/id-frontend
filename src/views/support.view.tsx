import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { ContactUsFormContainer } from '@containers/support';

const Root = styled(Box)({
  height: '100%',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
});

const SupportView = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('support_page_title')}</title>
      </Head>
      <Root>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('contact_us_text')}
        </Typography>
        <Box>
          <ContactUsFormContainer />
        </Box>
        {/* <iframe
          src="https://store.gozle.com.tm/chat/web"
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
          }}
        /> */}
      </Root>
    </>
  );
};

export default SupportView;
