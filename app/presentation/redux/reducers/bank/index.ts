import { combineReducers } from 'redux';
import AccountBenefitReducer from './accountBenefits';

export const accountBenefitReducer = combineReducers({
    accountBenefitReducer: AccountBenefitReducer.reducer,
});
