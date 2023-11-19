import React, { Suspense, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import { BaseLayout } from '@layouts/base.layout';
import { UserProfile } from '@lib/types';
import { userProfileSelector } from '@modules/auth';
import { setAuthState } from '@modules/store/features/auth';
import { setSettingsState } from '@modules/store/features/settings';
import { useAppSelector, useAppDispatch } from '@modules/store/store.hooks';
import { useGetLanguagesQuery } from '@services/language';
import { useGetSelfQuery } from '@services/user';
import { LoaderView } from '@views/loader.view';

import { authRoutesBuilder } from './auth.routes';
import { commonRoutesBuilder } from './common.routes';
import { notAuthRoutesBuilder } from './not-auth.routes';

const routerBuilder = (
  isInit: boolean,
  isAuth: boolean,
  user?: UserProfile,
) => {
  const routeObj: RouteObject[] = [
    {
      element: (
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      ),
      children: [
        ...commonRoutesBuilder(isInit, isAuth, user),
        ...authRoutesBuilder(isInit, isAuth, user),
        ...notAuthRoutesBuilder(isInit, isAuth, user),
      ],
    },
  ];

  return createBrowserRouter(routeObj);
};

export const AppRouter = () => {
  const isInit = useAppSelector((s) => s.settings.isInit);
  const { isAuth, tokens } = useAppSelector(({ auth }) => ({
    isAuth: auth.isAuth,
    tokens: auth.tokens,
  }));

  const user = useAppSelector(userProfileSelector);

  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { data } = useGetSelfQuery(undefined, { skip: !isAuth || !tokens });

  const { data: languages } = useGetLanguagesQuery();

  useEffect(() => {
    if (languages && user?.language) {
      const lang = languages.find((el) => el.id === user.language);

      if (lang && lang.code !== i18n.language) i18n.changeLanguage(lang.code);
    }
  }, [languages, user, i18n]);

  useEffect(() => {
    if (data) dispatch(setAuthState({ user: data }));
  }, [data, dispatch]);

  useEffect(() => {
    if (!isAuth || data) dispatch(setSettingsState({ isInit: true }));
  }, [isAuth, data, dispatch]);

  const router = useMemo(
    () => routerBuilder(isInit, isAuth, user),
    [isInit, isAuth, user],
  );

  if (!isInit) return <LoaderView />;

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};
