import CustomerRepository from 'app/data/repository/customer';

import { GetEkycUseCase } from 'app/domain/customer/customer/GetEkycStatusUseCase';
import {
    getUserDataActionTypes,
    getUserDataSuccess,
    getUserDataFailed,
} from 'app/presentation/redux/actions/customer/user';
import { IAction } from 'app/shared/interfaces/common';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

export const getUserDataEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType(getUserDataActionTypes.start),
        exhaustMap((action: IAction<any>) =>
            from(
                new GetEkycUseCase(new CustomerRepository()).execute(),
            ).pipe(
                map((response) => {
                    if (!!response?.data?.data && response?.data.httpStatusCode == 200) {
                        return getUserDataSuccess(response?.data?.data);
                    }
                    return getUserDataFailed(response?.data);
                }),
                catchError((error) => of(getUserDataFailed({ error }))),
            ),
        ),
    );
