import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';

import { StorageGatewayFactory } from 'app/data/gateway/storage';
import { ICustomerRepository } from 'app/domain/customer';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';
import LoginModel from 'app/models/user/LoginModel';
import UserModel from 'app/models/user/UserModel';
import VerificationIncomeModel from 'app/models/Verification/VerificationIncomeModel';
import { TokenType, User } from 'app/shared/constants';
import axios, { AxiosInstance } from 'axios';

export interface ISessionStorage {
    customerToken?: string;
    refreshToken?: string;
    tokenType?: string;
}

/**
 * Always store token in session storage for faster retrieve
 * @type {{customerToken: string}}
 */
export const SessionStorage: ISessionStorage = {
    customerToken: '',
    refreshToken: '',
    tokenType: '',
};

export interface IResendedVerify {
    [key: string]: boolean;
}
export interface IResCheckAuth {
    auth0Id: string;
}

export type AuthType = 'apple' | 'google' | 'facebook' | 'email';

export default class CustomerRepository implements ICustomerRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    setUser = (user: any): Promise<ResponseModel<boolean>> => {
        return StorageGatewayFactory.createWithSecureClient().doUpdateJson(
            User.Key,
            user,
        );
    };

    removeUser = () => {
        return StorageGatewayFactory.createWithSecureClient().doDelete(
            User.Key,
        );
    };

    getUser = (): Promise<ResponseModel<UserModel>> => {
        return StorageGatewayFactory.createWithSecureClient()
            .doGetJson(User.Key)
            .then((response) => {
                return ResponseModel.createSuccess(response.data ?? null);
            });
    };

    removeToken = () => {
        SessionStorage.customerToken = '';
        SessionStorage.refreshToken = '';
        SessionStorage.tokenType = '';

        const storageClient = StorageGatewayFactory.createWithSecureClient();
        return Promise.all([
            storageClient.doDelete(TokenType.Customer),
            storageClient.doDelete(TokenType.CustomerRefreshToken),
            storageClient.doDelete(User.TokenType),
        ]);
    };

    getEkycStatus = (): Promise<
        ResponseModel<ResponseDataModel<VerifyUserEkycDataModel>>
    > => {
        const resource = AppResource.Customer.CustomerKycStatus();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };

    loginUser = (data: {
        username: string;
        password: string;
        client_id: 'Mobile_App';
        grant_type: 'password';
    }) => {
        const resource = AppResource.Common.LoginApp();
        // qs.stringify(data);
        const apiGateway = new ApiGateway({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    sendOTP = (data: { phoneNumber: string; otpType: number }) => {
        const resource = AppResource.Common.SendOtp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    checkOTP = (data: {
        phoneNumber: string;
        otpType: number;
        otpCode: number;
    }) => {
        const resource = AppResource.Common.CheckOtp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    forgotPassword = (data: {
        fullName: string;
        identityNumber: string;
        newPassWord: string;
        phoneNumber: string;
        reNewPassWord: string;
    }) => {
        const resource = AppResource.Common.ForgotPassword();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    changePassword = (data: {
        currentPassWord: string;
        newPassWord: string;
        reNewPassWord: string;
    }) => {
        const resource = AppResource.Common.ChangePassword();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    getProfile = async (): Promise<ResponseModel<UserModel>> => {
        const resource = AppResource.Common.GetProfile();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        const response = await apiGateway.execute();
        if (!response.data) return ResponseModel.createSuccess(new UserModel());
        response.data = UserModel.parseFromJson(response?.data?.data);
        return response;
    };
    refreshToken = async (): Promise<ResponseModel<LoginModel>> => {
        // const resource = AppResource.Customer.MembersAuth();
        // const tokenResponse = await this.getCustomerToken();
        // const refreshToken = tokenResponse.data?.[1];
        // if(refreshToken) {
        //     const apiGateway = new ApiGateway({
        //         configs: getConfig()!,
        //         axiosInstance: this.axiosInstance ?? axios.create(),
        //         method: 'POST',
        //         body: {
        //             refreshToken,
        //             grantType: 'refresh_token'
        //         },
        //         resource,
        //     });
        //     const response = await apiGateway.execute();
        //     const loginModel = LoginModel.parseFromMWJson(response.data);
        //     await this.setCustomerToken(loginModel!.token, loginModel!.refreshToken);
        //     return ResponseModel.createSuccess(loginModel);
        // }
        return Promise.reject(
            ResponseModel.createError(400, 'No refresh token stored'),
        );
    };

    logoutUser = (): Promise<ResponseModel<boolean>> => {
        return Promise.all([this.removeUser(), this.removeToken()])
            .then((responses) => {
                return ResponseModel.createSuccess(true);
            })
            .catch((error) => {
                return ResponseModel.createSuccess(false);
            });
    };
    getSessionCustomerToken = (): ResponseModel<string[]> => {
        return ResponseModel.createSuccess([
            SessionStorage.customerToken,
            SessionStorage.refreshToken,
            SessionStorage.tokenType,
        ]);
    };
    getCustomerToken = (): Promise<ResponseModel<string[]>> => {
        const storageClient = StorageGatewayFactory.createWithSecureClient();
        return Promise.all([
            storageClient.doGet(TokenType.Customer),
            storageClient.doGet(TokenType.CustomerRefreshToken),
            storageClient.doGet(User.TokenType),
        ]).then((responses) => {
            const customerToken = responses[0].data;
            const refreshToken = responses[1].data;
            const tokenType = responses[2].data;
            SessionStorage.customerToken = customerToken;
            SessionStorage.refreshToken = refreshToken;
            return ResponseModel.createSuccess([
                customerToken,
                refreshToken,
                tokenType,
            ]);
        });
    };
    setCustomerToken = async (
        token?: string,
        refreshToken?: string,
        tokenType?: string,
    ): Promise<ResponseModel<any>> => {
        SessionStorage.customerToken = token;
        SessionStorage.refreshToken = refreshToken;
        SessionStorage.tokenType = tokenType;

        const storageClient = StorageGatewayFactory.createWithSecureClient();
        if (refreshToken) {
            await storageClient.doUpdate(
                TokenType.CustomerRefreshToken,
                refreshToken,
            );
        }
        if (tokenType) {
            await storageClient.doUpdate(User.TokenType, tokenType);
        }
        return storageClient.doUpdate(TokenType.Customer, token || '');
    };

    setCustomerKyc = (data: FormData) => {
        const resource = AppResource.Common.CustomerKyc();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data,
            resource,
        });

        return apiGateway.execute();
    };
    registerApp = (data: any) => {
        const resource = AppResource.Common.RegisterApp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };
    registerVerificationApp = (data: any) => {
        const resource = AppResource.Common.RegisterVerificationApp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway
            .execute()
            .then((response) => {
                return response;
            })
            .catch((errr) => {
                return errr?.response?.data;
            });
    };
    verificationGolferApp = (data: any) => {
        const resource = AppResource.Common.VerificationGolferApp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            body: data,
            resource,
        });

        return apiGateway
            .execute()
            .then((response) => {
                return response;
            })
            .catch((errr) => {
                return errr?.response?.data;
            });
    };
    sendOtpUser = (data: any) => {
        const resource = AppResource.Common.SendOtpUser();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };
    checkOtpUser = (data: any) => {
        const resource = AppResource.Common.RegisterVerificationApp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };
    setPasswordUser = (data: any) => {
        const resource = AppResource.Common.SetPasswordUser();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };
    postVerificationIncome = (data: any) => {
        const resource = AppResource.Common.VerificationIncomeApp();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return apiGateway.execute();
    };
    getVerificationIncome = (): Promise<
        ResponseModel<VerificationIncomeModel>
    > => {
        const resource = AppResource.Common.GetVerificationIncome();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });
        return apiGateway.execute();
    };

    checkEkycByPhone = (data: { phoneNumber: string }) => {
        const resource = AppResource.Customer.CheckEkycByPhone();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: data,
            resource,
        });
        
        return apiGateway.execute();
    };
    postVerificationResidence = (data: any) => {
        const resource = AppResource.Common.PostVerificationResidence() ;
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };
    setDataLogin = async ({ username, password }: any) => {
        const storageClient = StorageGatewayFactory.createWithSecureClient();
        await storageClient.doUpdate(User.PhoneNumber, username);
        await storageClient.doUpdate(User.Password, password);
    };
}
    