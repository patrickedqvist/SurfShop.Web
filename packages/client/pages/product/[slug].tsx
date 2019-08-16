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
import { ImageGallery } from '../../components/ImageGallery';

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side';

// Styling
import '../../styles/pages/product-page.scss';

const ProductPage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const product = useSelector((store: Store) => find((p => p.slug === slug), store.products.data))
    const productStatus: RequestStatus = useSelector((store: Store) => get(slug, store.products.status))

    if (get('statusCode', productStatus) !== 200) {
        return <Error statusCode={get('statusCode', productStatus)} />
    }

    return (
        <PageLayout className={'productPage'}>
            <Head title={'Welcome to Next.js!'} description={'Start coding'} />
            <article className={'grid-container'}>
                <div className={'productPage-gallery'}>
                    <ImageGallery images={product.images} useThumbnails={true} />
                </div>
                <div className={'productPage-info'}>
                    <h1 className={'productPage-title'}>{product.title}</h1>
                    <p className={'productPage-excerpt'}>{product.excerpt}</p>
                </div>
            </article>
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