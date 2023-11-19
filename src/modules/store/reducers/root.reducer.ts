import { Action, CombinedState, combineReducers } from '@reduxjs/toolkit';
import { CombinedState as QCombinedState } from '@reduxjs/toolkit/dist/query/core/apiState';

import { api } from '@services/api';
import { gozleAdminApi } from '@services/gozle-admin-api.api';

import { authReducer, AuthState, logout } from '../features/auth';
import { settingsReducer, SettingsState } from '../features/settings';

const appReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  [api.reducerPath]: api.reducer,
  [gozleAdminApi.reducerPath]: gozleAdminApi.reducer,
});

const rootReducer = (
  state:
    | CombinedState<{
        api: QCombinedState<any, any, 'api'>;
        auth: AuthState;
        gozleAdminApi: QCombinedState<any, any, 'gozleAdminApi'>;
        settings: SettingsState;
      }>
    | undefined,
  action: Action<unknown>,
) => {
  if (logout.match(action)) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
