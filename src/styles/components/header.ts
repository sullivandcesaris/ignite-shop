import { styled } from ".."

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between'
})

export const CartButton = styled('div', {
  position: 'relative',
  backgroundColor: '$gray800',
  borderRadius: '8px',
  padding: '1rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',	

  svg: {
    color: '$gray500',
  },

  span: {
    position: 'absolute',
    marginTop: '-35px',
    marginRight: '-35px',
    width: '32px',
    height: '32px',
    backgroundColor: '$green500',
    border: '3px solid $gray900',
    borderRadius: '100%',
    fontSize: '0.75rem',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '&:hover': {
    opacity: 0.6,
    cursor: 'pointer',
  }
})