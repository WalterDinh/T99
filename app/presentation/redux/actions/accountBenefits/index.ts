import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import { ParamsGetAccountBenefit } from 'app/presentation/modules/BeneficiaryInformation/BeneficiaryInformation';
import { IAction, IActionParams } from 'app/shared/interfaces/common';
import { createListViewActionTypes } from '../helper';

export const accountBenefitType = 'ACCOUNT_BENEFIT';
export const accountBenefitActionsTypes = createListViewActionTypes(
    accountBenefitType,
);

export const getAccountBenefitRequest = (
): IAction<ParamsGetAccountBenefit> => ({
    type: accountBenefitActionsTypes.start,
});

export const getAccountBenefitSuccess = (payload: { accountDefault: {}, listAccount: ListAccountBankModel[]},  params: IActionParams): IAction<any> => ({
    type: accountBenefitActionsTypes.success,
    payload,
    params
});

export const getAccountBenefitFailed = (error: any): IAction<any> => ({
    error,
    type: accountBenefitActionsTypes.failed,
});

export const refreshAccountBenefitList = (): IAction<any> => {
    return {
        type: accountBenefitActionsTypes.refresh,
    };
};