import { GetStaticProps } from "next";
import Head from "next/head";

import Image from "next/image";    
import Link from "next/link";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

import { HomeContainer, Product } from "@/styles/pages/home";

import { useKeenSlider } from 'keen-slider/react'                                                                                                       
import 'keen-slider/keen-slider.min.css';
import { Handbag } from "phosphor-react";
import { useShoppingCart } from "use-shopping-cart";
import React from "react";

interface HomeProps {
  products: {
    id: string;
    sku: string;
    name: string;
    imageUrl: string;
    price: string;
    priceUnitAmount: number;
    priceId: string;
    currency: string;
  }[]
}

interface ProductProps {
  id: string;
  sku: string;
  name: string;
  imageUrl: string;
  price: string;
  priceUnitAmount: number;
  priceId: string;
  currency: string;
}
export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  function addProductToCart(product: ProductProps, event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    addItem({
      id: product.id,
      sku: product.priceId,
      name: product.name,
      price: product.priceUnitAmount,
      imageUrl: product.imageUrl,
      currency: product.currency,
    });
  }

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.5,
      spacing: 48,
    }
  })
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map((product) => {
          return (   
            <React.Fragment key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>     
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={520} alt="" />
                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>
                    <button onClick={(event) => addProductToCart(product, event)}>
                      <Handbag width={24} height={24} weight="bold" />
                    </button>
                  </footer>
                </Product>
              </Link>
            </React.Fragment>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      sku: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount 
      ? 
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format( price.unit_amount / 100 ) 
      : 
      null,
      priceUnitAmount: price.unit_amount,
      priceId: price.id,
      currency: price.currency,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}