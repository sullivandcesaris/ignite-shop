import type { AppProps } from 'next/app';
import { useState } from 'react';
import { CartProvider } from 'use-shopping-cart';
import { globalStyles } from '../styles/global';
import { Container } from '@/styles/pages/app';
import { AppHeader } from '@/components/AppHeader';
import { AppCart } from '@/components/AppCart';

globalStyles();

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
const successUrl = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`;

export default function App({ 
  Component, pageProps }: AppProps, 
  stripeKey: string = '') {
  const [isShowCart, setIsShowCart] = useState(false);

  function toggleCart() {
    setIsShowCart(!isShowCart);
  }

  return (
    <CartProvider
      mode="payment"
      stripe={stripeKey}
      successUrl={successUrl}
      cancelUrl={cancelUrl}
      currency="BRL"
    >
      <Container>
        <AppHeader toggleCart={toggleCart} />
        {isShowCart && <AppCart toggleCart={toggleCart} />}
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}

