import { IAction } from 'app/shared/interfaces/common';
import AppManager, { AppMode } from 'app/shared/managers/AppManager';
import { changeAppModeActionTypes } from '../../actions/container';
import { logoutActionTypes } from '../../actions/customer/auth';

interface IContainerData {
    actionType: string;
    data: IDataContainer;
}

interface IDataContainer {
    appMode: AppMode
}

const initialState: IContainerData = {
    actionType: '',
    data: { appMode: 'unknown' },
};

export default function (state = initialState, action: IAction<any>) {
    if (action.type === logoutActionTypes.success) {
        AppManager.appMode.next('unknown');
        return initialState;
    }

    if (action.type === changeAppModeActionTypes.success) {
        const mode: AppMode = action.payload;
        if (mode) {
            AppManager.appMode.next(mode);
        } else {
            AppManager.appMode.next('unknown');
        }

        return {
            ...state,
            actionType: action.type,
            data: { ...state.data, appMode: mode }
        }
    }

    return state;
}