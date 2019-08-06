import { Viewstate } from './viewstate'

export interface Action {
    type: string,
    payload?: any,
    meta?: any,
    error?: boolean
}

export interface Store {
    viewstate: Viewstate
}