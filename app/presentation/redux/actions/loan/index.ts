import LoanItemModel from 'app/models/loan/LoanItem';
import { ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import { IAction, IActionParams } from 'app/shared/interfaces/common';
import { createListViewActionTypes } from '../helper';

export const LoanContractOnlineType = 'LOAN_CONTRACT_ONLINE_LIST';
export const LoanContractOnlineActionsTypes = createListViewActionTypes(
    LoanContractOnlineType,
);

export const LoanContractOfflineType = 'LOAN_CONTRACT_OFFLINE_LIST';
export const LoanContractOfflineActionsTypes = createListViewActionTypes(
    LoanContractOfflineType,
);

export const getLoanContractOnlineRequest =
    (): IAction<ParamsGetContractBorrowing> => ({
        type: LoanContractOnlineActionsTypes.start,
    });

export const getLoanContractOnlineSuccess = (
    payload: LoanItemModel[],
): IAction<any> => ({
    type: LoanContractOnlineActionsTypes.success,
    payload,
});

export const getLoanContractOnlineFailed = (error: any): IAction<any> => ({
    error,
    type: LoanContractOnlineActionsTypes.failed,
});

export const refreshLoanContractOnlineList = (): IAction<any> => {
    return {
        type: LoanContractOnlineActionsTypes.refresh,
    };
};

export const loadMoreLoanContractOnlineList = (): IAction<any> => ({
    type: LoanContractOnlineActionsTypes.loadMore,
});

export const getLoanContractOfflineRequest = (): IAction<any> => ({
    type: LoanContractOfflineActionsTypes.start,
});

export const getLoanContractOfflineSuccess = (
    payload: LoanItemModel[],
): IAction<any> => ({
    type: LoanContractOfflineActionsTypes.success,
    payload,
});

export const getLoanContractOfflineFailed = (error: any): IAction<any> => ({
    error,
    type: LoanContractOfflineActionsTypes.failed,
});

export const refreshLoanContractOfflineList = (): IAction<any> => {
    return {
        type: LoanContractOfflineActionsTypes.refresh,
    };
};

export const loadMoreLoanContractOfflineList =
    (): IAction<ParamsGetContractBorrowing> => ({
        type: LoanContractOfflineActionsTypes.loadMore,
    });
