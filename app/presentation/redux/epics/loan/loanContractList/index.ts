import LoanRepository from 'app/data/repository/loan';
import { GetLoanListUseCase } from 'app/domain/customer/loan/\bGetListLoanUseCase';
import { getString } from 'app/presentation/localization';
import { ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import {
    LoanContractOnlineActionsTypes,
    getLoanContractOnlineSuccess,
    getLoanContractOnlineFailed,
    LoanContractOfflineActionsTypes,
    getLoanContractOfflineSuccess,
    getLoanContractOfflineFailed,
} from 'app/presentation/redux/actions/loan';
import { SignType, StatusToast } from 'app/shared/constants';
import { IAction } from 'app/shared/interfaces/common';
import Toast from 'react-native-toast-message';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

export const loanContractOnlineEpics = (action$: any, state$: any) =>
    action$.pipe(
        ofType(
            LoanContractOnlineActionsTypes.start,
            LoanContractOnlineActionsTypes.loadMore,
            LoanContractOnlineActionsTypes.refresh,
        ),
        exhaustMap(
            (action: IAction<ParamsGetContractBorrowing>) =>
                new Observable((obs) => {
                    const useCase = new GetLoanListUseCase(
                        new LoanRepository(),
                        SignType.Online,
                    );
                    useCase
                        .execute()
                        .then((res) => {
                            if (
                                res?.status === 200 &&
                                res?.data?.success &&
                                res?.data?.data
                            ) {
                                const results = res?.data?.data || [];
                                obs.next(getLoanContractOnlineSuccess(results));
                                obs.complete();
                            } else {
                                obs.next(
                                    getLoanContractOnlineFailed({
                                        error: getString([
                                            `errors.${res.data?.message}`,
                                            'errorMessageCommon',
                                        ]),
                                    }),
                                );

                                Toast.show({
                                    type: StatusToast.Error,
                                    text2: getString([
                                        `errors.${res.data?.message}`,
                                        'errorMessageCommon',
                                    ]),
                                });
                            }
                        })
                        .catch((error) => {
                            obs.next(
                                getLoanContractOnlineFailed({
                                    error: getString([
                                        `errors.${error?.message}`,
                                        'errorMessageCommon',
                                    ]),
                                }),
                            );
                        });
                }),
        ),
    );

export const loanContractOfflineEpics = (action$: any, state$: any) =>
    action$.pipe(
        ofType(
            LoanContractOfflineActionsTypes.start,
            LoanContractOfflineActionsTypes.loadMore,
            LoanContractOfflineActionsTypes.refresh,
        ),
        exhaustMap(
            (action: IAction<ParamsGetContractBorrowing>) =>
                new Observable((obs) => {
                    const useCase = new GetLoanListUseCase(
                        new LoanRepository(),
                        SignType.Offline,
                    );
                    useCase
                        .execute()
                        .then((res) => {
                            if (
                                res?.status === 200 &&
                                res?.data?.success &&
                                res?.data?.data
                            ) {
                                const results = res?.data?.data || [];
                                obs.next(
                                    getLoanContractOfflineSuccess(results),
                                );
                                obs.complete();
                            } else {
                                obs.next(
                                    getLoanContractOfflineFailed({
                                        error: getString([
                                            `errors.${res.data?.message}`,
                                            'errorMessageCommon',
                                        ]),
                                    }),
                                );

                                Toast.show({
                                    type: StatusToast.Error,
                                    text2: getString([
                                        `errors.${res.data?.message}`,
                                        'errorMessageCommon',
                                    ]),
                                });
                            }
                        })
                        .catch((error) => {
                            obs.next(
                                getLoanContractOfflineFailed({
                                    error: getString([
                                        `errors.${error?.message}`,
                                        'errorMessageCommon',
                                    ]),
                                }),
                            );
                        });
                }),
        ),
    );
