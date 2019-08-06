import { combineReducers } from 'redux';

import { viewstate } from './viewstate';

const combinedReducers = combineReducers({  
  viewstate,
});

export default combinedReducers;