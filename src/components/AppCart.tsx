import React, { useState } from 'react';
import {
  CartClose,
  CartContainer,
  CartContent,
  CartProduct,
  CartProductImage,
  CartProductProps,
  CartProductRemove,
  CartProductQuantity,
  CartProductQuantityButton,
  CartProductHeader,
  FooterCart,
  EmptyCart,
} from '@/styles/components/cart';
import { X } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

type AppCartProps = {
  toggleCart: () => void;
};

export function AppCart({ toggleCart }: AppCartProps): JSX.Element {
  const { 
    cartDetails, 
    removeItem, 
    incrementItem, 
    decrementItem, 
    cartCount,
    redirectToCheckout,
  } = useShoppingCart();

  async function buyNow() {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


    const response = await axios.post('/api/checkout', { cartDetails }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId: response.data.sessionId
    });
  }

  function handleContentClick(event: React.MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
  }

  function calculatedTotalPrice() {
    // Calcula o preço total dos produtos no carrinho
    const totalPrice = Object.values(cartDetails).reduce((total, item) => {
      const priceString = item.formattedPrice;
      const priceNumber = parseFloat(priceString.replace(/[^0-9.,]+/g, "").replace(",", "."));
      const productPrice = priceNumber * item.quantity;
      return total + productPrice;
    }, 0);

    // Formata o preço total para exibição
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalPrice);

    return formattedPrice;
  }

  function calculatedPrice(price: string, quantity: number) {
    const priceString = price;
    const priceNumber = parseFloat(priceString.replace(/[^0-9.,]+/g, "").replace(",", "."));
    const productPrice = priceNumber * quantity;

    // Formata o preço total para exibição
    const formattedProductPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(productPrice);

    return formattedProductPrice;
  }

  let cartContent;

  if (cartCount && cartCount >= 1) {
    cartContent = (
      <>
        {cartDetails &&
          Object.entries(cartDetails).map(([id, item]) => {

            return (
              <CartProduct key={id}>
                <CartProductImage>
                  <Image src={item.imageUrl} width={180} height={180} alt="" />
                </CartProductImage>
                <CartProductProps>
                  <div>
                    <CartProductHeader>
                      <h3>{item.name}</h3>
                      <span>{calculatedPrice(item.formattedPrice, item.quantity)}</span>
                    </CartProductHeader>
                    <CartProductQuantity>
                      <CartProductQuantityButton onClick={() => decrementItem(id)}>
                        -
                      </CartProductQuantityButton>
                      <span>{item.quantity}</span>
                      <CartProductQuantityButton onClick={() => incrementItem(id)}>
                        +
                      </CartProductQuantityButton>
                    </CartProductQuantity>
                  </div>
                  <CartProductRemove
                    onClick={() => removeItem(id)}
                    aria-label={`Remove ${item.name} from your cart`}
                  >
                    Remover
                  </CartProductRemove>
                </CartProductProps>
              </CartProduct>
            );
          })}
        <FooterCart>
          <header>
            <div>
              <span>Quantidade</span>
              <span>{cartCount}</span>
            </div>
            <div>
              <span>Valor total</span>
              <span>{calculatedTotalPrice()}</span>
            </div>
          </header>
          <button onClick={buyNow}>Finalizar Compra</button>
        </FooterCart>
      </>
    );
  } else {
    cartContent = <EmptyCart>Carrinho vazio</EmptyCart>;
  }

  return (
    <CartContainer onClick={toggleCart}>
      <CartContent onClick={handleContentClick}>
        <CartClose onClick={toggleCart}><X width={24} height={24} weight='bold' /></CartClose>
        <h3>Sacola de compras</h3>
        {cartContent}
      </CartContent>
    </CartContainer>
  );
}