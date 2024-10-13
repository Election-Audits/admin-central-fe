import {combineReducers} from 'redux'
import  presidentialCandidatesSlice from '../../pages/presidential/redux/PresidentialSlice'

export const rootReducer = combineReducers({
    auth: presidentialCandidatesSlice.reducer,
  
});