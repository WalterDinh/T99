import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import { ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import { IAction, IActionParams } from 'app/shared/interfaces/common';
import { createListViewActionTypes } from '../helper';

export const contractBorrowingType = 'CONTRACT_BORROWING';
export const contractBorrowingActionsTypes = createListViewActionTypes(
    contractBorrowingType,
);

export const getContractBorrowingRequest = (
    payload: ParamsGetContractBorrowing,
): IAction<ParamsGetContractBorrowing> => ({
    type: contractBorrowingActionsTypes.start,
    payload,
});

export const getContractBorrowingSuccess = (payload: ContractBorrowingModel[], params: IActionParams): IAction<any> => ({
    type: contractBorrowingActionsTypes.success,
    payload,
    params
});

export const getContractBorrowingFailed = (error: any): IAction<any> => ({
    error,
    type: contractBorrowingActionsTypes.failed,
});

export const refreshContractBorrowingList = (): IAction<any> => {
    return {
        type: contractBorrowingActionsTypes.refresh,
    };
};

export const loadMoreContractBorrowingList = (
    payload: ParamsGetContractBorrowing,
): IAction<ParamsGetContractBorrowing> => ({
    type: contractBorrowingActionsTypes.loadMore,
    payload,
});
