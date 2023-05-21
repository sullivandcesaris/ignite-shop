import { styled } from "..";

export const CartContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  zIndex: 9,

  position: 'fixed',
  top: 0,
  right: 0,
  cursor: '',
})

export const CartContent = styled('div', {
  backgroundColor: '$gray800',
  width: '50%',
  height: '100%',
  padding: '4.5rem 3rem 3rem 3rem',
  zIndex: 10,
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  overflowY: 'auto',

  position: 'fixed',
  top: 0,
  right: 0,
  cursor: 'default',

  h3: {
    fontSize: '1.25rem'
  }
})

export const CartClose = styled('div', {
  position: 'absolute',
  top: 10,
  right: 10,
  padding: '1rem',
  cursor: 'pointer',
})

export const CartProduct = styled('div', {
  paddingTop: '2rem',
  display: 'flex',
  gap: '1.25rem',
})

export const CartProductImage = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '8px',
})

export const CartProductProps = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '1rem 0',

  h3: {
    fontSize: '1.125rem',
    fontWeight: '400',
    color: '$gray300',
  },

  span: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '$gray100',
    lineHeight: '145%',
  },
})

export const CartProductRemove = styled('div', {
  display: 'flex',
  fontSize: '1.125rem',
  fontWeight: '700',
  color: '$green500',
  cursor: 'pointer',
})

export const CartProductHeader = styled('header', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
})

export const CartProductQuantity = styled('footer', {
  display: 'flex',	
  flexDirection: 'row',
  marginTop: '1rem',
  gap: '0.5rem',
})

export const CartProductQuantityButton = styled('div', {
  width: '1.5rem',
  height: '1.5rem',
  padding: '0 0.5rem',
  border: '1px solid $green500',
  borderRadius: '4px',
  cursor: 'pointer',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const FooterCart = styled('footer', {
  width: '100%',
  alignSelf: 'flex-end',
  padding: '3rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem', 

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1rem',
    padding: '0.5rem 0',

    '&:last-child': {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    }
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const EmptyCart = styled('div', {
  padding: '2rem 0'
})