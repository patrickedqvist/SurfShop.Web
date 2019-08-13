import axios from 'axios';
import { call, put } from 'redux-saga/effects';

// Definitions
import { receiveProducts, receiveProductBySlug } from '../actions/products';

async function fetchProducts() {
    return await axios.get(`http://localhost:4000/v1/products`);
}

async function fetchProduct(slug: string) {
    return await axios.get(`http://localhost:4000/v1/products/${slug}`);
}

export function* handleFetchOfProducts() {

    try {
        const { data, status } = yield call(fetchProducts);
        yield put(receiveProducts(data, false, { status: 'SUCCESS', statusCode: status }))
    } catch (error) {        
        console.error(error);
        yield put(receiveProducts(null, true, { status: error.statusText, statusCode: error.status }))
    }
}

export function* handleFetchOfProduct(action) {

    try {
        const { data, status } = yield call(fetchProduct, action.payload.slug);
        yield put(receiveProductBySlug(data, false, { status: 'SUCCESS', statusCode: status, slug: action.payload.slug }))
    } catch (error) {
        console.error(error);
        yield put(receiveProductBySlug(null, true, { status: error.statusText, statusCode: error.status, slug: action.payload.slug }))
    }
}
