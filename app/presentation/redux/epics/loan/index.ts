import { combineEpics } from 'redux-observable';

import { loanContractOfflineEpics, loanContractOnlineEpics } from './loanContractList';

export const loanContractEpic = combineEpics(
    loanContractOfflineEpics,
    loanContractOnlineEpics
);
