import React from 'react'
import classNames from 'classnames'

// Components
import { UpArrow, DownArrow } from '../Icons/Arrows'

// Types
import { CartProduct } from '../../typeDefs/cart'

// Styling
import './cart-item.scss'

interface QuantityChange {
  id: number;
  quantity: number;
}

interface Props {
  product: CartProduct;
  nonInteractive?: boolean;
  onRemove?: (id: number) => void;
  onIncrement?: ({ id, quantity }: QuantityChange) => void;
  onDecrement?: ({ id, quantity }: QuantityChange) => void;
}

export const CartItem: React.FC<Props> = ({ product, nonInteractive, onRemove, onIncrement, onDecrement }) => {
  const { id, quantity } = product

  const handleOnRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (onRemove) {
      onRemove(id)
    }
  }

  const handleOnIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (onIncrement) {
      onIncrement({ id, quantity: quantity + 1 })
    }
  }

  const handleOnDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (onDecrement) {
      onDecrement({ id, quantity: quantity - 1 })
    }
  }

  const removeButton = !nonInteractive ? (
    <button type='button' className='cart-item__remove-button' onClick={handleOnRemove}>
      Ta bort
    </button>
  ) : null

  const actions = !nonInteractive ? (
    <div className='cart-item__actions'>
      <button type='button' className='cart-item__quantity-button' onClick={handleOnIncrement}>
        <UpArrow color='#000' />
      </button>
      <div className='cart-item__quantity-wrap'>
        <span className='cart-item__quantity'>{quantity}</span>
      </div>
      <button
        type='button'
        className='cart-item__quantity-button'
        onClick={handleOnDecrement}
        disabled={quantity === 1}
      >
        <DownArrow color='#000' />
      </button>
    </div>
  ) : null

  const displayQuantity = nonInteractive ? <span className='cart-item__quantity'>{quantity}</span> : null

  const classes = classNames('cart-item', {
    'cart-item--nonInteractive': nonInteractive,
  })

  return (
    <div className={classes}>
      <div className='cart-item__content'>
        <h3 className='cart-item__title'>{product.name}</h3>
        <span className='cart-item__price'>{`${product.unitPrice} kr`}</span>
        {displayQuantity}
        {removeButton}
      </div>
      {actions}
    </div>
  )
}

CartItem.defaultProps = {
  nonInteractive: false,
}
