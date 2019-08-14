import { merge, getOr } from 'lodash/fp';
import { combineReducers } from 'redux';

// Redux
import { PRODUCTS_RECEIVE, PRODUCT_RECEIVE, PRODUCTS_FETCH, REQUEST_FAILURE, REQUEST_SUCCESS, REQUEST_LOADING } from '../definitions';

// typeDefs
import { Action } from '../../typeDefs/store';


const initialState = {};

const data = (state = initialState, { type, payload }: Action) => {
    switch (type) {

        case PRODUCTS_RECEIVE:
            return merge(state, payload.products)

        case PRODUCT_RECEIVE:
            return merge(state, { [payload.product.slug]: payload.product })

        default:
            return state;
    }
};


const status = (state = {}, { payload, type, error, meta }: Action) => {
    switch (type) {

        case PRODUCTS_FETCH: {
            const updatedState = {
                'products': {
                    status: error ? REQUEST_FAILURE : REQUEST_SUCCESS,
                    statusCode: getOr(200, 'statusCode', meta)
                }
            };
            return merge(state, updatedState);
        }

        case PRODUCTS_RECEIVE: {
            const updatedState = {
                'products': {
                    status: error ? REQUEST_FAILURE : REQUEST_SUCCESS,
                    statusCode: getOr(200, 'statusCode', meta)
                }
            };
            return merge(state, updatedState);
        }

        case PRODUCTS_FETCH: {
            const updatedState = {
                [payload.slug]: {
                    status: REQUEST_LOADING,
                    statusCode: null
                }
            };
            return merge(state, updatedState)
        }            

        case PRODUCT_RECEIVE: {
            const updatedState = {
                [meta.slug]: {
                    status: error ? REQUEST_FAILURE : REQUEST_SUCCESS,
                    statusCode: getOr(200, 'statusCode', meta)
                }
            }
            return merge(updatedState, state)
        }            

        default:
            return state
    }
}

export const products = combineReducers({ data, status })