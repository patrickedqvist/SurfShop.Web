import React from 'react'

// Types
import { CartProduct } from '../../typeDefs/cart'

// Styling
import './cart-item.scss'

interface Props {
  product: CartProduct
}

export const CartItem: React.FC<Props> = ({ product }) => {
  return (
    <div className='cart-item'>
      <h3 className='cart-item__title'>{product.name}</h3>
    </div>
  )
}
