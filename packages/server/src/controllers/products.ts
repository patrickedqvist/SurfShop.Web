import { find } from 'lodash/fp'
import * as Router from 'koa-router'

// Data
import * as products from '../db/products.json'

const productsRouter = new Router()

productsRouter.get('/', async (ctx) => {
  ctx.body = products
})

productsRouter.get('/:slug', async (ctx) => {
  ctx.assert(ctx.params.slug, 400, 'No slug was specified')
  const product = find((p) => p.slug === ctx.params.slug, products)
  ctx.assert(product, 404, `No product was found with slug ${ctx.params.slug}`)
  ctx.body = product
})

export { productsRouter }
