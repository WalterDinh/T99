import AccountBankRepository from 'app/data/repository/accoutbank';
import { GetListAccountBankUseCase } from 'app/domain/customer/accountbank/GetListAccountBankUseCase';
import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import { getString } from 'app/presentation/localization';
import { ParamsGetAccountBenefit } from 'app/presentation/modules/BeneficiaryInformation/BeneficiaryInformation';
import { accountBenefitActionsTypes, getAccountBenefitFailed, getAccountBenefitSuccess } from 'app/presentation/redux/actions/accountBenefits';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { IAction } from 'app/shared/interfaces/common';
import Toast from 'react-native-toast-message';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

export const accountBenefitEpics = (action$: any, state$: any) =>
    action$.pipe(
        ofType(
            accountBenefitActionsTypes.start,
            accountBenefitActionsTypes.loadMore,
            accountBenefitActionsTypes.refresh,
        ),
        exhaustMap(
            (action: IAction<ParamsGetAccountBenefit>) =>
                new Observable((obs) => {
                    LoadingManager.setLoading(true);
                    const actionType = action.type;
                  
                    const useCase = new GetListAccountBankUseCase(new AccountBankRepository())

                    useCase
                        .execute()
                        .then((res) => {
                            if (
                                res?.status === 200 &&
                                res?.data?.success &&
                                res?.data?.data
                            ) {
                                let accountDefault = {};
                                const results = res?.data.data.map(e=> {
                                    if(e.isSetDefault){
                                        accountDefault = ListAccountBankModel.parseFromJson(e)
                                    }
                                    return ListAccountBankModel.parseFromJson(e)
                                }) || [];
                                
                                const reps ={
                                    accountDefault: accountDefault,
                                    listAccount: results,
                                }
                                obs.next(
                                    getAccountBenefitSuccess(reps, {
                                        refresh:
                                            actionType ===
                                            accountBenefitActionsTypes.refresh,
                                    }),
                                );
                                obs.complete();
                            } else {
                                obs.next(
                                    getAccountBenefitFailed({
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
                            LoadingManager.setLoading(false);
                        })
                        .catch((error) => {
                            LoadingManager.setLoading(false);
                            obs.next(
                                getAccountBenefitFailed({
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
