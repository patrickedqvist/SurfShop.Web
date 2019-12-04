import * as Router from 'koa-router'
import { set, flow, findIndex, remove } from 'lodash/fp'

// type defs
import { Cart, CartItem } from '../types/cart'

// Utils
import { addItemToCart, updateAmounts } from '../utils/cart-utilities'

interface IdRequestParam {
  id: string
}

const cartRouter = new Router()

/**
 * Get Cart
 */
cartRouter.get('/', async (ctx) => {
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
})

/**
 * Add product to cart
 */

cartRouter.post('/', async (ctx) => {
  const product = ctx.body as CartItem
  const { cart } = ctx.session

  const updatedCart = addItemToCart(cart, product)

  ctx.session.cart = updatedCart
  ctx.body = updatedCart
})

/**
 * Update existing item in cart
 */

interface UpdateQuantityRequest {
  quantity: number
}

cartRouter.post('/:id', async (ctx) => {
  const { id } = ctx.params as IdRequestParam
  const { quantity } = ctx.body as UpdateQuantityRequest

  ctx.assert(id, 404, 'No id specifed')
  ctx.assert(quantity, 400, 'No quantity was specifed')

  const { cart } = ctx.session
  const indexOf = findIndex((i: CartItem) => i.id === id, cart.items)

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
})

/**
 * Delete product from cart
 */

cartRouter.delete('/:id', async (ctx) => {
  const { id } = ctx.params as IdRequestParam
  if (ctx.params && id) {
    const { cart } = ctx.session
    const updatedItems = remove((i: CartItem) => i.id === id, cart.items)
    const updatedCart = set('items', updatedItems || [], cart)
    const updatedCartTotals = updateAmounts(updatedCart)
    ctx.session.cart = updatedCartTotals
    ctx.body = updatedCartTotals
  } else {
    ctx.status = 400
    ctx.body = 'No reference was specifed'
    ctx.app.emit('error', 'No reference was specifed', ctx)
  }
})

cartRouter.delete('/', async (ctx) => {
  const newCart: Cart = {
    items: [],
    totalAmount: 0,
    totalDiscountAmount: 0,
    totalTaxAmount: 0,
  }
  ctx.session.cart = newCart
})

export { cartRouter }
