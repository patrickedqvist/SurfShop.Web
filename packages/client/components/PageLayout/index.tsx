import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

// Components
import { TopBar } from '../TopBar'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { BottomBar } from '../BottomBar'
import { Cart } from '../Cart'

// Redux
import { getCart } from '../../redux/actions/cart'

// Styles
import './page-layout.scss'
import '../../styles/global.scss'

// Types
interface Props {
  children: React.ReactNode[]
  headerFixed?: boolean
  className?: string | string[]
}

export const PageLayout = (props: Props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCart())
  }, [])

  const classes = classNames('page', props.className)

  return (
    <div className={classes}>
      <TopBar />
      <Header fixed={props.headerFixed} />
      <main className='main'>{props.children}</main>
      <Footer />
      <BottomBar />
      <Cart />
    </div>
  )
}

PageLayout.defaultProps = {
  headerFixed: false,
  className: '',
}
