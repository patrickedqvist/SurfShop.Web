import { takeLatest, all } from 'redux-saga/effects';

// Definitions
import { CART_FETCH } from '../definitions';

// Sagas
import { handleFetchOfCart } from './cart';

function* Sagas() {
    yield all([
        yield takeLatest(CART_FETCH, handleFetchOfCart),        
    ]);
};

export default Sagas;