import {IAction} from 'app/shared/interfaces/common';
import {AppMode} from 'app/shared/managers/AppManager';
import {createActionTypes} from '../helper';

export const changeAppModeType = 'CHANGE_APP_MODE';
export const changeAppModeActionTypes = createActionTypes(changeAppModeType);

export const containerChangeAppMode = (payload: AppMode): IAction<AppMode> => ({
    type: changeAppModeActionTypes.success,
    payload
});