import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';
import { StorageGatewayFactory } from 'app/data/gateway/storage';
import { IAuthRepository } from 'app/domain/auth';
import ResponseModel from 'app/models/common/ResponseModel';
import LoginModel from 'app/models/user/LoginModel';
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
    tokenType: '',
};

export interface IResendedVerify {
    [key: string]: boolean;
}
export interface IResCheckAuth {
    auth0Id: string;
}

export type AuthType = 'apple' | 'google' | 'facebook' | 'phone';

export default class AuthRepository implements IAuthRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    loginApp = async (data: {
        username: string;
        password: string;
        client_id: 'Mobile_App';
        grant_type: 'password';
    }) => {
        const resource = AppResource.Common.LoginApp();
        const baseURL = `${getConfig().identityEndPoint}${resource.Type}`;
        let formBody: any = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(
                data[property as keyof typeof data],
            );
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        const apiGateway = new ApiGateway({
            baseURL: baseURL,
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
            },
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: formBody,
            resource,
        });

        return apiGateway
            .execute()
            .then((response: ResponseModel<LoginModel>) => {
                if (response.status === 200) {
                    const responseData = LoginModel.parseFromJson(
                        response.data,
                    );
                    this.setDataLogin(data.username, data.password);
                    this.setCustomerToken(
                        responseData.accessToken,
                        responseData.refreshToken,
                        responseData.tokenType,
                    );
                }
                return response;
            })
            .catch((error) => {
                throw error;
            });
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
        ]).then((responses) => {
            const customerToken = responses[0].data;
            const refreshToken = responses[1].data;
            SessionStorage.customerToken = customerToken;
            SessionStorage.refreshToken = refreshToken;
            return ResponseModel.createSuccess([customerToken, refreshToken]);
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
            await storageClient.doUpdate(
                TokenType.CustomerRefreshToken,
                refreshToken,
            );
        }
        return storageClient.doUpdate(TokenType.Customer, token || '');
    };

    setDataLogin = async (phone: string, password: string) => {        
        const storageClient = StorageGatewayFactory.createWithSecureClient();
            await storageClient.doUpdate(User.PhoneNumber, phone);
            await storageClient.doUpdate(User.Password, password);
    };
}
