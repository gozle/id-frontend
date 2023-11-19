import { createSlice } from '@reduxjs/toolkit';

import { SettingsReducers, SettingsState } from './settings.type';

const initialState: SettingsState = { colorScheme: null, isInit: false };

export const settingsSlice = createSlice<SettingsState, SettingsReducers>({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsState: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setSettingsState } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
