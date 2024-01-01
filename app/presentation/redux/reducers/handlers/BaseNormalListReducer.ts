import {ActionStatus} from '../../../../shared/constants';
import {IAction, IReducer} from '../../../../shared/interfaces/common';
import BaseReducer from './BaseReducer';

export default class BaseNormalListReducer<State extends any[], Action extends any[]> extends BaseReducer<State[], Action> {

    constructor(actionType: string,
        initialState?: IReducer<State[]>,
        extraProcess?: (state: IReducer<State[]>, action: IAction<Action[]>) => IReducer<State[]>,
        customProcess?: (state: IReducer<State[]>, action: IAction<Action[]>) => IReducer<State[]>) {
        super(actionType, initialState, extraProcess, customProcess);
        this.initialState = initialState ?? {
            isFetching: false,
            params: undefined,
            data: [],
            error: undefined,
            errorMessage: undefined,
            success: false,
            actionType: '',
            status: ActionStatus.None
        };
    }

    convertActionDataToReducer = (data?: Action[]): State[] | undefined => {
        return data as unknown as State[];
    };

    processSuccess = (state: IReducer<State[]>, action: IAction<Action[]>): IReducer<State[]> => {
        let newData = state.data && Array.isArray(state.data) ? [...state.data] : [];
        const payload = action.payload!;
        const isAppend = action.params?.isAppend ?? false;
        if(isAppend) {
            newData = newData.concat(this.convertActionDataToReducer(payload)!);
        } else {
            newData = this.convertActionDataToReducer(payload)!;
        }

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
