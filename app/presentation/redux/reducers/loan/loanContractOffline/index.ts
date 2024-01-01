import LoanItemModel from 'app/models/loan/LoanItem';
import { IAction, IReducer } from 'app/shared/interfaces/common';
import { LoanContractOfflineType } from '../../../actions/loan';
import BaseNormalListReducer from '../../handlers/BaseNormalListReducer';

const reducerHandler = new BaseNormalListReducer<LoanItemModel[], any>(
    LoanContractOfflineType,
);

function extraProcess(state: IReducer<any>, action: IAction<any>) {
    return state;
}
reducerHandler.extraProcess = extraProcess;

export default reducerHandler;
