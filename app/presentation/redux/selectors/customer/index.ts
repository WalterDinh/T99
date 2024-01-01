import { createSelector } from 'reselect';

const selectCustomerReducer = createSelector(
    (state: any) => state.customerReducer,
    (customerReducer) => customerReducer,
);
const selectUserReducer = createSelector(
    (state: any) => selectCustomerReducer(state),
    (customerReducer) => customerReducer.userReducer,
);
const selectProfileReducer = createSelector(
    (state: any) => selectUserReducer(state),
    (userReducer) => userReducer.profileReducer,
);

const selectUpdateProfileReducer = createSelector(
    (state: any) => selectUserReducer(state),
    (userReducer) => userReducer.updateProfileReducer,
);

const selectVerifyUserDataReducer = createSelector(
    (state: any) => selectUserReducer(state),
    (userReducer) => userReducer.userDataReducer,
);

export default {
    selectCustomerReducer,
    selectProfileReducer,
    selectUpdateProfileReducer,
    selectVerifyUserDataReducer,
    selectUserReducer
};
