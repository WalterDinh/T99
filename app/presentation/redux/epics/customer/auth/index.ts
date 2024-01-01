import CustomerRepository from 'app/data/repository/customer';

import LogoutUseCase from 'app/domain/customer/auth/LogoutUseCase';

import {
 logoutActionTypes,
    logoutUserSuccess,
    logoutUserFailed
} from 'app/presentation/redux/actions/customer/auth';
import {IAction} from 'app/shared/interfaces/common';
import {ofType} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';


export const logoutCustomerEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType(logoutActionTypes.start),
        exhaustMap((action: IAction<any>) =>
            from(new LogoutUseCase(new CustomerRepository()).execute()).pipe(
                map((response) => logoutUserSuccess()),
                catchError(error => of(logoutUserFailed({error})))
            ))
    );

