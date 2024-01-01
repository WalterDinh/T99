import { createSelector } from 'reselect';

const selectGeneralReducer = createSelector(
    (state: any) => state.generalReducer,
    generalReducer => generalReducer
);

const selectLanguageReducer = createSelector(
    (state: any) => selectGeneralReducer(state),
    (generalReducer: any) => generalReducer.languageReducer
);

const selectPaymentReducer = createSelector(
    (state: any) => state.paymentsReducer,
    (paymentsReducer: any) => paymentsReducer
);

export const selectInitAppReducer = createSelector(
    (state: any) => selectGeneralReducer(state),
    generalReducer => generalReducer.initAppReducer
);
export default {
    selectGeneralReducer,
    selectLanguageReducer,
    selectPaymentReducer,
    selectInitAppReducer
};
