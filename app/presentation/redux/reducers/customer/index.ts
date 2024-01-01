import {combineReducers} from 'redux';

import {authReducer} from 'app/presentation/redux/reducers/customer/auth';
import {userReducer} from 'app/presentation/redux/reducers/customer/user';


export const customerReducer = combineReducers({
    authReducer,
    userReducer
});
