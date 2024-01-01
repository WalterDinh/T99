import {ActionStatus} from '../../../../shared/constants';
import {IAction, IDictionary, IReducer} from '../../../../shared/interfaces/common';
import BaseReducer from './BaseReducer';

export default class BaseSectionListReducer<State extends IDictionary<any>, Action extends any[]> extends BaseReducer<IDictionary<State>, Action> {

    constructor(actionType: string,
        initialState?: IReducer<State>,
        extraProcess?: (state: IReducer<IDictionary<State>>, action: IAction<Action[]>) => IReducer<IDictionary<State>>,
        customProcess?: (state: IReducer<IDictionary<State>>, action: IAction<Action[]>) => IReducer<IDictionary<State>>) {
        super(actionType, initialState, extraProcess, customProcess);
        // @ts-ignore
        this.initialState = initialState ?? {
            isFetching: false,
            params: undefined,
            data: undefined,
            error: undefined,
            errorMessage: undefined,
            success: false,
            actionType: '',
            canLoadMore: {},
            status: ActionStatus.None
        };
    }

    convertActionDataToReducer = (data?: Action[]): State | undefined => {
        return data as unknown as State;
    };

    processSuccess = (state: IReducer<IDictionary<State>>, action: IAction<Action[]>): IReducer<IDictionary<State>> => {
        const newData = state.data ? {...state.data} : {};
        const payload = action.payload!;
        const isAppend = action.params?.isAppend ?? false;
        const sectionId = action.params?.sectionId ?? 'default';
        let dataList = newData[sectionId] ?? [];
        if(isAppend) {
            dataList = dataList.concat(this.convertActionDataToReducer(payload)!);
        } else {
            dataList = this.convertActionDataToReducer(payload)!;
        }
        newData[sectionId] = dataList;

        const canLoadMore = state.canLoadMore ?? {};

        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: newData,
            errorMessage: undefined,
            success: true,
            actionType: action.type,
            // @ts-ignore
            canLoadMore: {
                ...canLoadMore,
                [sectionId]: action.params ? !!action.params.canLoadMore : true
            }
        };
    };
}
