import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { find, get } from 'lodash/fp'
import Error from 'next/error'

// Redux
import { getProductBySlug } from '../../redux/actions/products'
import { PRODUCT_RECEIVE, REQUEST_FAILURE, REQUEST_LOADING } from '../../redux/definitions'

// typeDefs
import { Store, RequestStatus } from '../../typeDefs/store'

// Components
import { PageLayout } from '../../components/PageLayout'
import { Head } from '../../components/Head'
import { ImageGallery } from '../../components/ImageGallery'
import { ColorsAttributes } from '../../components/ProductAttributes/colors'
import { BuyButton } from '../../components/BuyButton'
import { SizesAttributes } from '../../components/ProductAttributes/sizes'

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side'

// Styling
import '../../styles/pages/product-page.scss'

// TypeDefs
import { Product } from '../../typeDefs/product'
import { addProductToCart } from '../../redux/actions/cart'

const ProductPage: NextPage = () => {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const dispatch = useDispatch();

  const router = useRouter()
  const { slug } = router.query

  const product: Product = useSelector((store: Store) =>
    find((p) => p.slug === slug, store.products.data)
  )
  const productStatus: RequestStatus = useSelector((store: Store) =>
    get(slug, store.products.status)
  )

  if ( !product || productStatus.status === REQUEST_FAILURE ) {
    return <Error statusCode={productStatus.statusCode} />
  } if ( productStatus.status === REQUEST_LOADING ) {
    return <p>Loading…</p>
  }

  const colors = find(
    (attribute) => attribute.name === 'Color',
    product.attributes
  )
  const sizes = find(
    (attribute) => attribute.name === 'Size',
    product.attributes
  )

  const handleSetColor = (option: string) => {
    setSelectedColor(option)
  }

  const handleSetSize = (option: string) => {
    setSelectedSize(option)
  }

  const handleOnAddToBag = () => {
    dispatch(addProductToCart(product.id));
  }

  return (
    <PageLayout className='productPage'>
      <Head
        title={`${product.title} | SurfShop`}
        description={product.excerpt}
      />
      <article className='grid-container'>
        <div className='productPage__gallery'>
          <ImageGallery images={product.images} useThumbnails />          
        </div>
        <div className='productPage__info'>
          <div className="productPage__sustainability">
            {product.sustainabilityOptions.map((opt => <span className="productPage__label" key={opt.id}>{opt.title}</span>))}
          </div>
          <h1 className='productPage__title'>{product.title}</h1>
          <p className='productPage__excerpt'>{product.excerpt}</p>                    
          <div className='productPage__chooseVariant'>
            <ColorsAttributes
              title={selectedColor ? `Färg: ${selectedColor}` : 'Välj färg'}
              options={colors.options}
              selectedOption={selectedColor}
              onChange={handleSetColor}
            />
            <SizesAttributes
              title={selectedSize ? `Storlek: ${selectedSize}` : 'Välj storlek'}
              options={sizes.options}
              selectedOption={selectedSize}
              onChange={handleSetSize}
            />
            <BuyButton onClick={handleOnAddToBag} outOfStock={false} />
          </div>
        </div>
      </article>
    </PageLayout>
  )
}

ProductPage.getInitialProps = async (ctx) => {
  const slug = ctx.query.slug as string
  ctx.store.dispatch(getProductBySlug(slug))

  if (ctx.isServer) {
    await setServerResponseStatusCode({
      context: ctx,
      waitForActions: PRODUCT_RECEIVE,
      statusLocation: ['products', 'status', slug],
    })
  }

  return {}
}

export default ProductPage
