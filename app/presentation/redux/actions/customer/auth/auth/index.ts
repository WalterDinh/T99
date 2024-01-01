import {IAction} from 'app/shared/interfaces/common';
import { createActionTypes } from '../../../helper';

export const loginType = 'LOGIN_USER';
export const loginActionTypes = createActionTypes(loginType);

export const logoutType = 'LOGOUT_USER';
export const logoutActionTypes = createActionTypes(logoutType);

export const resetPasswordType = 'RESET_PASSWORD';
export const resetPasswordActionTypes = createActionTypes(resetPasswordType);

export const loginUserSuccess = (payload: string): IAction<string> => ({
    type: loginActionTypes.success,
    payload
});


export const loginUserFailed = (error: any): IAction<any> => ({
    type: loginActionTypes.failed,
    error
});

export const logoutUser = (): IAction<any> => ({
    type: logoutActionTypes.start
});

export const logoutUserSuccess = (): IAction<any> => ({
    type: logoutActionTypes.success
});

export const logoutUserFailed = (error: any): IAction<any> => ({
    error,
    type: logoutActionTypes.failed
});


export const resetPasswordUser = (payload: string): IAction<any> => ({
    type: resetPasswordActionTypes.start,
    payload
});

export const resetPasswordUserSuccess = (): IAction<any> => ({
    type: resetPasswordActionTypes.success,
});

export const resetPasswordUserFailed = (error: any): IAction<any> => ({
    error,
    type: resetPasswordActionTypes.failed
});

