import { IAction } from 'app/shared/interfaces/common';
import { createActionTypes } from '../helper';

export const contractInteresDucationType = 'CONTRACT_INTERES_DUCATION';
export const contractInteresDucationActionsTypes = createActionTypes(
    contractInteresDucationType,
);

export type ItemContractInterestDucation = {
    contractId: string,
    newInterestRate: number,
    assetManagementFeeAmount: number,
    assetVerificationFeeAmount: number,
    insuranceFeeAmount: number,
    paymentAmount: number,
    note: string,
};

export const changeContractInterestDuration = (
    body: ItemContractInterestDucation,
): IAction<any> => ({
    type: contractInteresDucationActionsTypes.start,
    body,
});
