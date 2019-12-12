import { Action } from '../../typeDefs/store'
import { Cart } from '../../typeDefs/cart'
import { CART_FETCH, CART_RECEIVE, CART_ADD, CART_UPDATE, CART_REMOVE } from '../definitions'

export const getCart = (): Action => ({
  type: CART_FETCH,
})

export const receiveCart = (cart: Cart | null, error: boolean): Action => ({
  type: CART_RECEIVE,
  payload: { cart },
  error,
})

export const addProductToCart = (id: number): Action => ({
  type: CART_ADD,
  payload: { id },
})

export const updateProductInCart = (id: number, quantity: number): Action => ({
  type: CART_UPDATE,
  payload: { id, quantity },
})

export const removeProductFromCart = (id: number): Action => ({
  type: CART_REMOVE,
  payload: { id },
})
