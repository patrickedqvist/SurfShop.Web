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

async function updateItemInCart(id: number, quantity: number) {
  return api.post(`/cart/${id}`, { quantity })
}

async function removeItemFromCart(id: number) {
  return api.delete(`/cart/${id}`)
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

export function* handleChangeToCart(action: Action) {
  try {
    const { data } = yield call(updateItemInCart, action.payload.id, action.payload.quantity)
    yield put(receiveCart(data, false))
  } catch (error) {
    if (error.response) {
      yield put(receiveCart(null, true))
    } else {
      yield put(receiveCart(null, true))
    }
  }
}

export function* handleRemovalFromCart(action: Action) {
  try {
    const { data } = yield call(removeItemFromCart, action.payload.id)
    yield put(receiveCart(data, false))
  } catch (error) {
    if (error.response) {
      yield put(receiveCart(null, true))
    } else {
      yield put(receiveCart(null, true))
    }
  }
}
