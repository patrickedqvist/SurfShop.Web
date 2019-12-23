import { call, put } from 'redux-saga/effects'

// api
import { api } from '../api'

// Actions
import { SearchForAction, receiveSearchResult } from '../actions/search'

async function searchFor(query: string) {
  return api.post(`/search`, { query })
}

export function* handleFetchOfSearch(action: SearchForAction) {
  try {
    const { data } = yield call(searchFor, action.payload.searchString)
    yield put(receiveSearchResult(data, false))
  } catch (error) {
    if (error.response) {
      yield put(receiveSearchResult(null, true))
    } else {
      yield put(receiveSearchResult(null, true))
    }
  }
}
