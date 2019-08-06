import { merge } from 'lodash/fp';
import { CART_RECEIVE } from '../definitions';

// typeDefs
import { Action } from '../../typeDefs/store';
import { ICart } from '../../typeDefs/cart';

const initialState: ICart = {
    items: [],
    totalAmount: 0,
    totalDiscountAmount: 0,
    totalTaxAmount: 0
};

export const cart = (state = initialState, { type, payload }: Action) => {
    switch (type) {

        case CART_RECEIVE:
            return merge(payload, cart)

        default:
            return state;
    }
};