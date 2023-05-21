import { HeaderContainer, CartButton } from '@/styles/components/header';
import { useShoppingCart } from "use-shopping-cart";
import Link from 'next/link';
import { Handbag } from 'phosphor-react';
import Image from 'next/image';
import logoImg from '../assets/logo.svg';

type AppHeaderProps = {
  toggleCart: () => void;
};

export function AppHeader({ toggleCart }: AppHeaderProps) {
  const { cartCount } = useShoppingCart();

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      <CartButton onClick={toggleCart}>
        <Handbag width={24} height={24} weight="bold" />
        <span>{cartCount}</span>
      </CartButton>
    </HeaderContainer>
  )
}