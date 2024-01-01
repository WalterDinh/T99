import Config from 'app/config/config';
import { ICustomerRepository } from 'app/domain/customer';
import { logoutUser } from 'app/presentation/redux/actions/customer/auth';
import { configureStore } from 'app/presentation/redux/store';
import { EventActions } from 'app/shared/helper/EventEmitter';
import { IResource } from 'app/shared/interfaces/common/resource';
import AppManager from 'app/shared/managers/AppManager';
import {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { DeviceEventEmitter } from 'react-native';
import Interceptor from './interceptor';

type RefreshTokenCallback = (token: string, refreshToken?: string) => void;

let isRefreshing = false;
let refreshSubscribers: RefreshTokenCallback[] = [];

export default class RetryInterceptor extends Interceptor {
    axiosInstance: AxiosInstance;
    customerRepo: ICustomerRepository;

    constructor(
        setting: Config,
        resource: IResource,
        axiosInstance: AxiosInstance,
        customerRepo: ICustomerRepository,
    ) {
        super(setting, resource);
        this.axiosInstance = axiosInstance;
        this.customerRepo = customerRepo;
    }

    requestFulfilled = (config: AxiosRequestConfig) => {
        return config;
    };

    requestReject = (error: any) => {
        return Promise.reject(error);
    };

    responseFulfilled = (response: AxiosResponse) => {
        return response;
    };

    responseReject = (error: AxiosError) => {
        let status = 0;
        if (error.response) {
            status = error.response.status;
            const originalRequest = error.config;
            if (status === 401) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    DeviceEventEmitter.emit(EventActions.logout);
                    // this.customerRepo.refreshToken()
                    //     .then(response => {
                    //         isRefreshing = false;
                    //         onRefreshed(response.data!.accessToken, response.data!.refreshToken);
                    //     });
                }

                const retryOrigReq = new Promise((resolve, reject) => {
                    const handler: RefreshTokenCallback = async (
                        token,
                        refreshToken,
                    ) => {
                        // replace the expired token and retry
                        if (!originalRequest.headers) {
                            originalRequest.headers = {};
                        }
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + token;
                        await this.customerRepo.setCustomerToken(
                            token,
                            refreshToken,
                        );
                        AppManager.refreshTokenSuccess.next(new Date());
                        resolve(this.axiosInstance.request(originalRequest));
                    };
                    subscribeTokenRefresh(handler);
                });
                return retryOrigReq;
            } else {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    };
}

const subscribeTokenRefresh = (cb: RefreshTokenCallback) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string, refreshToken?: string) => {
    refreshSubscribers.map((cb) => cb(token, refreshToken));
    refreshSubscribers = [];
};
