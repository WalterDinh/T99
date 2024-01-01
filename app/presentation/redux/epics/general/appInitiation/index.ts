
import {getProfileFailed, getProfileSuccess} from 'app/presentation/redux/actions/customer/user';
import {initAppActionTypes, initApplicationFailed, initApplicationSuccess} from 'app/presentation/redux/actions/general/appInitiation';
import {ofType} from 'redux-observable';
import {Observable} from 'rxjs';
import {exhaustMap} from 'rxjs/operators';
import CustomerRepository from '../../../../../data/repository/customer';

export const initAppEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType(initAppActionTypes.start),
        exhaustMap((action) => {
            return new Observable((obs) => {
                const initApp = async () => {
                    try {                     
                        const customerRepo = new CustomerRepository();
                        await customerRepo.getCustomerToken();
                        obs.next(initApplicationSuccess());
                        try {
                            // await customerRepo.refreshToken();
                            const profileResp = await customerRepo.getProfile();
                            await customerRepo.setUser(profileResp.data);
                            obs.next(getProfileSuccess(profileResp.data!));
                        } catch(profileError) {
                            obs.next(getProfileFailed({error: profileError, shouldShowMessage: false}));
                        }
                    } catch(error) {
                        obs.next(initApplicationFailed({error, shouldShowMessage: false}));
                    }
                    obs.complete();
                }

                initApp();
            });
        })
    );
