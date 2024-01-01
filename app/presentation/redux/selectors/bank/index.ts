import { createSelector } from 'reselect';

const selectAccountBenefitReducer = createSelector(
    (state: any) => state.accountBenefitReducer,
    accountBenefitReducer => accountBenefitReducer,
);


export default {
    selectAccountBenefitReducer,
}