import React from 'react';
import { redirect, RouteObject } from 'react-router-dom';

import { RoutePaths } from '@lib/enums';
import { getAccountRoutePath } from '@lib/helpers';
import { UserProfile } from '@lib/types';
import { isProfileFullfiled } from '@modules/auth';
import PasswordResetView from '@views/password-reset.view';

const AuthView = React.lazy(() => import('@views/auth.view'));

export const notAuthRoutesBuilder = (
  isInit: boolean,
  isAuth: boolean,
  user?: UserProfile,
): RouteObject[] => [
  {
    path: RoutePaths.AUTH,
    element: <AuthView />,
    loader: ({ request }) => {
      if (isInit && isAuth && user && isProfileFullfiled(user)) {
        const searchParams = new URL(request.url).searchParams;
        const redirectUrl = searchParams.get('redirect_uri');

        return redirect(redirectUrl || getAccountRoutePath());
      }

      return null;
    },
  },
  {
    path: RoutePaths.PASSWORD_RESET,
    element: <PasswordResetView />,
  },
];
