import { find } from 'lodash/fp'
import * as products from '../db/products.json'
import { Context } from 'koa'

export default class ProductsController {
  public static async getProducts(ctx) {
    ctx.body = products
  }

  public static async getProductBySlug(ctx) {
    if (!ctx.params.slug) {
      ctx.status = 400
      ctx.body = 'You must specify a slug'
    }

    const product = find((p) => p.slug === ctx.params.slug, products)

    if (product) {
      ctx.body = product
    } else {
      ctx.status = 404
      ctx.body = `No product found with slug: ${ctx.param.id}`
    }
  }
}
