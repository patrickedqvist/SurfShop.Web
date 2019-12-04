import { find } from 'lodash/fp'
import * as Router from 'koa-router'

// data
import * as pages from '../db/pages.json'

const pagesRouter = new Router()

pagesRouter.get('/', async (ctx) => {
  ctx.body = pages
})

pagesRouter.get('/:slug', async (ctx) => {
  ctx.assert(ctx.params.slug, 400, 'No slug was specified')
  const page = find((p) => p.slug === ctx.params.slug, pages)
  ctx.assert(page, 404, `No page was found with slug ${ctx.params.slug}`)
  ctx.body = page
})

export { pagesRouter }
