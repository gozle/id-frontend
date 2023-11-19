import { RoutePaths } from '@lib/enums';

export const getAccountRoutePath = (dialog?: string) =>
  RoutePaths.ACCOUNT.replace('/:dialog?', dialog ? '/' + dialog : '');

export const getGozlePayRoutePath = (dialog?: string) =>
  RoutePaths.GOZLE_PAY.replace('/:dialog?', dialog ? '/' + dialog : '');

export const getSecurityRoutePath = (dialog?: string) =>
  RoutePaths.SECURITY.replace('/:dialog?', dialog ? '/' + dialog : '');
