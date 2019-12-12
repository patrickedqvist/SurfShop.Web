import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { setViewstate } from '../../redux/actions/viewstate'

// Types
import { Store } from '../../typeDefs/store'

const MiniCartComponent = () => {
  const dispatch = useDispatch()
  const cart = useSelector((store: Store) => store.cart)

  const handleOnClick = () => {
    dispatch(setViewstate('cartVisible', true))
  }

  const amount =
    cart.totalAmount > 0 ? (
      <span className='mini-cart__text'>
        {cart.totalAmount}
        kr
      </span>
    ) : null

  return (
    <div
      className='mini-cart'
      onClick={handleOnClick}
      onKeyDown={handleOnClick}
      role='button'
      aria-label='Open Cart'
      tabIndex={-5}
    >
      {amount}
      <svg
        className='mini-cart__icon'
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
      >
        <path
          fill='#000'
          fillRule='evenodd'
          d='M1 19l.867-13h4.064v2h1V6h6v2h1V6h4.065l.866 13H1zM6.931 3.475C6.931 2.11 8.277 1 9.931 1s3 1.11 3 2.475V5h-6V3.475zm12.063 2.459A1.001 1.001 0 0 0 17.996 5h-4.065V3.475c0-1.919-1.79-3.475-4-3.475-2.209 0-4 1.556-4 3.475V5H1.867a1 1 0 0 0-.998.934l-.867 13A1 1 0 0 0 1 20h17.862a1 1 0 0 0 .998-1.066l-.866-13z'
        />
      </svg>
    </div>
  )
}

export const MiniCart = memo(MiniCartComponent)
