import { unset, set, isEqual } from 'lodash/fp'
import { VIEWSTATE_SET, VIEWSTATE_REMOVE } from '../definitions'

// typeDefs
import { Action } from '../../typeDefs/store'
import { Viewstate } from '../../typeDefs/viewstate'

const initialState: Viewstate = {}

export const viewstate = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case VIEWSTATE_SET: {
      const next = set(payload.key, payload.value, state)
      return isEqual(next, state) ? state : next
    }
    case VIEWSTATE_REMOVE: {
      const next = unset(payload.id, state)
      return isEqual(next, state) ? state : next
    }
    default:
      return state
  }
}
