import { AccountActivityIcon } from '@icons/account-activity.icon';
import { PaymentHistoryIcon } from '@icons/payment-history.icon';
import { PersonIcon } from '@icons/person.icon';
import { ReplenishIcon } from '@icons/replenish.icon';
import { SettingsIcon } from '@icons/settings.icon';
import { RoutePaths } from '@lib/enums';
import { getAccountRoutePath, getSecurityRoutePath } from '@lib/helpers';
import { Tile } from '@lib/types';
import { SecurityDialogType } from '@views/security';

export enum AccountDialogType {
  ACTIVITY = 'activity',
  SETTINGS = 'settings',
  STORE = 'store',
  VIDEO = 'video',
  YOUR_DATA = 'your-data',
}

export const dialogTitleMap: Record<AccountDialogType, string> = {
  [AccountDialogType.ACTIVITY]: 'account_activity',
  [AccountDialogType.SETTINGS]: 'settings',
  [AccountDialogType.STORE]: 'Gozle Store',
  [AccountDialogType.VIDEO]: 'Gozle Video',
  [AccountDialogType.YOUR_DATA]: 'your_data',
};

export const accountViewTileItems: { items: Tile[]; title: string }[] = [
  {
    items: [
      {
        Icon: PersonIcon,
        title: 'about_me',
        to: getAccountRoutePath(AccountDialogType.YOUR_DATA),
      },
      {
        Icon: SettingsIcon,
        title: 'settings',
        to: getAccountRoutePath(AccountDialogType.SETTINGS),
      },
    ],
    title: 'data',
  },
  {
    items: [
      {
        Icon: ReplenishIcon,
        title: 'top_up_account',
        to: RoutePaths.GOZLE_PAY,
      },
      {
        Icon: PaymentHistoryIcon,
        title: 'payment_history',
        to: RoutePaths.GOZLE_PAY,
      },
    ],
    title: 'gozle_pay',
  },
  {
    items: [
      {
        Icon: AccountActivityIcon,
        title: 'account_activity',
        to: getSecurityRoutePath(SecurityDialogType.ACTIVITY),
      },
    ],
    title: 'security',
  },
  // {
  //   items: [
  //     {
  //       Icon: VideoIcon,
  //       description: 'gozle_video_description',
  //       dialog: 'video',
  //       title: 'Gozle Video',
  //     },
  //     {
  //       Icon: StoreIcon,
  //       description: 'gozle_store_description',
  //       dialog: 'store',
  //       title: 'Gozle Store',
  //     },
  //   ],
  //   title: 'subscriptions_and_payment',
  // },
];
