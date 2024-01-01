import {Interest} from 'app/models/common/Interest';
import {PlatformSettings} from 'app/models/common/PlatformSettings';
import {IAction} from '../../../../shared/interfaces/common';
import {createActionTypes} from '../helper';

export const changeLanguageType = 'CHANGE_LANGUAGE';
export const changeLanguageTypes = createActionTypes(changeLanguageType);

export const getInterestsType = 'GET_INTERESTS';
export const getInterestsActionTypes = createActionTypes(getInterestsType);

export const UPDATE_NETWORK_REQUEST = 'UPDATE_NETWORK_REQUEST';
export const UPDATE_NETWORK_RESPONSE = 'UPDATE_NETWORK_RESPONSE';

export const changeLanguage = (payload: any) => ({
    type: changeLanguageTypes.start,
    payload
});

export const changeLanguageSuccess = () => ({
    type: changeLanguageTypes.success
});

export const changeLanguageFailed = (error: any): IAction<any> => ({
    type: changeLanguageTypes.failed,
    error
});

export const updateNetworkRequest = (payload: any) => ({
    type: UPDATE_NETWORK_REQUEST,
    payload
});

export const updateNetworkResponse = (payload: any) => ({
    type: UPDATE_NETWORK_RESPONSE,
    payload
});

export const getInterests = () => ({
    type: getInterestsActionTypes.start,
});

export const getInterestsSuccess = (payload: Interest[]) => ({
    type: getInterestsActionTypes.success,
    payload
});

export const getInterestsFailed = (error: any): IAction<any> => ({
    type: getInterestsActionTypes.failed,
    error
});

export const updatePlatformSettings = (payload: PlatformSettings) => ({
    type: 'UPDATE_PLATFORM_SETTINGS',
    payload
});