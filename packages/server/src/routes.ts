import * as Router from 'koa-router'

// import CheckoutController from './controllers/checkout';
// import OrdersController from './controllers/orders';
import CartController from './controllers/cart'
import ProductsController from './controllers/products'
import PagesController from './controllers/pages'

const router = new Router({
  prefix: '/v1',
})

// // Checkout
// router.post('/checkout', CheckoutController.createOrder);
// router.get('/checkout/:id', CheckoutController.getOrder);
// router.post('/checkout/confirm/:id', CheckoutController.confirmPurchase);
// router.post('/checkout/klarna/push/:id', CheckoutController.confirmKlarnaPush)
//
// // Orders
// router.post('/orders', OrdersController.createOrderEntry);

// Cart
router.get('/cart', CartController.getCart)
router.post('/cart', CartController.addProductToCart)
router.put('/cart/:reference', CartController.updateProductInCart)
router.delete('/cart/:reference', CartController.removeProductInCart)

// Products
router.get('/products', ProductsController.getProducts)
router.get('/products/:slug', ProductsController.getProductBySlug)

// Pages
router.get('/pages/:slug', PagesController.getPageBySlug)

export { router }
