import React, { memo, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Styling
import './header.scss'

// Components
import { MiniCart } from './MiniCart'
import { MainNavigation } from './MainNavigation'
import { HeaderSearch } from './HeaderSearch'

// Types
interface Props {
  fixed?: boolean;
  sticky?: boolean;
}

const HeaderComponent: React.FC<Props> = ({ fixed, sticky }) => {
  const [searchVisible, setSearchVisibility] = useState<boolean>(false)

  const classes = classNames('site-header grid-container', {
    'site-header--fixed': fixed,
    'site-header--sticky': sticky,
  })

  const handleOnSearchButtonClick = () => {
    setSearchVisibility(!searchVisible)
  }

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
      <div className='site-header__actions'>
        <button type='button' className='site-header__search' onClick={handleOnSearchButtonClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20px'
            height='20px'
            viewBox='0 0 20 20'
            className='site-header__search-icon'
          >
            <path d='M12.495 11.605a6.337 6.337 0 0 1-.89.889 6.302 6.302 0 0 1-4.007 1.435 6.338 6.338 0 0 1-6.331-6.332 6.337 6.337 0 0 1 6.331-6.33 6.338 6.338 0 0 1 6.333 6.33 6.3 6.3 0 0 1-1.436 4.008m7.322 7.324l-6.424-6.425a7.558 7.558 0 0 0 1.802-4.907A7.597 7.597 0 1 0 0 7.597a7.6 7.6 0 0 0 7.598 7.599 7.567 7.567 0 0 0 4.908-1.804l6.424 6.425a.629.629 0 0 0 .887-.888' />
          </svg>
        </button>
        <MiniCart />
      </div>
      <HeaderSearch visible={searchVisible} />
    </header>
  )
}

HeaderComponent.defaultProps = {
  fixed: false,
  sticky: false,
}

export const Header = memo(HeaderComponent)
