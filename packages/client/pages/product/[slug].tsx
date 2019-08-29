import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { find, get, map } from 'lodash/fp'
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
import { ColorsAttributes } from '../../components/ProductAttributes/colors';

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side';

// Styling
import '../../styles/pages/product-page.scss';
import { SizesAttributes } from '../../components/ProductAttributes/sizes';

const ProductPage: NextPage = () => {

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const router = useRouter();
    const { slug } = router.query;
    const product = useSelector((store: Store) => find((p => p.slug === slug), store.products.data))
    const productStatus: RequestStatus = useSelector((store: Store) => get(slug, store.products.status))
    
    const colors = find((attribute) => attribute.name === 'Color', product.attributes);
    const sizes = find((attribute) => attribute.name === 'Size', product.attributes);

    if (get('statusCode', productStatus) !== 200) {
        return <Error statusCode={get('statusCode', productStatus)} />
    }
    
    const handleSetColor = (option: string) => {
        setSelectedColor(option)
    }

    const handleSetSize = (option: string) => {
        setSelectedSize(option)
    }

    return (
        <PageLayout className={'productPage'}>
            <Head title={`${product.title} | SurfShop`} description={product.excerpt} />
            <article className={'grid-container'}>
                <div className={'productPage-gallery'}>
                    <ImageGallery images={product.images} useThumbnails={true} />
                </div>
                <div className={'productPage-info'}>
                    <h1 className={'productPage-title'}>{product.title}</h1>
                    <p className={'productPage-excerpt'}>{product.excerpt}</p>
                    <div className={'productPage-chooseVariant'}>
                        <ColorsAttributes
                            title={selectedColor ? `Färg: ${selectedColor}` : 'Välj färg'}
                            options={colors.options}
                            selectedOption={selectedColor}
                            onChange={handleSetColor} />
                        <SizesAttributes
                            title={selectedSize ? `Storlek: ${selectedSize}` : 'Välj storlek'}
                            options={sizes.options}
                            selectedOption={selectedSize}
                            onChange={handleSetSize} />
                    </div>
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