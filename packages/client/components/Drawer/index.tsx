// @flow
import React, { useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classNames from 'classnames'

// Components
import { Portal } from '../Portal'

// Styling
import './drawer.scss'

// Types
type Props = {
  isOpen: boolean
  children: React.ReactNode | React.ReactNode[]
  fromSide?: 'left' | 'right'
  className?: string
  onBackDropClick?: () => void
}

export const Drawer = ({ isOpen, children, fromSide, className, onBackDropClick }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('locked')
    } else {
      document.body.classList.remove('locked')
    }

    return () => {
      document.body.classList.remove('locked')
    }
  })

  const drawerClasses = classNames('drawer__container', {
    'drawer__container--left': fromSide === 'left',
    'drawer__container--right': fromSide === 'right',
  })

  const drawerWrapperClasses = classNames('drawer__wrapper', {
    [`${className}`]: className,
  })

  const content = isOpen ? (
    <CSSTransition key='drawer' timeout={450} classNames='drawer'>
      <div className={drawerClasses} role='dialog'>
        <div
          className='drawer__backdrop'
          role='button'
          aria-label='Close Drawer'
          tabIndex={-10}
          onClick={onBackDropClick}
          onKeyDown={onBackDropClick}
        />
        <div className={drawerWrapperClasses}>{children}</div>
      </div>
    </CSSTransition>
  ) : null

  return (
    <Portal>
      <TransitionGroup>{content}</TransitionGroup>
    </Portal>
  )
}

Drawer.defaultProps = {
  fromSide: 'right',
  className: '',
}
