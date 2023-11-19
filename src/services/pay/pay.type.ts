export type ApplyGiftCardRequest = { code: string };
export type ApplyGiftCardResponse = { amount: number };

export type GetBankListRequest = void;
export type GetBankListResponse = {
  currency: number;
  icon: string | null;
  id: number;
  name: string;
}[];

export type ReplenishBalanceByBankCardRequest = {
  amount: number;
  bank: number;
  language: string;
  returnUrl: string;
};
export type ReplenishBalanceByBankCardResponse = {
  formUrl: string;
  orderId: string;
};

export type GetBalanceReplenishmentByBankCardRequest = {
  language: string;
  orderId: string;
};
export type GetBalanceReplenishmentByBankCardResponse = {
  message: string;
  order?: {
    amount: number;
    bank: number;
    description: string;
    id: number;
    order_id: string;
    status: string;
    user: string;
  };
};
