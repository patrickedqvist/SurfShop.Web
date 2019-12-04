import { find } from 'lodash/fp'
import * as pages from '../db/pages.json'

export default class PagesController {
  public static async getPageBySlug(ctx) {
    if (!ctx.params || !ctx.params.slug) {
      ctx.status = 400
      ctx.body = 'You must specify a slug'
    }

    const page = find((p) => p.slug === ctx.params.slug, pages)

    if (page) {
      ctx.body = page
    } else {
      ctx.status = 404
      ctx.body = `No product found with slug: ${ctx.params.slug}`
    }
  }
}
