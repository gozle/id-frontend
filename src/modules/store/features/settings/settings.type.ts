import { PayloadAction } from '@reduxjs/toolkit';

import { ColorScheme } from '@lib/enums';

export type SettingsState = {
  colorScheme: ColorScheme | null;
  isInit: boolean;
};

export type SettingsReducers = {
  setSettingsState: (
    state: SettingsState,
    action: PayloadAction<Partial<SettingsState>>,
  ) => SettingsState;
};
