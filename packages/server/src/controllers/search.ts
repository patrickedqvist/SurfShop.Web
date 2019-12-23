import { find } from 'lodash/fp'
import * as Koa from 'koa'
import * as Router from 'koa-router'

import * as products from '../db/products.json'
import searchIndex from '../services/lunr'

const searchRouter = new Router()

searchRouter.post('/', async (ctx) => {
  const { query } = ctx.request.body

  try {
    const searchResult = searchIndex.search(query)
    console.log(`searchResults for ${query} -->`, searchResult)
    const results = []

    searchResult.forEach(function(result) {
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
