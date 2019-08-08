import { merge, getOr } from 'lodash/fp';
import { combineReducers } from 'redux';

// Redux
import { PRODUCTS_RECEIVE } from '../definitions';

// typeDefs
import { Action } from '../../typeDefs/store';


const initialState = {};

const data = (state = initialState, { type, payload }: Action) => {
    switch (type) {

        case PRODUCTS_RECEIVE:
            return merge(payload.products, state)

        default:
            return state;
    }
};


const status = (state = {}, { type, error, meta }: Action) => {
    switch (type) {
        case PRODUCTS_RECEIVE:
            return {
                status: error ? 'ERROR' : 'SUCCESS',
                statusCode: getOr('', 'statusCode', meta)
            }

        default:
            return state
    }
}

export const products = combineReducers({ data, status })