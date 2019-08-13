import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { find } from 'lodash/fp'

// Redux
import { getProductBySlug } from '../../redux/actions/products';
import { PRODUCT_RECEIVE } from '../../redux/definitions';

// typeDefs
import { Store } from '../../typeDefs/store';

// Components
import { PageLayout } from '../../components/PageLayout';
import { Head } from '../../components/Head';
import { Hero } from '../../components/Hero';

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side';

const ProductPage: NextPage = () => {
    const router = useRouter();
    const { pslug } = router.query;
    const product = useSelector((store: Store) => find((p => p.slug === pslug), store.products.data))

    if ( !product ) {
        return null;
    }

    return (
        <PageLayout>
            <Head title={'Welcome to Next.js!'} description={'Start coding'} />
            <Hero title={product.title} backgroundImage={'/static/images/windsurfing.jpg'} />            
        </PageLayout>
    );
}

ProductPage.getInitialProps = async (ctx) => {
    
    const slug = ctx.query.pslug as string
    ctx.store.dispatch(getProductBySlug( slug ));

    if (ctx.isServer) {
        await setServerResponseStatusCode({
            context: ctx,
            waitForActions: [PRODUCT_RECEIVE],
            storeLocation: 'product',
            id: slug
        })
    }

    return {}
}

export default ProductPage