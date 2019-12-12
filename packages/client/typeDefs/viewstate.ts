export interface Viewstate {
  cartVisible: boolean
}

export interface SetViewstateAction<T> {
  type: 'VIEWSTATE_SET'
  payload: {
    key: string | string[]
    value: T
  }
}

export interface RemoveViewstateAction {
  type: 'VIEWSTATE_REMOVE'
  payload: {
    key: string | string[]
  }
}

export type ViewstateAction<T> = SetViewstateAction<T> | RemoveViewstateAction
