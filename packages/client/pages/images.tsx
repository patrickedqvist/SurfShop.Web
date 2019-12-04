import React from 'react'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { map } from 'lodash/fp'

// Redux
import { getProducts } from '../redux/actions/products'
import { PRODUCTS_RECEIVE } from '../redux/definitions'

// typeDefs
import { Store } from '../typeDefs/store'

// Components
import { PageLayout } from '../components/PageLayout'
import { Head } from '../components/Head'

// Utils
import { setServerResponseStatusCode } from '../utils/server-side'
import { Product } from '../typeDefs/product'

const Images: NextPage = () => {
  const products: Product[] = useSelector((store: Store) => store.products.data)

  return (
    <PageLayout>
      <Head title='Welcome to Next.js!' description='Start coding' />
      {map((product) => {
        return map((image) => {
          return <img key={image.src} src={image.src} alt={image.alt} />
        }, product.images)
      }, products)}
    </PageLayout>
  )
}

Images.getInitialProps = async (ctx) => {
  ctx.store.dispatch(getProducts())

  if (ctx.isServer) {
    await setServerResponseStatusCode({
      context: ctx,
      waitForActions: PRODUCTS_RECEIVE,
      statusLocation: ['products', 'status', 'products'],
    })
  }

  return {}
}

export default Images
