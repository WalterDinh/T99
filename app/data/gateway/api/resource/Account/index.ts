import {ApiType} from 'app/data/gateway/api/type';
import {IResource} from 'app/shared/interfaces/common/resource';
import {getApiController} from '../ResourceController';

const MyProfile = (): IResource => ({
    Type: ApiType.Account,
    Path: `${getApiController()}/my-profile`,
});

const ChangePassword = (): IResource => ({
    Type: ApiType.Account,
    Path: `${getApiController()}/my-profile/change-password`,
});

const RegisterAccount = (): IResource => ({
    Type: ApiType.Account,
    Path: `${getApiController()}/register`,
});

const SendPasswordResetCode = (): IResource => ({
    Type: ApiType.Account,
    Path: `${getApiController()}/send-password-reset-code`,
});

const ResetPassword= (): IResource => ({
    Type: ApiType.Account,
    Path: `${getApiController()}/reset-password`,
});

export default {
    MyProfile,
    ChangePassword,
    RegisterAccount,
    SendPasswordResetCode,
    ResetPassword
};
