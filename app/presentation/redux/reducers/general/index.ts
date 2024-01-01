import { combineReducers } from 'redux';

import languageReducer from './languages';
import initAppReducer from './InitAppReducer';


export const generalReducer = combineReducers({
    languageReducer: languageReducer.reducer,
    initAppReducer: initAppReducer.reducer
});
