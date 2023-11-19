export type SendCodeRequest = { phoneNumber: string };
export type SendCodeResponse = void;

export type VerifyPhoneRequest = { code: string; phoneNumber: string };
export type VerifyPhoneResponse = JwtTokens | { '2fa': string };

export type JwtTokens = { access: string; refresh?: string };

export type Activate2faRequest = { password: string };
export type Activate2faResponse = { message: string };

export type Check2faRequest = void;
export type Check2faResponse = { '2fa': string };

export type Deactivate2faRequest = { password: string };
export type Deactivate2faResponse = { message: string };

export type GetToken2faRequest = { password: string; token: string };
export type GetToken2faResponse = JwtTokens;

type LoginHistoryItem = {
  browser: string;
  created_at: string;
  device: string;
  icon: string;
  id: number;
  ip_address: string;
  os: string;
};

export type GetLoginHistoryRequest = void;
export type GetLoginHistoryResponse = LoginHistoryItem[];

export type PasswordResetRegisterRequest = {
  email: string;
};
export type PasswordResetRegisterResponse = void;

export type PasswordResetSaveRequest = {
  code: string;
  email: string;
  password: string;
};
export type PasswordResetSaveResponse = void;
