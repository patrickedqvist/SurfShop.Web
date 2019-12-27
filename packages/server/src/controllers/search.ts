import { find } from 'lodash/fp'
import * as Router from 'koa-router'

import * as products from '../db/products.json'
import searchIndex from '../services/lunr'

const searchRouter = new Router()

function isBlank(str: string): boolean {
  return !str || /^\s*$/.test(str)
}

searchRouter.post('/', async (ctx) => {
  const { query } = ctx.request.body as { query: string }

  if (isBlank(query)) {
    ctx.body = []
    return
  }

  try {
    const searchResult = searchIndex.search(query)
    const results = []

    searchResult.forEach((result) => {
      const productId = result.ref
      const product = find((p) => p.id === parseInt(productId, 10), products)
      results.push(product)
    })

    ctx.body = results
  } catch (error) {
    ctx.body = error
  }
})

export { searchRouter }
