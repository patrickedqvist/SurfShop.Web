import { call, put } from 'redux-saga/effects'

// api
import { api } from '../api'

// Definitions
import { receiveCart } from '../actions/cart'

// Types
import { Action } from '../../typeDefs/store'

async function fetchCart() {
  return api.get(`/cart`)
}

async function addItemToCart(id: number) {
  return api.post(`/cart`, { id })
}

export function* handleFetchOfCart() {
  try {
    const { data } = yield call(fetchCart)
    yield put(receiveCart(data, false))
  } catch (error) {
    if (error.response) {
      yield put(receiveCart(null, true))
    } else {
      yield put(receiveCart(null, true))
    }
  }
}

export function* handleAdditionToCart(action: Action) {
  try {
    const { data } = yield call(addItemToCart, action.payload.id)
    yield put(receiveCart(data, false))
  } catch (error) {
    if (error.response) {
      yield put(receiveCart(null, true))
    } else {
      yield put(receiveCart(null, true))
    }
  }
}
