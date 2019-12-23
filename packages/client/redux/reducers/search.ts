import { getOr, merge } from 'lodash/fp'
import { combineReducers } from 'redux'

// Redux
import { SEARCH_RECEIVE, REQUEST_FAILURE, REQUEST_SUCCESS } from '../definitions'

// typeDefs
import { Action } from '../../typeDefs/store'

const initialState = {}

const data = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case SEARCH_RECEIVE:
      return payload.result

    default:
      return state
  }
}

const status = (state = {}, { type, error, meta }: Action) => {
  switch (type) {
    case SEARCH_RECEIVE: {
      const updatedState = {
        status: error ? REQUEST_FAILURE : REQUEST_SUCCESS,
        statusCode: getOr(200, 'statusCode', meta),
      }
      return merge(state, updatedState)
    }

    default:
      return state
  }
}

export const search = combineReducers({ data, status })
