import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import { contractInteresDucationType } from 'app/presentation/redux/actions/contractInterestDuration/contractInteresDucation';
import {IAction, IReducer} from 'app/shared/interfaces/common';
import {contractBorrowingType } from '../../../actions/contractBorrowing';
import BaseNormalListReducer from '../../handlers/BaseNormalListReducer';

const reducerHandler = new BaseNormalListReducer<ContractBorrowingModel[], any>(contractInteresDucationType);

function extraProcess(state: IReducer<any>, action: IAction<any>) {
    return state;
}
reducerHandler.extraProcess = extraProcess;

export default reducerHandler;