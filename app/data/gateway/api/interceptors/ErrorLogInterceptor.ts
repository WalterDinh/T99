import { StatusToast } from 'app/shared/constants';
import { EventActions } from 'app/shared/helper/EventEmitter';
import LoadingManager from 'app/shared/helper/LoadingManager';
import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import qs from 'query-string';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-toast-message';
export class ErrorLogInterceptor {
    _config?: AxiosRequestConfig;
    request = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        this._config = config;
        return config;
    };
    onFulfilled = async (response: AxiosResponse<any>): Promise<AxiosResponse> => response;
    onRejected = async (error: AxiosError): Promise<AxiosError> => {        
        try {
            if(error.response?.status===401){
                DeviceEventEmitter.emit(EventActions.logout);
                LoadingManager.setLoading(false);
                // Toast.show({
                //     type: StatusToast.Warning,
                //     text2: 'Phiên đăng nhập hết hạn',
                // });
            }
            const config = error.config;
            console.log(`Request URL: ${JSON.stringify(config.url)}`);
            if(config.params) {
                console.log(`Paramenters: ${JSON.stringify(config.params)}`);
            }
            if (config.data) {
                console.log(`Request Body: ${JSON.stringify(config.data)}`);
            }
            if(this._config?.headers) {
                console.log(`Request Headers: ${JSON.stringify(this._config.headers)}`);
            }
            if(error.response?.headers) {
                console.log(`Response Headers: ${JSON.stringify(error.response?.headers)}`);
            }
            if (error.response?.data) {
                console.log(`Response Payload: ${JSON.stringify(error.response?.data)}`);
            }
            const urlParse = qs.parseUrl(config.url ?? '');
            // CrashlyticsHelper.recordError(error, urlParse.url.replace('https://', '').replace('http://', '').replace(/[/]/g, ' '));
        } catch (_error) {
            console.info(_error);
        }
        return Promise.reject(error);
    }
}









