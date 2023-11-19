export type GetClientRequest = { client_id: string };
export type GetClientResponse = { name: string };

export type GetOAuthTokenRequest = void;
export type GetOAuthTokenResponse = { token: string };

export type OAuthV2Request = {
  client_id: string;
  code_challenge: string;
  code_challenge_method: string;
  redirect_uri: string;
  response_type: string;
};
