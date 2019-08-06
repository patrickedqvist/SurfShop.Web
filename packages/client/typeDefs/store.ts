import { Viewstate } from './viewstate'
import { ICart } from './cart';

export interface Action {
    type: string,
    payload?: any,
    meta?: any,
    error?: boolean
}

export interface Store {
    viewstate: Viewstate,
    cart: ICart
}