import {ActionStatus} from '../../constants';

export interface IDictionary<T> {
    [key: string]: T;
}

export interface IDataList<T> {
    byId: {
        [key: string]: T
    };
    ids: string[];
}

export interface IActionParams {
    sectionId?: string;
    isAppend?: boolean;
    canLoadMore?: boolean;
    refresh?: boolean;

    [key: string]: any;
}

export interface IAction<T> {
    type: string;
    payload?: T;
    error?: any;
    params?: IActionParams;

    [key: string]: any;
}

export interface IReducer<T> {
    isFetching: boolean;
    status: ActionStatus;
    data?: T;
    canLoadMore?: boolean;
    params?: any;
    errorMessage?: string;
    error?: any;
    actionType: string;
    success: boolean;
}

export interface ISectionData<T> {
    [key: string]: T;
}

export interface IErrorState {
    errorMessage?: string;
    shouldShowMessage: boolean;
    error?: any;
}

export interface ISuccessState {
    successMessage?: string;
    shouldShowMessage?: boolean;
}
