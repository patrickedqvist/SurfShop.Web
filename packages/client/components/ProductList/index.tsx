import { map, isEmpty } from 'lodash/fp'
import React from 'react'
import classNames from 'classnames'

// Components
import { GridItem, ListItem } from '../ProductCard'

// Styles
import './product-list.scss'

// Types
import { Product } from '../../typeDefs/product'

interface Props {
  products?: Product[];
  presentAs?: 'grid' | 'list';
}

export const ProductList: React.FC<Props> = ({ products, presentAs }) => {
  if (isEmpty(products)) {
    return null
  }

  const classes = classNames('product-list', {
    'product-list--grid': presentAs === 'grid',
    'product-list--list': presentAs === 'list',
  })

  const productsList = map(
    (product) => (
      <div className='product-list-item' key={product.id}>
        {presentAs === 'grid' ? <GridItem product={product} /> : <ListItem product={product} />}
      </div>
    ),
    products
  )

  return <div className={classes}>{productsList}</div>
}

ProductList.defaultProps = {
  presentAs: 'grid',
}
