import { createSelector } from 'reselect';

const selectLoanContractOnlineReducer = createSelector(
    (state: any) => state.loanReducer,
    loanReducer => loanReducer,
);

const selectLoanContractOfflineReducer = createSelector(
    (state: any) => state.loanReducer,
    loanReducer => loanReducer,
);



export default {
    selectLoanContractOfflineReducer,
    selectLoanContractOnlineReducer
}