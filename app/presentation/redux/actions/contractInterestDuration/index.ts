import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import { ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import { IAction, IActionParams } from 'app/shared/interfaces/common';
import { createListViewActionTypes } from '../helper';
import { ItemContractInterestDucation } from './contractInteresDucation';

export const contractBorrowingType = 'CONTRACT_BORROWING';
export const contractBorrowingActionsTypes = createListViewActionTypes(
    contractBorrowingType,
);

export const getContractInterestDurationRequest = (
    body: ItemContractInterestDucation,
): IAction<ParamsGetContractBorrowing> => ({
    type: contractBorrowingActionsTypes.start,
    body,
});

export const getContractBorrowingSuccess = (body: ItemContractInterestDucation): IAction<any> => ({
    type: contractBorrowingActionsTypes.success,
    body,
});

