import { SxProps } from '@mui/material';
import React from 'react';

import { ColorSchemeSwitch } from '@components/common';
import { ColorScheme } from '@lib/enums';
import { setSettingsState } from '@modules/store/features/settings';
import { useAppDispatch, useAppSelector } from '@modules/store/store.hooks';

interface P {
  sx?: SxProps;
}

export const ColorSchemeSwitchContainer = ({ sx }: P) => {
  const scheme = useAppSelector((state) => state.settings.colorScheme);
  const dispatch = useAppDispatch();

  const handleChange = () =>
    dispatch(
      setSettingsState({
        colorScheme:
          scheme === ColorScheme.DARK ? ColorScheme.LIGHT : ColorScheme.DARK,
      }),
    );

  return <ColorSchemeSwitch onChange={handleChange} sx={sx} value={scheme} />;
};
