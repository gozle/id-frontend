import { createTheme, Theme } from '@mui/material';

import { ColorScheme } from '@lib/enums';

import { commonColors } from './theme.colors';

const _muiTheme: Partial<{ [K in ColorScheme]: Theme }> = {};

const makeMuiTheme = ({ mode }: { mode: ColorScheme }): Theme =>
  createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          sx: { color: 'common.white', borderRadius: 2 },
          variant: 'contained',
        },
      },
      MuiInputBase: { defaultProps: { sx: { borderRadius: 2 } } },
    },
    palette: { mode, primary: commonColors.primary },
  });

export const muiTheme: Partial<{ [K in ColorScheme]: Theme }> = new Proxy(
  _muiTheme,
  {
    get(target, prop) {
      if (
        typeof prop === 'string' &&
        Object.values(ColorScheme).includes(prop as ColorScheme)
      ) {
        if (!(prop in target))
          target[prop as ColorScheme] = makeMuiTheme({
            mode: prop as ColorScheme,
          });

        return target[prop as ColorScheme];
      }
    },
    set() {
      throw Error('Forbidden.');
    },
  },
);
