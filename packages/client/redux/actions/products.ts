import { PRODUCTS_FETCH, PRODUCTS_RECEIVE, PRODUCT_FETCH, PRODUCT_RECEIVE } from '../definitions'

// Types
import { Action } from '../../typeDefs/store'
import { Product } from '../../typeDefs/product'

export const getProducts = (): Action => ({
  type: PRODUCTS_FETCH,
})

export const receiveProducts = (
  products: { [key: string]: Product[] } | null,
  error?: boolean,
  meta?: object
): Action => ({
  type: PRODUCTS_RECEIVE,
  payload: { products },
  error,
  meta,
})

export const getProductBySlug = (slug: string): Action => ({
  type: PRODUCT_FETCH,
  payload: { slug },
})

export const receiveProductBySlug = (
  product: { [key: string]: Product } | null,
  error?: boolean,
  meta?: object
): Action => ({
  type: PRODUCT_RECEIVE,
  payload: { product },
  error,
  meta,
})
