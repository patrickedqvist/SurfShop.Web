import axios from 'axios';
import { call, put } from 'redux-saga/effects';

// Definitions
import { receiveProducts } from '../actions/products';

async function fetchProducts() {
    return await axios.get(`http://localhost:3000/api/products`);
}

export function* handleFetchOfProducts() {

    try {
        const { data, status } = yield call(fetchProducts);
        yield put(receiveProducts(data, false, { status: 'SUCCESS', statusCode: status }))
    } catch (error) {        
        console.error(error);
        yield put(receiveProducts({}, true, { status: error.statusText, statusCode: error.status }))
    }
}
