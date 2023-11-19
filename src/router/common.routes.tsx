import React from 'react';
import { Navigate, redirect, RouteObject } from 'react-router-dom';

import { RoutePaths } from '@lib/enums';
import { getAccountRoutePath } from '@lib/helpers';
import { UserProfile } from '@lib/types';
import { isProfileFullfiled } from '@modules/auth';
import { TestView } from '@views/test.view';

const HomeView = React.lazy(() => import('@views/home.view'));
const LogoutView = React.lazy(() => import('@views/logout.view'));
const OAuthV2View = React.lazy(() => import('@views/oauth-v2.view'));
const PaymentView = React.lazy(() => import('@views/payment.view'));

export const commonRoutesBuilder = (
  isInit: boolean,
  isAuth: boolean,
  user?: UserProfile,
): RouteObject[] => [
  { path: RoutePaths.HOME, element: <HomeView /> },
  {
    path: RoutePaths.OAUTH_V2_AUTH,
    element: <OAuthV2View />,
    loader: ({ request }) => {
      const searchParams = new URL(request.url).searchParams;

      const params = {
        client_id: searchParams.get('client_id'),
        redirect_uri: searchParams.get('redirect_uri'),
        response_type: searchParams.get('response_type'),
        code_challenge: searchParams.get('code_challenge'),
        code_challenge_method: searchParams.get('code_challenge_method'),
      };

      if (isInit && (!isAuth || !user || !isProfileFullfiled(user)))
        return redirect(
          RoutePaths.AUTH +
            `?${new URLSearchParams({
              redirect_uri:
                RoutePaths.OAUTH_V2_AUTH + `?${searchParams.toString()}`,
            }).toString()}`,
        );
      else if (Object.values(params).findIndex((el) => el == null) !== -1)
        return redirect(getAccountRoutePath());

      return params;
    },
  },
  // {
  //   path: RoutePaths.PAYMENT,
  //   element: <PaymentView />,
  //   loader: ({ request }) => {
  //     const searchParams = new URL(request.url).searchParams;

  //     const params = {
  //       client_id: searchParams.get('client_id'),
  //       payment_id: searchParams.get('payment_id'),
  //       redirect_uri: searchParams.get('redirect_uri'),
  //     };

  //     if (isInit && (!isAuth || !user.firstName || !user.lastName))
  //       return redirect(
  //         RoutePaths.AUTH +
  //           `?${new URLSearchParams({
  //             redirect_uri: RoutePaths.PAYMENT + `?${searchParams.toString()}`,
  //           }).toString()}`,
  //       );
  //     else if (Object.values(params).findIndex((el) => el == null) !== -1)
  //       return redirect(getAccountRoutePath());

  //     return params;
  //   },
  // },
  { path: RoutePaths.LOGOUT, element: <LogoutView /> },
  {
    path: RoutePaths.ALL,
    element: <Navigate replace to={RoutePaths.HOME} />,
  },
  // { path: RoutePaths.TEST, element: <TestView /> },
];
