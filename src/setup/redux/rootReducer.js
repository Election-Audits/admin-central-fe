import {combineReducers} from 'redux'

import {PresidentialSlice} from "../..pages/presidental/redux";


export const rootReducer = combineReducers({
    auth: PresidentialSlice.reducer,
  
});