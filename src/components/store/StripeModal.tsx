import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useRepositories } from '../../repositories';
import { useEffect, useState } from 'react';
import { useBoundStore } from '../../store';

const CheckoutForm = () => {
  const [status, setStatus] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { setStoreState } = useBoundStore();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    let response;
    try {
      response = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: { return_url: window.location.href },
      });

      setLoading(false);
      setStatus(response?.paymentIntent?.status as string);

      if (response?.paymentIntent?.status === 'succeeded') {
        setStoreState({ stripePaymentSuccess: true, displayStripeModal: false });
      }
    } catch (e) {
      setStatus(response?.error?.message as string);
    }
  };

  return (
    <form className="text-black" onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" className="mt-5 w-full border border-black" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {status && <p>{status}</p>}
    </form>
  );
};

interface Props {
  boosterPackId: number;
  amount: number;
  userId: string;
  currency: string;
}

export default function StripeModal({ boosterPackId, amount, userId, currency }: Props) {
  const { useGetStripePublishableKey, useCreateStripePaymentIntent } = useRepositories();

  const { data } = useGetStripePublishableKey();
  const { mutateAsync: createStripePaymentIntent } = useCreateStripePaymentIntent();

  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    async function init() {
      if (data) {
        setStripePromise(loadStripe(data.publishableKey as string));

        const response = await createStripePaymentIntent({
          amount,
          boosterPackId,
          currency,
          userId,
        });

        setClientSecret(response.clientSecret);
      }
    }

    init();
  }, []);

  const options = { clientSecret };

  if (!clientSecret || !stripePromise) return <>Loading...</>;

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
