import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { find, get } from 'lodash/fp'
import Error from 'next/error';

// Redux
import { getProductBySlug } from '../../redux/actions/products';
import { PRODUCT_RECEIVE } from '../../redux/definitions';

// typeDefs
import { Store, RequestStatus } from '../../typeDefs/store';

// Components
import { PageLayout } from '../../components/PageLayout';
import { Head } from '../../components/Head';
import { Hero } from '../../components/Hero';

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side';

const ProductPage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const product = useSelector((store: Store) => find((p => p.slug === slug), store.products.data))
    const productStatus: RequestStatus = useSelector((store: Store) => get(slug, store.products.status))

    if (get('statusCode', productStatus) !== 200) {
        return <Error statusCode={get('statusCode', productStatus)} />
    }

    return (
        <PageLayout>
            <Head title={'Welcome to Next.js!'} description={'Start coding'} />
            <Hero title={product.title} backgroundImage={'/static/images/windsurfing.jpg'} />            
        </PageLayout>
    );
}

ProductPage.getInitialProps = async (ctx) => {
    
    const slug = ctx.query.slug as string
    ctx.store.dispatch(getProductBySlug( slug ));

    if (ctx.isServer) {
        await setServerResponseStatusCode({
            context: ctx,
            waitForActions: [PRODUCT_RECEIVE],
            statusLocation: ['products', 'status', slug]
        })
    }

    return {}
}

export default ProductPage