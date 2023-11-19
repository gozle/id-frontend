import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

import { GozleIcon } from '@icons/gozle.icon';
import { HelpIcon } from '@icons/help.icon';
import { PayIcon } from '@icons/pay.icon';
import { SecurityIcon } from '@icons/security.icon';

import { RoutePaths } from './enums';
import {
  getAccountRoutePath,
  getGozlePayRoutePath,
  getSecurityRoutePath,
} from './helpers';

export type MenuItem = {
  Icon: React.FC<Record<string, never>>;
  description?: string;
  name: string;
  to: string;
};

export const menuItems: MenuItem[] = [
  { Icon: GozleIcon, name: 'home', to: getAccountRoutePath() },
  { Icon: PayIcon, name: 'gozle_pay', to: getGozlePayRoutePath() },
  { Icon: SecurityIcon, name: 'security', to: getSecurityRoutePath() },
  { Icon: HelpIcon, name: 'support', to: RoutePaths.SUPPORT },
  { Icon: LogoutIcon, name: 'logout', to: RoutePaths.LOGOUT },
];
