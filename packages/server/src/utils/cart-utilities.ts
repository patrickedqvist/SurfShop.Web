import {
  concat,
  get,
  getOr,
  set,
  flow,
  findIndex,
  map,
  reduce,
  subtract,
  add,
} from 'lodash/fp'

import { Cart, CartItem } from '../types/cart'

export const EMPTY_CART: Cart = {
  items: [],
  totalAmount: 0,
  totalDiscountAmount: 0,
  totalTaxAmount: 0,
}

export const setItemsTotalAmount = (cart: Cart) => {
  const updatedItems = map((item) => {
    const price = get('unitDiscountPrice', item)
      ? get('unitDiscountPrice', item)
      : get('unitPrice', item)
    const quantity = get('quantity', item)
    return set('totalAmount', quantity * price, item)
  }, cart.items)

  return set('items', updatedItems, cart)
}

export const setItemsTotalDiscountAmount = (cart: Cart) => {
  const updatedItems = map((item) => {
    if (get('unitDiscountPrice', item) !== null) {
      const discountPrice = getOr(0, 'unitDiscountPrice', item)
      const ordinaryPrice = get('unitPrice', item)
      const discount = subtract(ordinaryPrice, discountPrice)

      const quantity = get('quantity', item)
      return set('totalDiscountAmount', quantity * discount, item)
    }

    return set('totalDiscountAmount', 0, item)
  }, cart.items)

  return set('items', updatedItems, cart)
}

export const setItemsTaxAmount = (cart: Cart) => {
  const updatedItems = map((item) => {
    const taxAmount =
      get('totalAmount', item) -
      (get('totalAmount', item) * 10000) / (10000 + get('taxRate', item))
    return set('totalTaxAmount', taxAmount, item)
  }, cart.items)

  return set('items', updatedItems, cart)
}

export const setTotalAmount = (cart: Cart) => {
  const totalAmount = reduce(
    (total, item) => {
      return add(total, get('totalAmount', item))
    },
    0,
    cart.items
  )

  return set('totalAmount', totalAmount, cart)
}

export const setTotalDiscountAmount = (cart: Cart) => {
  const totalAmount = reduce(
    (total, item) => {
      return add(total, get('totalDiscountAmount', item))
    },
    0,
    cart.items
  )

  return set('totalDiscountAmount', totalAmount, cart)
}

export const setTotalTaxAmount = (cart: Cart) => {
  let totalAmount = 0
  map((item) => {
    totalAmount = add(totalAmount, get('totalTaxAmount', item))
  }, cart.items)
  return set('totalTaxAmount', totalAmount, cart)
}

export const updateAmounts = flow([
  setItemsTotalAmount,
  setItemsTotalDiscountAmount,
  setItemsTaxAmount,
  setTotalAmount,
  setTotalDiscountAmount,
  setTotalTaxAmount,
])

export const addItemToCart = (cart: Cart, item: CartItem): Cart => {
  const currentItemIndex = findIndex((i) => i.id === item.id, cart.items)

  // Check if item already exists
  if (currentItemIndex !== -1) {
    const quantity = get(['items', currentItemIndex, 'quantity'], cart)
    const updatedQuantity = set(
      ['items', currentItemIndex, 'quantity'],
      quantity + 1,
      cart
    )

    return updateAmounts(updatedQuantity)
  }
  const items = concat(cart.items, item)
  const newCart = set('items', items, cart)

  return updateAmounts(newCart)
}

export const createCartItemFromProduct = (product): CartItem => {
  const tax = product.taxRate ? product.taxRate : 2500

  return {
    id: product.id,
    name: product.title,
    quantity: 1,
    unitPrice: product.price,
    unitDiscountPrice: product.price,
    taxRate: tax,
    totalAmount: product.price,
    totalDiscountAmount: product.price,
    totalTaxAmount: product.price * tax,
  }
}
