import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';
import { IAccountBankRepository } from 'app/domain/customer/accountbank';

import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import ListBankModel from 'app/models/AccountBank/ListBankModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
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

export default class AccountBankRepository implements IAccountBankRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }
    getListAccountBank = async (params: {
        accountBankCustomerType: number;
    }): Promise<
        ResponseModel<ResponseDataModel<ListAccountBankModel[]>>
    > => {
        const resource = AppResource.Common.AccountBank();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
            params: params,
        });

        return apiGateway.execute();
    };
    getListBank = async (): Promise<ResponseModel<ResponseDataModel<ListBankModel[]>>> => {
        const resource = AppResource.Common.BankCategory();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };

    addAccountBank = (data: {
        numberAccount: string;
        creatorText: string;
        bankCategoryId: string;
        isSetDefault: boolean;
    }) => {
        const resource = AppResource.Common.AddAccountBank();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    editAccountBank = (data: {
        id: string;
        numberAccount: string;
        creatorText: string;
        bankCategoryId: string;
        isSetDefault: boolean;
    }) => {
        const resource = AppResource.Common.EditAccountBank();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

    deleteAccountBank = (data: { accountBankCustomerId: string }) => {
        const resource = AppResource.Common.DeleteAccountBank();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'DELETE',
            params: data,
            resource,
        });

        return apiGateway.execute();
    };
}
