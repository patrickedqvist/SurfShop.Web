import { combineReducers } from 'redux'

import { viewstate } from './viewstate'
import { cart } from './cart'
import { products } from './products'
import { pages } from './pages'

const combinedReducers = combineReducers({
  cart,
  products,
  pages,
  viewstate,
})

export default combinedReducers
