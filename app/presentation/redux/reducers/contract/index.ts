import { combineReducers } from 'redux';
import ContractBorrowingReducer from './contractBorrowing';

export const contractReducer = combineReducers({
    contractBorrowingReducer: ContractBorrowingReducer.reducer,
});
