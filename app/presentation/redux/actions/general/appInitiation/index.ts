import {IAction} from 'app/shared/interfaces/common';
import {createActionTypes} from '../../helper';

export const initAppType = 'INIT_APP';
export const initAppActionTypes = createActionTypes(initAppType);

export const initApplication = (): IAction<any> => ({
    type: initAppActionTypes.start
});

export const initApplicationSuccess = (payload?: any): IAction<any> => ({
    payload,
    type: initAppActionTypes.success
});

export const initApplicationFailed = (error: any): IAction<any> => ({
    error,
    type: initAppActionTypes.failed
});
