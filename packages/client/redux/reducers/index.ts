import { combineReducers } from 'redux';

import { viewstate } from './viewstate';
import { cart } from './cart';

const combinedReducers = combineReducers({  
  cart,
  viewstate,
});

export default combinedReducers;