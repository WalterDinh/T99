import { createSelector } from 'reselect';

const selectContainerReducer = createSelector(
    (state: any) => state.containerReducer,
    containerReducer => containerReducer,
);

const selectAppMode = createSelector(
    (state: {}) => selectContainerReducer(state),
    (containerReducer: { data: { appMode: any; }; }) => containerReducer.data.appMode,
);

export default {
    selectAppMode,
}