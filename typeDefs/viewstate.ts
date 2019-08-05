export interface Viewstate {
    [key: string]: any
}

export interface SetViewstateAction {
    type: 'VIEWSTATE_SET',
    payload: {
        key: string,
        value: any
    }
}

export interface RemoveViewstateAction {
    type: 'VIEWSTATE_REMOVE',
    payload: { key: string }
}

