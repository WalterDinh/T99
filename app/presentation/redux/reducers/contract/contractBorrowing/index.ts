import { logoutActionTypes } from './../../../actions/customer/auth/index';
import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import {IAction, IReducer} from 'app/shared/interfaces/common';
import {contractBorrowingType } from '../../../actions/contractBorrowing';
import BaseNormalListReducer from '../../handlers/BaseNormalListReducer';
import { RESET_PROFILE } from 'app/presentation/redux/actions/customer/user';

const reducerHandler = new BaseNormalListReducer<ContractBorrowingModel[], any>(contractBorrowingType);

function extraProcess(state: IReducer<any>, action: IAction<any>) {
    if (action.type === logoutActionTypes.success || action.type === RESET_PROFILE) {
        return reducerHandler.initialState;
    }
    return state;
}
reducerHandler.extraProcess = extraProcess;

export default reducerHandler;