import {IResource} from 'app/shared/interfaces/common/resource';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from '../../../../config/config';

export default abstract class Interceptor {
    setting: Config;
    resource: IResource;

    protected constructor(setting: Config, resource: IResource) {
        this.setting = setting;
        this.resource = resource;
    }

    abstract requestFulfilled(config: AxiosRequestConfig): AxiosRequestConfig;

    abstract requestReject(error: any): any;

    abstract responseFulfilled(response: AxiosResponse): any;

    abstract responseReject(error: any): Promise<any>;
}
