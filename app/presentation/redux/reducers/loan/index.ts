import { combineReducers } from 'redux';

import loanContractOfflineReducer from './loanContractOffline';
import loanContractOnlineReducer from './loanContractOnline';


export const loanReducer = combineReducers({
    loanContractOfflineReducer: loanContractOfflineReducer.reducer,
    loanContractOnlineReducer: loanContractOnlineReducer.reducer
});
