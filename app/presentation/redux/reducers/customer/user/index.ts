import {combineReducers} from 'redux';
import profileReducer from 'app/presentation/redux/reducers/customer/user/profile';
import userDataReducer from 'app/presentation/redux/reducers/customer/user/data';

export const userReducer = combineReducers({
    profileReducer: profileReducer.reducer,  
    userDataReducer: userDataReducer.reducer
});
