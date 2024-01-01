import {combineEpics} from 'redux-observable';
import {initAppEpic} from 'app/presentation/redux/epics/general/appInitiation';
import { customerEpic } from './customer';
import { contractEpic } from './contract';
import { loanContractEpic } from './loan';
import { bankEpic } from './bank';


export const rootEpic = combineEpics(
    initAppEpic,
    customerEpic,
    contractEpic,
    loanContractEpic,
    bankEpic,
);
