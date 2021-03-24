import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1rem;
  display: grid;
  grid-gap: 2rem;
  p {
    font-size: 14px;
    color: red;
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on.
    e.preventDefault();
    setLoading(true);
    setError('');
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment via stripe (Token comes back here when successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log({ error, paymentMethod });
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
    }
    // 5. Send the token from (3) to our keystone with a custom mutation
    // 6. Change the pages to view the order
    // 7. Close the cart
    // 8. turn the loader off.
    setLoading(false);
    nProgress.done();
  }

  return (
    <>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButton>Check Out Now</SickButton>
        {error && <p>{error.message}</p>}
      </CheckoutFormStyles>
    </>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
