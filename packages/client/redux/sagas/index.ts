import { takeLatest } from 'redux-saga/effects';

// Definitions
import { CART_FETCH, PRODUCTS_FETCH, PRODUCT_FETCH } from '../definitions';

// Sagas
import { handleFetchOfCart } from './cart';
import { handleFetchOfProducts, handleFetchOfProduct } from './products';

function* Sagas() {
    yield takeLatest(CART_FETCH, handleFetchOfCart)
    yield takeLatest(PRODUCTS_FETCH, handleFetchOfProducts)
    yield takeLatest(PRODUCT_FETCH, handleFetchOfProduct)
};

export default Sagas;