import { combineEpics } from 'redux-observable';

import { contractBorrowingEpics } from './contractBorrowing';

export const contractEpic = combineEpics(
    contractBorrowingEpics,
);
