import { logoutActionTypes } from './../../../actions/customer/auth/index';
import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import { accountBenefitType } from 'app/presentation/redux/actions/accountBenefits';
import { IAction, IReducer } from 'app/shared/interfaces/common';
import BaseReducer from '../../handlers/BaseReducer';
import { RESET_PROFILE } from 'app/presentation/redux/actions/customer/user';

const reducerHandler = new BaseReducer<
    {
        accountDefault: ListAccountBankModel;
        listAccount: ListAccountBankModel[];
    },
    any
>(accountBenefitType);

function extraProcess(state: IReducer<any>, action: IAction<any>) {
    if (action.type === logoutActionTypes.success || action.type === RESET_PROFILE) {
        return reducerHandler.initialState;
    }
    return state;
}
reducerHandler.extraProcess = extraProcess;

export default reducerHandler;
