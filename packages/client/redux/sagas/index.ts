import { takeLatest } from 'redux-saga/effects'

// Definitions
import { CART_ADD, CART_FETCH, PRODUCTS_FETCH, PRODUCT_FETCH, PAGE_FETCH, SEARCH_FETCH } from '../definitions'

// Sagas
import { handleFetchOfCart, handleAdditionToCart } from './cart'
import { handleFetchOfProducts, handleFetchOfProduct } from './products'
import { handleFetchOfPage } from './pages'
import { handleFetchOfSearch } from './search'

function* Sagas() {
  yield takeLatest(CART_FETCH, handleFetchOfCart)
  yield takeLatest(CART_ADD, handleAdditionToCart)
  yield takeLatest(PRODUCTS_FETCH, handleFetchOfProducts)
  yield takeLatest(PRODUCT_FETCH, handleFetchOfProduct)
  yield takeLatest(PAGE_FETCH, handleFetchOfPage)
  yield takeLatest(SEARCH_FETCH, handleFetchOfSearch)
}

export default Sagas
