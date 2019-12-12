import React, { memo } from 'react'
import classNames from 'classnames'
import { get, map, isEmpty, find, size } from 'lodash/fp'
import Link from 'next/link'

// Styles
import './product-card.scss'

// Types
import { Product } from '../../typeDefs/product'

interface Props {
  product: Product
  highlight?: boolean
}

export const ProductCardComponent: React.SFC<Props> = ({ product, highlight }) => {
  const classes = classNames('product-card', {
    'product-card--highlight': highlight,
  })

  const backgroundUrl = get('images[0].src', product)
  const imageStyle = backgroundUrl
    ? {
        backgroundImage: `url(${backgroundUrl})`,
      }
    : {}

  const labels = !isEmpty(product.labels)
    ? map(
        (label) => (
          <span key={label.id} className='product-card-label'>
            {label.title}
          </span>
        ),
        product.labels
      )
    : null

  const colorAttribute = find((attr) => attr.name === 'Color', product.attributes)
  const colorOptions = colorAttribute ? size(colorAttribute.options) : 0

  return (
    <div className={classes}>
      <Link href='/product/[slug]' as={`/product/${product.slug}`} passHref>
        <a className='product-card-image-link' title={product.title}>
          <div className='product-card-image' style={imageStyle} />
        </a>
      </Link>

      <div className='product-card-content'>
        {colorOptions && <span className='product-card-availableIn'>{`Finns i ${colorOptions} färger`}</span>}
        <Link href='/product/[slug]' as={`/product/${product.slug}`} passHref>
          <a className='product-card-title' title={product.title}>
            {product.title}
          </a>
        </Link>
        <p className='product-card-excerpt'>{product.excerpt}</p>
        <p className='product-card-price'>{`${product.price} kr`}</p>
      </div>

      {!isEmpty(product.labels) && <div className='product-card-labels'>{labels}</div>}
    </div>
  )
}

ProductCardComponent.defaultProps = {
  highlight: false,
}

export const ProductCard = memo(ProductCardComponent)
ProductCard.displayName = 'ProductCardMemo'
