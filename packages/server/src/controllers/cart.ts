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
  remove,
} from 'lodash/fp'
import * as Koa from 'koa'

import { Cart, CartItem } from '../types/cart'

const setItemsTotalAmount = (cart: Cart) => {
  const updatedItems = map((item) => {
    const price = get('unitDiscountPrice', item)
      ? get('unitDiscountPrice', item)
      : get('unitPrice', item)
    const quantity = get('quantity', item)
    return set('totalAmount', quantity * price, item)
  }, cart.items)

  return set('items', updatedItems, cart)
}

const setItemsTotalDiscountAmount = (cart: Cart) => {
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

const setItemsTaxAmount = (cart: Cart) => {
  const updatedItems = map((item) => {
    const taxAmount =
      get('totalAmount', item) -
      (get('totalAmount', item) * 10000) / (10000 + get('taxRate', item))
    return set('totalTaxAmount', taxAmount, item)
  }, cart.items)

  return set('items', updatedItems, cart)
}

const setTotalAmount = (cart: Cart) => {
  const totalAmount = reduce(
    (total, item) => {
      return add(total, get('totalAmount', item))
    },
    0,
    cart.items
  )

  return set('totalAmount', totalAmount, cart)
}

const setTotalDiscountAmount = (cart: Cart) => {
  const totalAmount = reduce(
    (total, item) => {
      return add(total, get('totalDiscountAmount', item))
    },
    0,
    cart.items
  )

  return set('totalDiscountAmount', totalAmount, cart)
}

const setTotalTaxAmount = (cart: Cart) => {
  let totalAmount = 0
  map((item) => {
    totalAmount = add(totalAmount, get('totalTaxAmount', item))
  }, cart.items)
  return set('totalTaxAmount', totalAmount, cart)
}

const updateAmounts = flow([
  setItemsTotalAmount,
  setItemsTotalDiscountAmount,
  setItemsTaxAmount,
  setTotalAmount,
  setTotalDiscountAmount,
  setTotalTaxAmount,
])

const addItemToCart = (cart: Cart, item: CartItem): Cart => {
  const currentItemIndex = findIndex(
    (i: CartItem) => i.reference === item.reference,
    cart.items
  )

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

export default class CartController {
  public static async getCart(ctx) {
    const newCart: Cart = {
      items: [],
      totalAmount: 0,
      totalDiscountAmount: 0,
      totalTaxAmount: 0,
    }

    if (!ctx.session.cart) {
      ctx.session.cart = newCart
      ctx.body = newCart
    } else {
      ctx.body = ctx.session.cart
    }
  }

  public static async addProductToCart(ctx) {
    const product: CartItem = ctx.body
    const { cart } = ctx.session

    const updatedCart = addItemToCart(cart, product)

    ctx.session.cart = updatedCart
    ctx.body = updatedCart
  }

  public static async updateProductInCart(ctx) {
    const id = ctx.params.reference
    const { quantity } = ctx.body

    if (!id || !quantity) {
      ctx.status = 402
      ctx.body = 'No id or quantity was specifed'
      ctx.app.emit('error', 'No id or quantity was specifed', ctx)
    }

    const { cart } = ctx.session
    const indexOf = findIndex((i: CartItem) => i.reference === id, cart.items)

    if (indexOf === -1) {
      ctx.status = 500
      ctx.body = `Did not find a item with the reference of ${id}`
      ctx.app.emit(
        'error',
        `Did not find a item with the reference of ${id}`,
        ctx
      )
      return
    }

    const updateCart = flow([
      (c) => set(['items', indexOf, 'quantity'], quantity, c),
      (c) => updateAmounts(c),
    ])

    const updatedCart = updateCart(cart)

    ctx.session.cart = updatedCart
    ctx.body = updatedCart
  }

  public static async removeProductInCart(ctx) {
    const { reference } = ctx.params
    if (ctx.params && reference) {
      const { cart } = ctx.session
      const updatedItems = remove(
        (i: CartItem) => i.reference === reference,
        cart.items
      )
      const updatedCart = set('items', updatedItems || [], cart)
      const updatedCartTotals = updateAmounts(updatedCart)
      ctx.session.cart = updatedCartTotals
      ctx.body = updatedCartTotals
    } else {
      ctx.status = 400
      ctx.body = 'No reference was specifed'
      ctx.app.emit('error', 'No reference was specifed', ctx)
    }
  }

  public static async resetCart(ctx) {
    const newCart: Cart = {
      items: [],
      totalAmount: 0,
      totalDiscountAmount: 0,
      totalTaxAmount: 0,
    }
    ctx.session.cart = newCart
  }
}
