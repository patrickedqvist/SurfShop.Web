import { Action } from '../../typeDefs/store'
import { SEARCH_FETCH, SEARCH_RECEIVE } from '../definitions'

export interface SearchForAction {
  type: typeof SEARCH_FETCH;
  payload: {
    searchString: string;
  };
}

export const getSearchResultFor = (searchString: string): SearchForAction => ({
  type: SEARCH_FETCH,
  payload: { searchString },
})

export const receiveSearchResult = (result: Array<any>, error: boolean): Action => ({
  type: SEARCH_RECEIVE,
  payload: { result },
  error,
})
