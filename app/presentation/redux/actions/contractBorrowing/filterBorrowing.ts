import { IAction } from 'app/shared/interfaces/common';
import { createActionTypes } from '../helper';

export const filterBorrowingType = 'FILTER_BORROWING';
export const filterBorrowingTypeActionsTypes = createActionTypes(
    filterBorrowingType,
);

export type ItemContractBorrowingFilter = {
    ContractStatusType: number;
    AssetType: number;
    PageIndex: number;
    PageSize: number;
};

export const changeFilterBorrowing = (
    body: ItemContractBorrowingFilter,
): IAction<any> => ({
    type: filterBorrowingTypeActionsTypes.start,
    body,
});

