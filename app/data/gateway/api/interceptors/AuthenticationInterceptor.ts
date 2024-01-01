import { ApiType } from 'app/data/gateway/api/type';
import { ICustomerRepository } from 'app/domain/customer';
import { IResource } from 'app/shared/interfaces/common/resource';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'query-string';
import Config from '../../../../config/config';
import Interceptor from './interceptor';

export default class AuthenticationInterceptor extends Interceptor {
    _userRepository: ICustomerRepository;

    constructor(
        setting: Config,
        resource: IResource,
        userRepository: ICustomerRepository,
    ) {
        super(setting, resource);

        this._userRepository = userRepository;
    }

    getTokenFromType = (type: ApiType): string => {
        switch (type) {
            case ApiType.Common:
                const resp = this._userRepository.getSessionCustomerToken();
                return resp.data![0] ?? '';
            default:
                return '';
        }
    };

    getTokenType = (): string => {
        const resp = this._userRepository.getSessionCustomerToken();                
        return resp.data![2] ?? '';
    };

    /**
     * @param {AxiosRequestConfig} config
     * @param {IResource} resourceType
     * @return {AxiosRequestConfig}
     */
    requestFulfilled = (config: AxiosRequestConfig) => {
        let authHeader;
        const token = this.getTokenFromType(this.resource.Type);
        const tokenType = this.getTokenType();
 
        if (token) {
            authHeader = `${tokenType || 'Bearer'} ${token}`;
        }

        if (!config.headers) {
            config.headers = {};
        }

        const contentType = config.headers['Content-Type'];
        if (contentType === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data);
        }

        if (authHeader) {
            config.headers.Authorization = authHeader;
        }
        return config;
    };

    requestReject = (error: any) => {
        return Promise.reject(error);
    };

    responseFulfilled = (response: AxiosResponse) => response;

    responseReject = (error: AxiosError) => Promise.reject(error);
}
