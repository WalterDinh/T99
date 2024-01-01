import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';
import { IAction } from 'app/shared/interfaces/common';

import UserModel from '../../../../../models/user/UserModel';
import { createActionTypes } from '../../helper';

export const RESET_PROFILE = 'RESET_PROFILE';

export const getProfileType = 'GET_PROFILE';
export const getProfileActionTypes = createActionTypes(getProfileType);

export const updateProfileType = 'UPDATE_PROFILE';
export const updateProfileActionTypes = createActionTypes(updateProfileType);

export const updateAvatarType = 'UPDATE_AVATAR';
export const updateAvatarActionTypes = createActionTypes(updateAvatarType);

export const changePasswordType = 'CHANGE_PASSWORD';
export const changePasswordActionTypes = createActionTypes(changePasswordType);

export const getUserDataType = 'GET_USER_DATA';
export const getUserDataActionTypes = createActionTypes(getUserDataType);

export const getProfile = (): IAction<any> => ({
    type: getProfileActionTypes.start,
});

export const getProfileSuccess = (payload: UserModel): IAction<UserModel> => ({
    payload,
    type: getProfileActionTypes.success,
});

export const getProfileFailed = (error: any): IAction<any> => ({
    error,
    type: getProfileActionTypes.failed,
});

export const updateProfile = (action?: string): IAction<any> => ({
    type: updateProfileActionTypes.start,
    payload: action,
});

export const updateProfileSuccess = (
    payload: UserModel | undefined,
    action?: string,
): IAction<UserModel> => ({
    payload,
    type: updateProfileActionTypes.success,
    action,
});

export const updateProfileFailed = (error: any): IAction<any> => ({
    error,
    type: updateProfileActionTypes.failed,
});

export const resetProfile = (): IAction<any> => ({
    type: RESET_PROFILE,
});

export const changePassword = (newPass: string): IAction<string> => ({
    type: changePasswordActionTypes.start,
    payload: newPass,
});

export const changePasswordSuccess = (): IAction<any> => ({
    type: changePasswordActionTypes.success,
});

export const changePasswordFailed = (error: any): IAction<any> => ({
    type: changePasswordActionTypes.failed,
    error,
});

export const getUserDataRequest = (): IAction<string> => ({
    type: getUserDataActionTypes.start,
});

export const getUserDataSuccess = (data: VerifyUserEkycDataModel): IAction<any> => ({
    type: getUserDataActionTypes.success,
    payload: data,
});

export const getUserDataFailed = (error: any): IAction<any> => ({
    type: getUserDataActionTypes.failed,
    error,
});
