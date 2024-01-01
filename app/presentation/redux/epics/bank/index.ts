import { combineEpics } from 'redux-observable';
import { accountBenefitEpics } from './accountBenefits';

export const bankEpic = combineEpics(
    accountBenefitEpics,
);
