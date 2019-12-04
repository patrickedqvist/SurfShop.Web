export interface Viewstate {
  [key: string]: string | number | object | string[] | number[] | object[]
}

export interface SetViewstateAction {
  type: 'VIEWSTATE_SET'
  payload: {
    key: string
    value: string | number | object | string[] | number[] | object[]
  }
}

export interface RemoveViewstateAction {
  type: 'VIEWSTATE_REMOVE'
  payload: { key: string }
}
