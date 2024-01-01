import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';
import { ITransactionRepository } from 'app/domain/customer/transaction';

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

export default class TransactionRepository implements ITransactionRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    postRequestDisbursement = (data: {
        accountBankCustomerId: string,
        contractId: string,
        disbursementAmount: number | string,
        amountToPayPeriodical: number | string,
    }) => {
        const resource = AppResource.Common.PostRequestDisbursement();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });

        return apiGateway.execute();
    };

}
