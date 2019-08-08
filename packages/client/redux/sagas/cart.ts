import { call, put } from 'redux-saga/effects';

// Definitions
import { receiveCart } from '../actions/cart';

// Types
import { Action } from '../../typeDefs/store';


export function* handleFetchOfCart(action: Action) {    
    // try {
    //     const { data } = yield call(fetchCart);
    //     yield put(receiveCart(data));
    // } catch (error) {
    //     yield put(receiveCart(error, true))
    // }
}
