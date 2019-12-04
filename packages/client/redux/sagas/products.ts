import { call, put } from 'redux-saga/effects'

// api
import { api } from '../api'

// Utils
import { normalizeProduct, normalizeProducts } from '../../utils/normalize'

// Definitions
import { receiveProducts, receiveProductBySlug } from '../actions/products'
import { REQUEST_SUCCESS, REQUEST_FAILURE } from '../definitions'

async function fetchProducts() {
  return api.get(`http://localhost:4000/v1/products`)
}

async function fetchProduct(slug: string) {
  return api.get(`http://localhost:4000/v1/products/${slug}`)
}

export function* handleFetchOfProducts() {
  try {
    const { data, status } = yield call(fetchProducts)

    // Normalize the structure
    const normalized = normalizeProducts(data)

    yield put(
      receiveProducts(normalized.entities.products, false, {
        status: REQUEST_SUCCESS,
        statusCode: status,
      })
    )
  } catch (error) {
    yield put(
      receiveProducts(null, true, {
        status: REQUEST_FAILURE,
        statusCode: error.status,
      })
    )
  }
}

export function* handleFetchOfProduct(action) {
  try {
    const { data, status } = yield call(fetchProduct, action.payload.slug)

    // Normalize the structure
    const normalized = normalizeProduct(data)

    yield put(
      receiveProductBySlug(normalized.entities.products, false, {
        status: REQUEST_SUCCESS,
        statusCode: status,
        slug: action.payload.slug,
      })
    )
  } catch (error) {
    yield put(
      receiveProductBySlug(null, true, {
        status: REQUEST_FAILURE,
        statusCode: error.status,
        slug: action.payload.slug,
      })
    )
  }
}
