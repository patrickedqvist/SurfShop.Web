import { getOr, set } from 'lodash/fp'
import { combineReducers } from 'redux'

// Redux
import {
  SEARCH_RECEIVE,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
  REQUEST_LOADING,
  SEARCH_FETCH,
  QUICK_SEARCH_TOGGLE,
} from '../definitions'

// typeDefs
import { Action } from '../../typeDefs/store'

const initialState = {
  visible: false,
  searchString: '',
  results: [],
}

const data = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case QUICK_SEARCH_TOGGLE:
      return set('visible', payload.visible, state)

    case SEARCH_FETCH:
      return set('searchString', payload.searchString, state)

    case SEARCH_RECEIVE:
      return set('results', payload.result, state)

    default:
      return state
  }
}

const status = (state = {}, { type, error, meta }: Action) => {
  switch (type) {
    case SEARCH_FETCH:
      return {
        status: REQUEST_LOADING,
        statusCode: null,
      }

    case SEARCH_RECEIVE:
      return {
        status: error ? REQUEST_FAILURE : REQUEST_SUCCESS,
        statusCode: getOr(200, 'statusCode', meta),
      }

    default:
      return state
  }
}

export const search = combineReducers({ data, status })
