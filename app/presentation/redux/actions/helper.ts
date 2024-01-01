import {
    ACTION_PREFIX,
    REFRESH_ACTION_PREFIX,
    LOADMORE_ACTION_PREFIX,
    SUCCESS_ACTION_SUFFIX,
    FAILED_ACTION_SUFFIX
} from '../../../shared/constants';

interface IActionType {
    start: string;
    success: string;
    failed: string;
}

interface IListViewActionType extends IActionType {
    refresh: string;
    loadMore: string;
}

export const createActionTypes = (actionType: string): IActionType => {
    return {
        start: `${ACTION_PREFIX}_${actionType}`,
        success: `${actionType}_${SUCCESS_ACTION_SUFFIX}`,
        failed: `${actionType}_${FAILED_ACTION_SUFFIX}`
    };
};

export const createListViewActionTypes = (actionType: string): IListViewActionType => {
    return {
        ...createActionTypes(actionType),
        refresh: `${REFRESH_ACTION_PREFIX}_${actionType}`,
        loadMore: `${LOADMORE_ACTION_PREFIX}_${actionType}`
    };
};
