import { combineReducers } from 'redux';
import { customerReducer } from './customer';
import containerReducer from './container';
import { generalReducer } from './general/index';
import { paymentsReducer } from './payments';
import { contractReducer } from './contract';
import { loanReducer } from './loan';
import { accountBenefitReducer } from './bank';

export const appReducer = combineReducers({
    customerReducer,
    containerReducer,
    generalReducer,
    paymentsReducer,
    contractReducer,
    loanReducer,
    accountBenefitReducer,
});

export const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};
