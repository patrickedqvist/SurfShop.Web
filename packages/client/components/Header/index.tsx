import React, { memo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Styling
import './header.scss'

// Components
import { MiniCart } from './MiniCart'
import { MainNavigation } from './MainNavigation'

// Types
interface Props {
  fixed?: boolean
  sticky?: boolean
}

const HeaderComponent: React.SFC<Props> = ({ fixed, sticky }) => {
  const classes = classNames('site-header grid-container', {
    'site-header--fixed': fixed,
    'site-header--sticky': sticky,
  })

  return (
    <header className={classes}>
      <Link href='/' passHref>
        <a title='Home' className='site-header__logotype'>
          <h1>SurfShop</h1>
        </a>
      </Link>
      <div className='site-header__nav'>
        <MainNavigation />
      </div>
      <div className='site-header__cart'>
        <MiniCart />
      </div>
    </header>
  )
}

HeaderComponent.defaultProps = {
  fixed: false,
  sticky: false,
}

export const Header = memo(HeaderComponent)
