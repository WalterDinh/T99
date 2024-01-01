import { combineReducers } from 'redux';

import PaymentsReducer from './PaymentsReducer';

export const paymentsReducer = combineReducers({
    paymentsReducer: PaymentsReducer,
});
