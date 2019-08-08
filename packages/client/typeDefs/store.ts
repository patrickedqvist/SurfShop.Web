import { Viewstate } from './viewstate'
import { ICart } from './cart';
import { Product } from './product';

export interface Action {
    type: string,
    payload?: any,
    meta?: any,
    error?: boolean
}

export interface RequestStatus {
    status: 'ERROR' | 'SUCCESS',
    statusCode: number
}

export interface Store {
    viewstate: Viewstate,
    cart: ICart,
    products: {
        data: Product[],
        status: RequestStatus
    }
}