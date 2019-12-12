import * as Router from 'koa-router'

import { cartRouter } from './controllers/cart'
import { productsRouter } from './controllers/products'
import { pagesRouter } from './controllers/pages'

const router = new Router({
  prefix: '/v1',
})

router.use('/cart', cartRouter.routes(), cartRouter.allowedMethods())
router.use('/products', productsRouter.routes(), productsRouter.allowedMethods())
router.use('/pages', pagesRouter.routes(), pagesRouter.allowedMethods())

export { router }
