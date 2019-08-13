import { reduce, map, get, min, max } from 'lodash/fp';

import { ProductVariant } from "../typeDefs/product";

export const getVariationPrices = (variations: ProductVariant[]) => {
    const allPrices = map((variant) => {
        if ( variant.price ) {
            return variant.price.salePrice ? variant.price.salePrice : variant.price.regularPrice
        }
    }, variations);

    return {
        min: min(allPrices),
        max: max(allPrices)
    }
}