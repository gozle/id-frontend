export type GetPaymentRequest = { client_id: string; payment_id: string };
export type GetPaymentResponse = {
  amount: number;
  client_name: string;
  client_type: 'service';
  description: string;
};

export type AcceptPaymentRequest = { payment_id: string };
export type AcceptPaymentResponse = { code: string };

export type PaymentQueryParams = {
  client_id: string;
  payment_id: string;
  redirect_uri: string;
};
