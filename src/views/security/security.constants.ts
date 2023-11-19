import { AccountActivityIcon } from '@icons/account-activity.icon';
import { DefaultLoginMethodIcon } from '@icons/default-login-method.icon';
import { PasswordLoginMethodIcon } from '@icons/password-login-method.icon';
import { ReservePhoneNumberIcon } from '@icons/reserve-phone-number.icon';
import { LoginMethodType } from '@lib/enums';
import { getSecurityRoutePath } from '@lib/helpers';
import { LoginMethod, Tile } from '@lib/types';

export enum SecurityDialogType {
  ACTIVITY = 'activity',
  REMOVE_PASSWORD = 'remove-password',
  RESERVE_NUMBER = 'reserve-number',
  SET_PASSWORD = 'set-password',
}

export const dialogTitleMap: Record<SecurityDialogType, string> = {
  [SecurityDialogType.ACTIVITY]: 'account_activity',
  [SecurityDialogType.RESERVE_NUMBER]: 'reserve_number',
  [SecurityDialogType.REMOVE_PASSWORD]: 'remove_password',
  [SecurityDialogType.SET_PASSWORD]: 'enter_password',
};

export const loginMethodsMap: Record<string, LoginMethodType> = {
  none: LoginMethodType.DEFAULT,
  password: LoginMethodType.PASSWORD,
};

export const loginMethods: (LoginMethod & {
  dialog: SecurityDialogType | null;
})[] = [
  {
    Icon: DefaultLoginMethodIcon,
    description: 'default_login_method_description',
    dialog: SecurityDialogType.REMOVE_PASSWORD,
    id: LoginMethodType.DEFAULT,
    title: 'default_login_method_title',
  },
  {
    Icon: PasswordLoginMethodIcon,
    description: 'password_login_method_description',
    dialog: SecurityDialogType.SET_PASSWORD,
    id: LoginMethodType.PASSWORD,
    title: 'password_login_method_title',
  },
];

export const securityViewTileItems: { items: Tile[]; title: string }[] = [
  {
    items: [
      {
        Icon: AccountActivityIcon,
        title: 'account_activity',
        to: getSecurityRoutePath(SecurityDialogType.ACTIVITY),
      },
      {
        Icon: ReservePhoneNumberIcon,
        title: 'reserve_number',
        to: getSecurityRoutePath(SecurityDialogType.RESERVE_NUMBER),
      },
    ],
    title: 'security',
  },
];
