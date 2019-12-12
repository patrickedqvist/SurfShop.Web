import React from 'react'
import { InternalLink } from '../InternalLink'

export const MainNavigation = () => {
  return (
    <nav role='navigation' className='main-nav'>
      <ul className='main-nav__list'>
        <li className='main-nav__list-item'>
          <InternalLink type='category' url='/category/dam' title='Dam' className='main-nav__link'>
            Dam
          </InternalLink>
        </li>
        <li className='main-nav__list-item'>
          <InternalLink type='category' url='/category/herr' title='Herr' className='main-nav__link'>
            Herr
          </InternalLink>
        </li>
        <li className='main-nav__list-item'>
          <a className='main-nav__link' href='#0'>
            Utrustning
          </a>
        </li>
        <li className='main-nav__list-item'>
          <a className='main-nav__link' href='#0'>
            Inspiration
          </a>
        </li>
        <li className='main-nav__list-item'>
          <InternalLink
            type='page'
            url='/page/vart-miljoansvar'
            title='Läs om Vårt Miljöansvar'
            className='main-nav__link'>
            Vårt Miljöansvar
          </InternalLink>
        </li>
      </ul>
    </nav>
  )
}
