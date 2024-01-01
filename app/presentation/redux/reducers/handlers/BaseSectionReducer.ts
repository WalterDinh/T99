import {ActionStatus} from '../../../../shared/constants';
import {IAction, IDictionary, IReducer} from '../../../../shared/interfaces/common';
import BaseReducer from './BaseReducer';

export default class BaseSectionReducer<State extends IDictionary<any>, Action extends any> extends BaseReducer<IDictionary<State>, Action> {

    constructor(actionType: string,
        initialState?: IReducer<State>,
        extraProcess?: (state: IReducer<IDictionary<State>>, action: IAction<Action>) => IReducer<IDictionary<State>>,
        customProcess?: (state: IReducer<IDictionary<State>>, action: IAction<Action>) => IReducer<IDictionary<State>>) {
        super(actionType, initialState, extraProcess, customProcess);
        this.initialState = initialState ?? {
            isFetching: false,
            params: undefined,
            data: {},
            error: undefined,
            errorMessage: undefined,
            success: false,
            actionType: '',
            status: ActionStatus.None
        };
    }

    convertActionDataToReducer = (data?: Action): State | undefined => {
        return data as unknown as State;
    };

    processSuccess = (state: IReducer<IDictionary<State>>, action: IAction<Action>): IReducer<IDictionary<State>> => {
        const newData = state.data ? {...state.data} : {};
        const payload = action.payload!;
        const sectionId = action.params?.sectionId ?? 'default';
        newData[sectionId] = this.convertActionDataToReducer(payload)!;

        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: newData,
            errorMessage: undefined,
            success: true,
            actionType: action.type,
        };
    };
}
