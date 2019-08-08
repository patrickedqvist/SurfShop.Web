import { combineReducers } from 'redux';

import { viewstate } from './viewstate';
import { cart } from './cart';
import { products } from './products';

const combinedReducers = combineReducers({  
  cart,
  viewstate,
  products
});

export default combinedReducers;