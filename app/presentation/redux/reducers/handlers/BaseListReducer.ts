import { ActionStatus } from '../../../../shared/constants';
import { IAction, IReducer, IDataList } from '../../../../shared/interfaces/common';
import BaseReducer from './BaseReducer';

export default class BaseListReducer<State extends IDataList<State>, Action extends any[]> extends BaseReducer<IDataList<State>, Action> {

    constructor(actionType: string,
        initialState?: IReducer<IDataList<State>>,
        extraProcess?: (state: IReducer<IDataList<State>>, action: IAction<Action>) => IReducer<IDataList<State>>,
        customProcess?: (state: IReducer<IDataList<State>>, action: IAction<Action>) => IReducer<IDataList<State>>) {
        super(actionType, initialState, extraProcess, customProcess);
        this.initialState = initialState ?? {
            isFetching: false,
            params: undefined,
            data: {
                byId: {},
                ids: []
            },
            error: undefined,
            errorMessage: undefined,
            success: false,
            actionType: '',
            status: ActionStatus.None
        };
    }

    convertActionDataToReducer = (data?: Action): IDataList<State> | undefined => {
        const state: IDataList<State> = {
            ids: [],
            byId: {}
        };
        data?.forEach(item => {
            state.ids.push(item.id);
            state.byId[item.id] = item;
        });
        return state;
    };

    processSuccess = (state: IReducer<IDataList<State>>, action: IAction<Action>): IReducer<IDataList<State>> => {
        let newData: IDataList<State> | undefined = state.data ? { ...state.data } : undefined;
        const listData: IDataList<State> = newData ? newData : { byId: {}, ids: [] };
        const convertData = this.convertActionDataToReducer(action.payload);
        const isAppend = action.params?.isAppend ?? false;

        if (isAppend) {
            listData.ids = listData.ids.concat(convertData?.ids ?? []);
            listData.byId = {
                ...listData.byId,
                ...convertData?.byId
            };
        } else {
            listData.ids = convertData?.ids ?? [];
            listData.byId = convertData?.byId ?? {};
        }

        newData = listData;

        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: newData,
            errorMessage: undefined,
            success: true,
            actionType: action.type,
            canLoadMore: action.params ? !!action.params.canLoadMore : true
        };
    };
}
