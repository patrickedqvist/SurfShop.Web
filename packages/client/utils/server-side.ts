import { NextPageContext } from 'next';
import { waitFor } from 'redux-wait-for-ssr';
import { get, identity } from 'lodash/fp';

export const SUCCESS = 'SUCCESS';
export const LOADING = 'LOADING';
export const FAILURE = 'FAILURE';

interface Arguments {
    context: NextPageContext 
    waitForActions: string | string[]
    storeLocation: string
    id?: string
}

export const setServerResponseStatusCode = async ({ context, waitForActions, storeLocation, id }: Arguments) => {
    const { store } = context;

    const keyPath = id ? [storeLocation, 'status', id, 'status'] : [storeLocation, 'status', 'status'];
    const keyPathStatusCode = id ? [storeLocation, 'status', id, 'statusCode'] : [storeLocation, 'status', 'statusCode'];
    const statusKeyPath = keyPath.filter(identity);
    const statusCodeKeyPath = keyPathStatusCode.filter(identity);

    try {
        // Wait for a response on the request.
        await store.dispatch(waitFor(waitForActions));

        // Get the updated store state.
        const updatedState = store.getState();        

        // Get the updated request status.
        const updatedStatus = get(statusKeyPath, updatedState);
        const updatedStatusCode = get(statusCodeKeyPath, updatedState);
        
        console.log('context -->', context);        

        // Set HTTP status code to 404 if the request failed.
        if (updatedStatus && updatedStatus === FAILURE && context.res) {
            // eslint-disable-next-line no-param-reassign
            context.res.statusCode = updatedStatusCode || 404;
        } else {
            context.res.statusCode = 200;
        }
    } catch (e) {
        if (context.res) {
            // eslint-disable-next-line no-param-reassign
            context.res.statusCode = 500;
        }
    }
}