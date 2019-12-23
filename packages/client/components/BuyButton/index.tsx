import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

// Style
import './buy-button.scss'

// Types
interface Props {
  outOfStock: boolean;
  notReady?: string;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BuyButton: React.FC<Props> = ({ outOfStock, notReady, className, onClick }) => {
  const [isAnimating, setAnimating] = useState(false)

  let timeoutID = null

  const clearTimer = () => {
    if (timeoutID !== null) {
      clearTimeout(timeoutID)
    }
  }

  useEffect(() => {
    return () => clearTimer()
  }, [])

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAnimating) {
      // Animate if not already animating
      setAnimating(true)

      // Call onClick prop function
      onClick(event)

      // Reset
      timeoutID = setTimeout(() => {
        setAnimating(false)
      }, 800)
    }
  }

  const text = outOfStock ? 'Out of stock' : 'Add to bag'

  const classes = classNames('buy-button', {
    'buy-button--outOfStock': outOfStock,
    'buy-button--notReady': notReady,
    'buy-button--animating': isAnimating,
    [`${className}`]: className,
  })

  return (
    <button type='button' className={classes} disabled={outOfStock} onClick={handleOnClick}>
      <span>{text}</span>
      <svg x='0px' y='0px' width='32px' height='32px' viewBox='0 0 32 32'>
        <path
          strokeDasharray='19.79 19.79'
          strokeDashoffset='19.79'
          fill='none'
          stroke={!outOfStock ? '#FFFFFF' : '#000000'}
          strokeWidth='2'
          strokeLinecap='square'
          strokeMiterlimit='10'
          d='M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11'
        />
      </svg>
    </button>
  )
}

BuyButton.defaultProps = {
  notReady: '',
}
