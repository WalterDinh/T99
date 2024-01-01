import UserModel from 'app/models/user/UserModel';
import {logoutActionTypes} from 'app/presentation/redux/actions/customer/auth';
import {IAction, IReducer} from 'app/shared/interfaces/common';
import {getProfileType, RESET_PROFILE} from '../../../../actions/customer/user';
import BaseReducer from '../../../handlers/BaseReducer';

const reducerHandler = new BaseReducer<UserModel, any>(getProfileType);

function extraProcess(state: IReducer<any>, action: IAction<any>) {    
    if (action.type === logoutActionTypes.success || action.type === RESET_PROFILE) {
        return reducerHandler.initialState;
    }
    return state;
}

reducerHandler.extraProcess = extraProcess;

export default reducerHandler;
