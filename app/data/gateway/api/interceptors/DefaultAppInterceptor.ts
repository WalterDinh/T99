import Config from 'app/config/config';
import ResponseModel from 'app/models/common/ResponseModel';
import { getString } from 'app/presentation/localization';
import { StatusToast } from 'app/shared/constants';
import { EventActions } from 'app/shared/helper/EventEmitter';
import LoadingManager from 'app/shared/helper/LoadingManager';
import {IResource} from 'app/shared/interfaces/common/resource';
import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-toast-message';
import Interceptor from './interceptor';
export default class DefaultInterceptor extends Interceptor {
    constructor(setting: Config, resource: IResource) {
        super(setting, resource);
    }

    /**
     * @param {AxiosRequestConfig} config
     * @param {IResource} resourceType
     * @return {AxiosRequestConfig}
     */
    requestFulfilled = (config: AxiosRequestConfig) => {
        return config;
    };

    requestReject = (error: any) => {
        return Promise.reject(error);
    };

    responseFulfilled = (response: AxiosResponse) => {        
        const {data} = response;
        return ResponseModel.createSuccess(data);
    };

    responseReject = (error: AxiosError<any, any>) => {
        let status = 0;
        let code = '';
        let message = '';
        let rawError;
        if (error.response) {
            status = error.response.status;
            console.info('DefaultInterceptorReject', error.response.status);
            console.info('DefaultInterceptorReject', error.response.data);
            console.info('DefaultInterceptorReject', error.response.config);
            if(error.response?.status==401){
                DeviceEventEmitter.emit(EventActions.logout);
                // Toast.show({
                //     type: StatusToast.Warning,
                //     text2: 'Phiên đăng nhập hết hạn',
                // });
                LoadingManager.setLoading(false);
            }
            const data = error.response.data ? error.response.data : undefined;
            const { statusCode, message: _message, code: _code, } = data || {};
            // server was received message, but response smt
            status = !(status >= 200 && status < 300) ? status : statusCode;
            code = _code;
            message = _message || error?.response?.data?.errorMessage;
            rawError = data;
        } else {
            console.warn('smt went wrong: ', error);
            // smt went wrong
            status = 500;
            message = error.message;
        }

        return Promise.reject(ResponseModel.createError(status, message, code, rawError));
    };
}


