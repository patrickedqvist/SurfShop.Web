import React, { memo } from 'react'
import classNames from 'classnames'
import { get, map, isEmpty, find, size } from 'lodash/fp'
import Link from 'next/link'

// Styles
import './product-card.scss'

// Types
import { Product } from '../../typeDefs/product'

interface Props {
  product: Product;
  highlight?: boolean;
}

export const ProductCardListComponent: React.FC<Props> = ({ product, highlight }) => {
  const classes = classNames('product-card product-card--list', {
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
          <span key={label.id} className='product-card__label'>
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
        <a className='product-card__image-link' title={product.title}>
          <div className='product-card__image' style={imageStyle} />
        </a>
      </Link>

      <div className='product-card__content'>
        {colorOptions && <span className='product-card-availableIn'>{`Finns i ${colorOptions} färger`}</span>}
        <Link href='/product/[slug]' as={`/product/${product.slug}`} passHref>
          <a className='product-card__title' title={product.title}>
            {product.title}
          </a>
        </Link>
        <p className='product-card__excerpt'>{product.excerpt}</p>
        <p className='product-card__price'>{`${product.price} kr`}</p>
      </div>

      {!isEmpty(product.labels) && <div className='product-card__labels'>{labels}</div>}
    </div>
  )
}

ProductCardListComponent.defaultProps = {
  highlight: false,
}

export const ListItem = memo(ProductCardListComponent)
ListItem.displayName = 'ProductCard-ListItem'
