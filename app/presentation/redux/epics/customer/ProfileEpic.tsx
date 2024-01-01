import CustomerRepository from 'app/data/repository/customer';

import LogoutUseCase from 'app/domain/customer/auth/LogoutUseCase';
import { GetProfileUseCase } from 'app/domain/customer/customer/GetProfileUseCase';

import {
    getProfileActionTypes,
    getProfileSuccess,
    getProfileFailed,
} from 'app/presentation/redux/actions/customer/user';
import { IAction } from 'app/shared/interfaces/common';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

export const getProfileCustomerEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType(getProfileActionTypes.start),
        exhaustMap((action: IAction<any>) =>
            from(
                new GetProfileUseCase(new CustomerRepository()).execute(),
            ).pipe(
                map((response) => {
                    if (!!response?.data && response?.status == 200) {
                        return getProfileSuccess(response?.data);
                    }
                    return getProfileFailed(response?.data);
                }),
                catchError((error) => of(getProfileFailed({ error }))),
            ),
        ),
    );
