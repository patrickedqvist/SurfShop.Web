import * as Koa from 'koa'
import * as Router from 'koa-router'
import { set, flow, find, findIndex, remove } from 'lodash/fp'

// Data
import * as products from '../db/products.json'

// type defs
import { Cart, CartItem } from '../types/cart'

// Utils
import { addItemToCart, updateAmounts, EMPTY_CART, createCartItemFromProduct } from '../utils/cart-utilities'

interface IdRequestParam {
  id: string;
}

const cartRouter = new Router()

/**
 * Get Cart
 */
cartRouter.get('/', async (ctx: Koa.ParameterizedContext) => {
  const newCart = EMPTY_CART

  if (ctx.session.isNew || !ctx.session.cart) {
    ctx.session.cart = newCart
    ctx.body = newCart
  } else if (!ctx.session.isNew || ctx.session.cart) {
    ctx.body = ctx.session.cart
  }

  return newCart
})

/**
 * Add product to cart
 */

interface AddProductToCart {
  id: number;
}

cartRouter.post('/', async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.request.body as AddProductToCart
  const { cart } = ctx.session

  if (!id) {
    ctx.status = 400
    ctx.body = 'No id was specified'
    ctx.throw(id, 400, 'No id was specified')
  }

  // Find the product
  const product = find((p) => p.id === id, products)

  if (!product) {
    ctx.status = 404
    ctx.body = 'No product was found with this id'
    ctx.throw(product, 404, 'No product was found with this id')
  }

  // Create a cart item out of the product
  const cartItem = createCartItemFromProduct(product)

  // Update the actual cart
  const updatedCart = addItemToCart(cart, cartItem)

  // Update session cart
  ctx.session.cart = updatedCart

  // Send back the updated cart
  ctx.body = updatedCart
})

/**
 * Update existing item in cart
 */

interface UpdateQuantityRequest {
  quantity: string;
}

cartRouter.post('/:id', async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params as IdRequestParam
  const { quantity } = ctx.request.body as UpdateQuantityRequest

  ctx.assert(id, 404, 'No id specifed')
  ctx.assert(quantity, 400, 'No quantity was specifed')

  const { cart } = ctx.session
  const idNumber = parseInt(id, 10)
  const indexOf = findIndex((i: CartItem) => i.id === idNumber, cart.items)

  if (indexOf === -1) {
    ctx.throw(404, `Did not find a cart item with the id of ${id}`)
  }

  const updateCart = flow([(c) => set(['items', indexOf, 'quantity'], quantity, c), (c) => updateAmounts(c)])

  const updatedCart = updateCart(cart)

  ctx.session.cart = updatedCart
  ctx.body = updatedCart
})

/**
 * Delete product from cart
 */

cartRouter.delete('/:id', async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params as IdRequestParam
  if (ctx.params && id) {
    const { cart } = ctx.session
    const updatedItems = remove((i: CartItem) => i.id === parseInt(id, 10), cart.items)
    const updatedCart = set('items', updatedItems || [], cart)
    const updatedCartTotals = updateAmounts(updatedCart)
    ctx.session.cart = updatedCartTotals
    ctx.body = updatedCartTotals
  } else {
    ctx.throw(400, 'No reference was specifed')
  }
})

cartRouter.delete('/', async (ctx: Koa.ParameterizedContext) => {
  const newCart: Cart = {
    items: [],
    totalAmount: 0,
    totalDiscountAmount: 0,
    totalTaxAmount: 0,
  }
  ctx.session.cart = newCart
})

export { cartRouter }
