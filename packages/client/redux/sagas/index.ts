import { takeLatest } from 'redux-saga/effects'

// Definitions
import {
  CART_ADD,
  CART_FETCH,
  PRODUCTS_FETCH,
  PRODUCT_FETCH,
  PAGE_FETCH,
} from '../definitions'

// Sagas
import { handleFetchOfCart, handleAdditionToCart } from './cart'
import { handleFetchOfProducts, handleFetchOfProduct } from './products'
import { handleFetchOfPage } from './pages'

function* Sagas() {
  yield takeLatest(CART_FETCH, handleFetchOfCart)
  yield takeLatest(CART_ADD, handleAdditionToCart)
  yield takeLatest(PRODUCTS_FETCH, handleFetchOfProducts)
  yield takeLatest(PRODUCT_FETCH, handleFetchOfProduct)
  yield takeLatest(PAGE_FETCH, handleFetchOfPage)
}

export default Sagas
