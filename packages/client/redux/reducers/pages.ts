import { set, getOr } from 'lodash/fp'
import { combineReducers } from 'redux'

// Redux
import {
  PAGE_FETCH,
  PAGE_RECEIVE,
  REQUEST_LOADING,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
} from '../definitions'

// typeDefs
import { Action } from '../../typeDefs/store'

const initialState = {}

const data = (state = initialState, { type, payload, meta }: Action) => {
  switch (type) {
    case PAGE_RECEIVE:
      return set(meta.slug, payload.page, state)

    default:
      return state
  }
}

const status = (state = {}, { payload, type, error, meta }: Action) => {
  switch (type) {
    case PAGE_FETCH:
      return set(
        payload.slug,
        {
          status: REQUEST_LOADING,
          statusCode: null,
        },
        state
      )

    case PAGE_RECEIVE:
      return set(
        meta.slug,
        {
          status: error ? REQUEST_FAILURE : REQUEST_SUCCESS,
          statusCode: getOr(200, 'statusCode', meta),
        },
        state
      )

    default:
      return state
  }
}

export const pages = combineReducers({ data, status })
