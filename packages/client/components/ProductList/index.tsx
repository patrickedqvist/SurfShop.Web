import { map, isEmpty } from 'lodash/fp'
import React from 'react'

// Components
import { ProductCard } from '../ProductCard'

// Styles
import './product-list.scss'

// Types
import { Product } from '../../typeDefs/product'

interface Props {
  products?: Product[];
}

export const ProductList: React.FC<Props> = (props) => {
  if (isEmpty(props.products)) {
    return null
  }

  const products = map(
    (product) => (
      <div className='product-list-item' key={product.id}>
        <ProductCard product={product} />
      </div>
    ),
    props.products
  )

  return <div className='product-list'>{products}</div>
}
