import {
    ActionStatus,
    ACTION_PREFIX,
    REFRESH_ACTION_PREFIX,
    LOADMORE_ACTION_PREFIX,
    FAILED_ACTION_SUFFIX,
    SUCCESS_ACTION_SUFFIX
} from '../../../../shared/constants';
import {IAction, IReducer} from '../../../../shared/interfaces/common';

export interface IBaseReducer<State, Action> {
    actionType: string;
    initialState: IReducer<State>;
    processFetching: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    processSuccess: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    processFailed: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    reducer: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    // Replace whole process of class
    customProcess?: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    // Run after process of class
    extraProcess?: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    convertActionDataToReducer: (data?: Action) => State | undefined;
}

export default class BaseReducer<State, Action> implements IBaseReducer<State, Action> {
    customProcess?: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    extraProcess?: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    initialState: IReducer<State>;
    actionType: string;

    constructor(actionType: string,
        initialState?: IReducer<State>,
        extraProcess?: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>,
        customProcess?: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>) {
        this.actionType = actionType;
        this.initialState = initialState ?? {
            isFetching: false,
            params: undefined,
            data: undefined,
            errorMessage: undefined,
            error: undefined,
            success: false,
            actionType: '',
            status: ActionStatus.None
        };
        this.customProcess = customProcess;
        this.extraProcess = extraProcess;
    }

    private process = (state = this.initialState, action: IAction<Action>): IReducer<State> => {
        if(this.customProcess) return this.customProcess(state, action);
        const actionType = action.type;
        if(actionType.includes(this.actionType)) {
            if(actionType.startsWith(ACTION_PREFIX) ||
                actionType.startsWith(REFRESH_ACTION_PREFIX) ||
                actionType.startsWith(LOADMORE_ACTION_PREFIX)) {
                return this.processFetching(state, action);
            }
            if(actionType.endsWith(SUCCESS_ACTION_SUFFIX)) {
                return this.processSuccess(state, action);
            }
            if(actionType.endsWith(FAILED_ACTION_SUFFIX)) {
                return this.processFailed(state, action);
            }
        }
        if(this.extraProcess) return this.extraProcess(state, action);
        return state;
    };

    convertActionDataToReducer = (data?: Action): State | undefined => {
        return data as unknown as State;
    };

    processFetching = (state: IReducer<State>, action: IAction<Action>): IReducer<State> => {
        return {
            ...state,
            status: action.params && action.params.refresh ? ActionStatus.Refreshing : ActionStatus.Fetching,
            isFetching: true,
            params: action.payload,
            errorMessage: undefined,
            success: false,
            actionType: action.type
        };
    };

    processFailed = (state: IReducer<State>, action: IAction<Action>): IReducer<State> => {
        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            errorMessage: action.error?.error?.toString(),
            error: action.error?.error,
            success: false,
            actionType: action.type
        };
    };

    processSuccess = (state: IReducer<State>, action: IAction<Action>): IReducer<State> => {
        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: this.convertActionDataToReducer(action.payload),
            errorMessage: undefined,
            success: true,
            actionType: action.type
        };
    };

    reducer = (state: IReducer<State>, action: IAction<Action>): IReducer<State> => {
        return this.process(state, action);
    };
}
