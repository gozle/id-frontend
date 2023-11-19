import React from 'react';
import { Outlet, redirect, RouteObject } from 'react-router-dom';

import { MenuLayout } from '@layouts/menu.layout';
import { RoutePaths } from '@lib/enums';
import { UserProfile } from '@lib/types';
import { isProfileFullfiled } from '@modules/auth';

const AccountView = React.lazy(() => import('@views/account/account.view'));
const GozlePayView = React.lazy(
  () => import('@views/gozle-pay/gozle-pay.view'),
);
const SecurityView = React.lazy(() => import('@views/security/security.view'));
const SupportView = React.lazy(() => import('@views/support.view'));

export const authRoutesBuilder = (
  isInit: boolean,
  isAuth: boolean,
  user?: UserProfile,
): RouteObject[] => [
  {
    element: (
      <MenuLayout>
        <Outlet />
      </MenuLayout>
    ),
    children: [
      {
        path: RoutePaths.ACCOUNT,
        element: <AccountView />,
      },
      { path: RoutePaths.GOZLE_PAY, element: <GozlePayView /> },
      { path: RoutePaths.SECURITY, element: <SecurityView /> },
      { path: RoutePaths.SUPPORT, element: <SupportView /> },
    ],
    loader: () => {
      if (isInit && (!isAuth || !user || !isProfileFullfiled(user)))
        return redirect(RoutePaths.AUTH);

      return null;
    },
  },
];
