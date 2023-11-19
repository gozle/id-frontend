export type RegisterReserveNumberRequest = { phoneNumber: string };
export type RegisterReserveNumberResponse = void;

export type ActivateReserveNumberRequest = {
  code: string;
  phoneNumber: string;
};
export type ActivateReserveNumberResponse = void;

export type DeactivateReserveNumberRequest = void;
export type DeactivateReserveNumberResponse = void;

export type GetReserveNumberRequest = void;
export type GetReserveNumberResponse = {
  activatedAt: string | null;
  phoneNumber: string;
};
