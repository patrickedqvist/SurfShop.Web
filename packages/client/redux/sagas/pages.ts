import axios from 'axios';
import { call, put } from 'redux-saga/effects';

// Definitions
import { receivePageBySlug } from '../actions/pages';
import { Action } from '../../typeDefs/store';
import { REQUEST_SUCCESS, REQUEST_FAILURE } from '../definitions';


async function fetchPage(slug: string) {
    return await axios.get(`http://localhost:4000/v1/pages/${slug}`);
}

export function* handleFetchOfPage(action: Action) {

    try {
        const { data, status } = yield call(fetchPage, action.payload.slug);        
        yield put(receivePageBySlug(data, false, { status: REQUEST_SUCCESS, statusCode: status, slug: action.payload.slug }))
    } catch (error) {
        
        if ( error.response ) {
            yield put(receivePageBySlug(null, true, { status: REQUEST_FAILURE, statusCode: error.response.status, slug: action.payload.slug }))    
        } else {
            yield put(receivePageBySlug(null, true, { status: REQUEST_FAILURE, statusCode: error.status, slug: action.payload.slug }))
        }
        
    }
}
