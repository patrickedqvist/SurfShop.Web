import { combineReducers } from 'redux'

import { viewstate } from './viewstate'
import { cart } from './cart'
import { products } from './products'
import { pages } from './pages'
import { search } from './search'

const combinedReducers = combineReducers({
  cart,
  products,
  pages,
  viewstate,
  search,
})

export default combinedReducers
