import { useMutation, useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';

async function getStripePublishableKey() {
  const response = await datasource({
    method: 'get',
    url: `/payment/stripe/config`,
  });

  return response.data as { publishableKey: string };
}

function useGetStripePublishableKey() {
  return useQuery({
    queryKey: [RQ_KEY.STRIPE_PUBLISHABLE_KEY],
    queryFn: async () => getStripePublishableKey(),
    retry: false,
  });
}

type StripeCheckoutSessionArgs = {
  line_items: { price: string; quantity: number }[];
  boosterPackId: number;
  userId: string;
};

async function createStripeCheckoutSession(data: StripeCheckoutSessionArgs) {
  const response = await datasource({
    method: 'post',
    url: `/payment/stripe/create-checkout-session`,
    data,
  });
  return response.data as { success: boolean; url: string; txnId: string };
}

function useCreateStripeCheckoutSession() {
  return useMutation({
    mutationFn: async (data: StripeCheckoutSessionArgs) => createStripeCheckoutSession(data),
  });
}

type StripePaymentIntentArgs = {
  amount: number;
  currency: string;
  boosterPackId: number;
  userId: string;
};

async function createStripePaymentIntent(data: StripePaymentIntentArgs) {
  const response = await datasource({
    method: 'post',
    url: `/payment/stripe/create-payment-intent`,
    data,
  });
  return response.data as { success: boolean; clientSecret: string };
}

function useCreateStripePaymentIntent() {
  return useMutation({
    mutationFn: async (data: StripePaymentIntentArgs) => createStripePaymentIntent(data),
  });
}

async function getTxnById(txnId: string) {
  const response = await datasource({
    method: 'get',
    url: `/transaction/${txnId}`,
  });
  return response.data as { success: boolean; url: string; txnId: string };
}

function useGetTxnById() {
  return useMutation({
    mutationFn: async (txnId: string) => getTxnById(txnId),
  });
}

export const PaymentRepository = {
  useGetStripePublishableKey,
  useCreateStripeCheckoutSession,
  useCreateStripePaymentIntent,
  useGetTxnById,
};
