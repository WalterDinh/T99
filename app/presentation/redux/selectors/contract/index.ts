import { createSelector } from 'reselect';

const selectBorrowingContractReducer = createSelector(
    (state: any) => state.contractReducer,
    contractReducer => contractReducer,
);


export default {
    selectBorrowingContractReducer,
}