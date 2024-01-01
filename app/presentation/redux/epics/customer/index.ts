import { combineEpics } from 'redux-observable';

import { logoutCustomerEpic } from './auth';
import { getProfileCustomerEpic } from './ProfileEpic';
import { getUserDataEpic } from './UserDataEpic';

getProfileCustomerEpic

export const customerEpic = combineEpics(
    logoutCustomerEpic,
    getProfileCustomerEpic,
    getUserDataEpic
);
