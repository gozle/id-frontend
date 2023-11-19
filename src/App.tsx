import { CssBaseline } from '@mui/material';
import React from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

import { ThemeLayout } from '@layouts/theme.layout';
import { store } from '@modules/store';
import { AppRouter } from '@router/app.router';

const App = () => {
  const { t } = useTranslation('zod');

  z.setErrorMap(makeZodI18nMap({ t }));

  return (
    <>
      <Head>
        <title>Gözle - ID</title>
      </Head>
      <Provider store={store}>
        <ThemeLayout>
          <CssBaseline />
          <AppRouter />
        </ThemeLayout>
      </Provider>
    </>
  );
};

export default App;
