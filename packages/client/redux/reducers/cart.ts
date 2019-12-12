import { merge } from 'lodash/fp'
import { CART_RECEIVE } from '../definitions'

// typeDefs
import { Action } from '../../typeDefs/store'
import { Cart } from '../../typeDefs/cart'

const initialState: Cart = {
  items: [],
  totalAmount: 0,
  totalDiscountAmount: 0,
  totalTaxAmount: 0,
}

export const cart = (state = initialState, { type, payload, error }: Action) => {
  switch (type) {
    case CART_RECEIVE: {
      if (!error) {
        return merge(payload.cart, cart)
      }
      return cart
    }

    default:
      return state
  }
}
