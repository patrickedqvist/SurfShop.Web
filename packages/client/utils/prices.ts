import { map, min, max, isEmpty, has, get } from 'lodash/fp'

import { ProductVariant } from '../typeDefs/product'

export interface VariationPrice {
  min: number
  max: number
}

export const getVariationPrices = (variations: ProductVariant[]): VariationPrice => {
  if (!variations || isEmpty(variations)) {
    return {
      min: 0,
      max: 0,
    }
  }

  const allPrices = map(
    (variant) =>
      has('price.salePrice', variant) ? get('price.salePrice', variant) : get('price.regularPrice', variant),
    variations
  )

  return {
    min: min(allPrices),
    max: max(allPrices),
  }
}
