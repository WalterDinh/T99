import CustomerRepository from 'app/data/repository/customer';
import { IResource } from 'app/shared/interfaces/common/resource';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import 'react-native-get-random-values';
import Config from '../../../config/config';
import { ICustomerRepository } from 'app/domain/customer';
import { ErrorLogInterceptor } from './interceptors/ErrorLogInterceptor';
import AuthenticationInterceptor from './interceptors/AuthenticationInterceptor';
import RetryInterceptor from './interceptors/RetryInterceptor';
import Interceptor from './interceptors/interceptor';
import DefaultInterceptor from './interceptors/DefaultAppInterceptor';
import { ApiType } from './type';

export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

interface IConstructor {
    configs: Config;
    resource: IResource;
    headers?: Record<string, any>;
    timeout?: number;
    method: HTTPMethod;
    interceptors?: Interceptor[];
    body?: any;
    params?: any;
    axiosInstance: AxiosInstance;
    baseURL?: string;
    customerRepo?: ICustomerRepository;
    onSendProgress?: (progress: number, total: number) => void;
    onReceivedProgress?: (progress: number, total: number) => void;
}

class ApiGateway {
    configTimeout = 30000;
    _instanceAxios: AxiosInstance;
    configs: Config;
    requestConfig!: AxiosRequestConfig;
    endpoint: string;
    interceptors?: Interceptor[];
    headers?: Record<string, any>;
    resource: IResource;
    method: HTTPMethod;
    body?: any;
    params?: any;
    _errorLogInterceptor: ErrorLogInterceptor;
    customerRepo?: ICustomerRepository;

    onSendProgress?: (progress: number, total: number) => void;
    onReceivedProgress?: (progress: number, total: number) => void;

    constructor(data: IConstructor) {
        const {
            configs,
            resource,
            headers,
            timeout = 30 * 1000,
            method,
            body,
            params,
            onReceivedProgress,
            onSendProgress,
            axiosInstance,
            customerRepo,
            baseURL,
        } = data;
        this.configs = configs;
        this.resource = resource;
        this.headers = headers;
        this.configTimeout = timeout;
        this.method = method;
        this.body = body;
        this.params = params;
        this.onSendProgress = onSendProgress;
        this.onReceivedProgress = onReceivedProgress;
        this._errorLogInterceptor = new ErrorLogInterceptor();
        this._instanceAxios = axiosInstance;
        this.customerRepo = customerRepo;

        this.endpoint = this.getEndpoint(resource.Type);

        this._config();
        
    }

    private _config = () => {
        this.requestConfig = {
            baseURL: this.endpoint,
            timeout: this.configTimeout,
            headers: this.headers
                ? this.headers
                : {
                    'Accept': 'application/json',
	                'Content-Type': 'application/json; charset=utf-8'
                  },
            url: this.resource.Path,
            method: this.method,
            params: this.params,
            paramsSerializer: (params) =>
                qs.stringify(params, {
                    skipNulls: true,
                    arrayFormat: 'brackets',
                }),
            data: this.body,
        };
        
        if (this.onSendProgress) {
            this.requestConfig.onUploadProgress = ({
                loaded,
                total,
            }: {
                loaded: number;
                total: number;
            }) => this.onSendProgress!(loaded, total);
        }
        if (this.onReceivedProgress) {
            this.requestConfig.onDownloadProgress = ({
                loaded,
                total,
            }: {
                loaded: number;
                total: number;
            }) => this.onReceivedProgress!(loaded, total);
        }
        this._addInterceptors();
        this._addDefaultInterceptors();
    };

    private _addInterceptors = () => {
        if (this.interceptors) {
            this.interceptors.forEach((interceptor) => {
                this._instanceAxios.interceptors.request.use(
                    interceptor.requestFulfilled,
                    interceptor.requestReject,
                );
                this._instanceAxios.interceptors.response.use(
                    interceptor.responseFulfilled,
                    interceptor.responseReject,
                );
            });
        } else {
            const interceptor = new DefaultInterceptor(
                this.configs,
                this.resource,
            );
            this._instanceAxios.interceptors.request.use(
                interceptor.requestFulfilled,
                interceptor.requestReject,
            );
            this._instanceAxios.interceptors.response.use(
                interceptor.responseFulfilled,
                interceptor.responseReject,
            );
        }
    };

    private _addDefaultInterceptors = () => {
        const customerRepo =
            this.customerRepo ?? new CustomerRepository(this._instanceAxios);
        const authenticationInterceptor = new AuthenticationInterceptor(
            this.configs,
            this.resource,
            customerRepo,
        );
        this._instanceAxios.interceptors.request.use(
            authenticationInterceptor.requestFulfilled,
        );

        const retryInterceptor = new RetryInterceptor(
            this.configs,
            this.resource,
            this._instanceAxios,
            customerRepo,
        );

        this._instanceAxios.interceptors.response.use(
            this._errorLogInterceptor.onFulfilled,
            this._errorLogInterceptor.onRejected,
        );

        this._instanceAxios.interceptors.response.use(
            retryInterceptor.responseFulfilled,
            retryInterceptor.responseReject,
        );
    };

    getEndpoint = (resourceType: string) => {
        if (resourceType == ApiType.Connect) {
            return `${this.configs.identityEndPoint}${resourceType}`;
        }
        return `${this.configs.endPoint}${resourceType}`;
    };

    execute = (): Promise<any> =>
        this._instanceAxios.request(this.requestConfig);
}

export default ApiGateway;
