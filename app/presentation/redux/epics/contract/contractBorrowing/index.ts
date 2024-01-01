import ContractRepository from 'app/data/repository/contract';

import { GetContractBorrowingUseCase } from 'app/domain/customer/contract/GetContractBorrowingUseCase';
import { getString } from 'app/presentation/localization';
import { ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import {
    contractBorrowingActionsTypes,
    getContractBorrowingFailed,
    getContractBorrowingSuccess,
} from 'app/presentation/redux/actions/contractBorrowing';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { IAction } from 'app/shared/interfaces/common';
import Toast from 'react-native-toast-message';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

export const contractBorrowingEpics = (action$: any, state$: any) =>
    action$.pipe(
        ofType(
            contractBorrowingActionsTypes.start,
            contractBorrowingActionsTypes.loadMore,
            contractBorrowingActionsTypes.refresh,
        ),
        exhaustMap(
            (action: IAction<ParamsGetContractBorrowing>) =>
                new Observable((obs) => {
                    LoadingManager.setLoading(true)
                    const actionType = action.type;
                    const payload: ParamsGetContractBorrowing =
                        action?.payload || {
                            AssetType: '',
                            ContractCode:'',
                            ContractStatusType: '',
                            PageIndex: 1,
                            PageSize: 10,
                            DateFrom: '',
                            DateTo: '',
                            DebtGroup: '',
                        };
                    if (
                        actionType === contractBorrowingActionsTypes.start ||
                        actionType === contractBorrowingActionsTypes.refresh
                    ) {
                        payload.PageIndex = 1;
                    }

                    const useCase = new GetContractBorrowingUseCase(
                        new ContractRepository(),
                        action?.payload,
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
                                    getContractBorrowingSuccess(results, {
                                        canLoadMore:
                                            results.length >= payload.PageSize,
                                        isAppend:
                                            actionType ===
                                            contractBorrowingActionsTypes.loadMore,
                                    }),
                                );
                                obs.complete();
                            } else {
                                obs.next(
                                    getContractBorrowingFailed({
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
                            LoadingManager.setLoading(false)
                        })
                        .catch((error) => {
                            LoadingManager.setLoading(false)
                            obs.next(
                                getContractBorrowingFailed({
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
