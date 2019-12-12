import { VIEWSTATE_SET, VIEWSTATE_REMOVE } from '../definitions'

// typeDefs
import { SetViewstateAction, RemoveViewstateAction } from '../../typeDefs/viewstate'

export const setViewstate = <T>(key: string, value: T): SetViewstateAction<T> => ({
  type: VIEWSTATE_SET,
  payload: { key, value },
})

export const removeViewstate = (key: string): RemoveViewstateAction => ({
  type: VIEWSTATE_REMOVE,
  payload: { key },
})
