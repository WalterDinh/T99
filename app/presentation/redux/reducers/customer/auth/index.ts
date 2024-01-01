import {combineReducers} from 'redux';
import forgotPasswordReducer from './ForgotPasswordReducer';


export const authReducer = combineReducers({
    forgotPasswordReducer: forgotPasswordReducer.reducer,
});
