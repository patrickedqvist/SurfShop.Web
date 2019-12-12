import { normalize, schema } from 'normalizr'

import { Product } from '../typeDefs/product'

const productSchema = new schema.Entity<Product>('products', {}, { idAttribute: 'slug' })
const productsSchema = new schema.Array<Product[]>(productSchema)
export const normalizeProduct = (product: Product) => normalize(product, productSchema)
export const normalizeProducts = (products: Product[]) => normalize(products, productsSchema)
