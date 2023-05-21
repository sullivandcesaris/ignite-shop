import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";


interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string | null; // Updated type to allow null values
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false);

  const { addItem } = useShoppingCart()
  
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          {product?.imageUrl && (
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          )}
        </ImageContainer>
        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.price}</span>
          <p>{product?.description}</p>
          <button 
            disabled={isCreatingCheckoutSession} 
            onClick={() => addItem(product)}
          >
            Adicionar ao Carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NsRvJSJaBbu0X9' } }
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<ProductProps, { id: string }> = async ({ params }) => {
  const productId = params?.id!; // Asserting as string type using non-null assertion operator

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;
  const unitAmount = price.unit_amount || 0; // Set a default value if unit_amount is null

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(unitAmount / 100),
        description: product.description,
        defaultPriceId: price.id
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
}