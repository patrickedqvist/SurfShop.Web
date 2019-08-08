import { takeLatest } from 'redux-saga/effects';

// Definitions
import { CART_FETCH, PRODUCTS_FETCH } from '../definitions';

// Sagas
import { handleFetchOfCart } from './cart';
import { handleFetchOfProducts } from './products';

function* Sagas() {
    yield takeLatest(CART_FETCH, handleFetchOfCart)
    yield takeLatest(PRODUCTS_FETCH, handleFetchOfProducts)
};

export default Sagas;