import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';

// Redux
import { getProducts } from '../redux/actions/products';
import { PRODUCTS_RECEIVE } from '../redux/definitions';

// typeDefs
import { Store } from '../typeDefs/store';

// Components
import { PageLayout } from '../components/PageLayout';
import { Head } from '../components/Head';
import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';

// Utils
import { setServerResponseStatusCode } from '../utils/server-side';

const Home: NextPage = () => {

  const products = useSelector((store: Store) => store.products.data)

  return (
    <PageLayout>
      <Head title={'Welcome to Next.js!'} description={'Start coding'} />
      <Hero title={'Nytt från Starboard 2020'} backgroundImage={'/static/images/windsurfing.jpg'}/>
      <ProductList products={products} />
    </PageLayout>
  );
}

Home.getInitialProps = async (ctx) => {
  ctx.store.dispatch(getProducts());

  if ( ctx.isServer ) {
    await setServerResponseStatusCode({ 
      context: ctx,
      waitForActions: [PRODUCTS_RECEIVE],
      storeLocation: 'products'
    })
  }

  return {}
}

export default Home