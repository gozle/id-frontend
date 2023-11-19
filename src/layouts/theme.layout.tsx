import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { ColorScheme } from '@lib/enums';
import { muiTheme } from '@lib/theme';
import { setSettingsState } from '@modules/store/features/settings';
import { useAppDispatch, useAppSelector } from '@modules/store/store.hooks';

interface P {
  children: React.ReactNode;
}

export const ThemeLayout = ({ children }: P) => {
  const colorScheme = useAppSelector((state) => state.auth.user?.theme);
  const dispatch = useAppDispatch();

  const [, setCookie] = useCookies(['COLOR_SCHEME']);

  // Change COLOR_SCHEME when colorScheme was changed
  useEffect(() => {
    if (colorScheme)
      setCookie('COLOR_SCHEME', colorScheme, { path: '/', maxAge: 31536000 });
  }, [colorScheme, setCookie]);

  //Set color scheme
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    if (mq.matches)
      dispatch(setSettingsState({ colorScheme: ColorScheme.DARK }));

    const listener = (e: MediaQueryListEvent) =>
      dispatch(
        setSettingsState({
          colorScheme: e.matches ? ColorScheme.DARK : ColorScheme.LIGHT,
        }),
      );

    mq.addEventListener('change', listener);

    return () => {
      mq.removeEventListener('change', listener);
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={muiTheme[colorScheme ?? 'light']!}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
