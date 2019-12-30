import React, { useEffect } from 'react'
import { get, map, isEmpty } from 'lodash/fp'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { setViewstate } from '../../redux/actions/viewstate'
import { removeProductFromCart, updateProductInCart } from '../../redux/actions/cart'

// Components
import { CartItem } from './CartItem'
import { Drawer } from '../Drawer'

// Styling
import './cart.scss'

// Types
import { Store } from '../../typeDefs/store'

export const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const isOpen: boolean = useSelector((store: Store) => get('viewstate.cartVisible', store))
  const cart = useSelector((store: Store) => store.cart)

  useEffect(() => {
    if (!cart.items || (isEmpty(cart.items) && isOpen)) {
      dispatch(setViewstate('cartVisible', false))
    }
  }, [cart, isOpen])

  const handleOnBackdropClick = () => {
    dispatch(setViewstate('cartVisible', false))
  }

  const handleOnQuantityChange = ({ id, quantity }) => {
    dispatch(updateProductInCart(id, quantity))
  }

  const handleOnRemoveCartItem = (id: number) => {
    dispatch(removeProductFromCart(id))
  }

  return (
    <Drawer isOpen={isOpen} onBackDropClick={handleOnBackdropClick} className='drawer--cart cart'>
      <header className='cart__header'>
        <h3 className='cart__title'>Varukorg</h3>
      </header>
      <div className='cart__items'>
        {map(
          (item) => (
            <CartItem
              key={item.id}
              product={item}
              onIncrement={handleOnQuantityChange}
              onDecrement={handleOnQuantityChange}
              onRemove={handleOnRemoveCartItem}
            />
          ),
          cart.items
        )}
      </div>
      <footer className='cart-summary'>
        <div className='cart-summary__line'>
          <span className='cart-summary__line-title'>varav moms</span>
          <span className='cart-summary__line-value'>{cart.totalTaxAmount}</span>
        </div>
        <div className='cart-summary__line cart-summary__line--total'>
          <span className='cart-summary__line-text'>Totalt</span>
          <span className='cart-summary__line-value'>{cart.totalAmount}</span>
        </div>
      </footer>
    </Drawer>
  )
}
