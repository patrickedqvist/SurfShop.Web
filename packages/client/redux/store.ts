import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import createWaitForMiddleware from 'redux-wait-for-ssr'

// Redux setup
import sagas from '../redux/sagas'
import reducers from '../redux/reducers'


export const initializeStore = (initialState: Object = {}, options?: object) => {

  const sagaMiddleware = createSagaMiddleware();
  const waitForMiddleware = createWaitForMiddleware().middleware;
  const middlewares = [sagaMiddleware, waitForMiddleware];

  const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);

  return store;
}