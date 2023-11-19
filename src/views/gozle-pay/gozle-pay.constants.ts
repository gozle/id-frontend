import { CardIcon } from '@icons/card.icon';
import { GiftCardIcon } from '@icons/gift-card.icon';
import { getGozlePayRoutePath } from '@lib/helpers';
import { Tile } from '@lib/types';

export enum GozlePayDialogType {
  BANK_CARD = 'bank-card',
  GIFT_CARD = 'gift-card',
  // PHONE_NUMBER = 'phone-number',
}

export const dialogTitleMap: Record<GozlePayDialogType, string> = {
  [GozlePayDialogType.BANK_CARD]: 'by_card',
  [GozlePayDialogType.GIFT_CARD]: 'gift_card',
  // [GozlePayDialogType.PHONE_NUMBER]: 'by_phone_number',
  // payment_history: 'payment_history',
  // store: 'Gozle Store',
  // video: 'Gozle Video',
};

export const gozlePayViewTileItems: { items: Tile[]; title: string }[] = [
  {
    items: [
      {
        Icon: CardIcon,
        title: 'by_card',
        to: getGozlePayRoutePath(GozlePayDialogType.BANK_CARD),
      },
      // {
      //   Icon: PhoneNumberIcon,
      //   title: 'by_phone_number',
      //   to: RoutePaths.SUPPORT,
      // },
      {
        Icon: GiftCardIcon,
        title: 'gift_card',
        to: getGozlePayRoutePath(GozlePayDialogType.GIFT_CARD),
      },
    ],
    title: 'account_replenishment_methods',
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
  // {
  //   items: [
  //     {
  //       Icon: PaymentHistoryIcon,
  //       dialog: 'payment_history',
  //       title: 'payment_history',
  //     },
  //   ],
  //   title: 'control',
  // },
];
