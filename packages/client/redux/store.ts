import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

// Redux setup
import sagas from '../redux/sagas'
import reducers from '../redux/reducers'


export const initializeStore = (initialState: Object = {}, options?: object) => {

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(sagas);

  return store;
}