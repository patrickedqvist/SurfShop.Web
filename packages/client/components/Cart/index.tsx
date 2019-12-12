import React from 'react'
import { get, map } from 'lodash/fp'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { setViewstate } from '../../redux/actions/viewstate'

// Components
import { CartItem } from './CartItem'
import { Drawer } from '../Drawer'

// Styling
import './cart.scss'

// Types
import { Store } from '../../typeDefs/store'

export const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const isOpen: boolean = useSelector((store: Store) =>
    get('viewstate.cartVisible', store)
  )
  const cart = useSelector((store: Store) => store.cart)

  const handleOnBackdropClick = () => {
    dispatch(setViewstate('cartVisible', false))
  }

  return (
    <Drawer
      isOpen={isOpen}
      onBackDropClick={handleOnBackdropClick}
      className='drawer--cart cart'
    >
      <h1>Cart</h1>
      <div className='cart__items'>
        {map(
          (item) => (
            <CartItem key={item.id} product={item} />
          ),
          cart.items
        )}
      </div>
      <div className='cart-summary'>
        <div className='cart-summary__total-line'>
          <span className='cart-summary__total-text'>Totalt</span>
          <span className='cart-summary__total-value'>{cart.totalAmount}</span>
        </div>
      </div>
    </Drawer>
  )
}
