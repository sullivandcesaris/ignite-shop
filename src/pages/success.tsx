import { SuccessContainer, ImageContainer, ImageContent } from "@/styles/pages/sucess";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useShoppingCart } from 'use-shopping-cart'

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[],
  quantityProducts: number
}

export default function Success({ customerName, products, quantityProducts }: SuccessProps) {
  const { clearCart } = useShoppingCart();
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>

        <ImageContainer>
          {products.map((item) => (
            <ImageContent key={item.imageUrl}>
              <Image src={item.imageUrl} alt="" width={120} height={120} />
            </ImageContent>
          ))}
        </ImageContainer>

        <h1>Compra efetuada</h1>

        {products.length > 1 ? (
          <p>
            Uhuul <strong>{customerName}</strong>, sua compra de{" "}
            <strong>{quantityProducts} camisetas</strong> já está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul <strong>{customerName}</strong>, sua <strong>{products[0]?.name}</strong> já está a caminho da sua casa.
          </p>
        )}

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details?.name;

  let quantityProducts: number = 0; // Initialize quantityProducts with 0
  session.line_items?.data.map((product) => {
    quantityProducts = product.quantity ? product.quantity + quantityProducts : quantityProducts;
  });

  const products = session.line_items?.data.map((item) => ({
    name: item.price?.product.name,
    imageUrl: item.price?.product.images[0],
  }));

  return {
    props: {
      customerName,
      products,
      quantityProducts
    },
  };
};
