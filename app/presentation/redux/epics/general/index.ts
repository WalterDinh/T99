import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    changeLanguageTypes,
    changeLanguageFailed,
    changeLanguageSuccess
} from 'app/presentation/redux/actions/general';
import { changeLanguage } from '../../../localization';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LOCALE } from 'app/shared/constants';

export const changeLanguageEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType(changeLanguageTypes.start),
        switchMap((action: any) => {
            return new Observable((obs) => {
                changeLanguage(action.payload).then(async () => {
                    await AsyncStorage.setItem(LOCALE, action.payload);
                    obs.next(changeLanguageSuccess());
                    obs.complete();
                }).catch(error => {
                    obs.next(changeLanguageFailed({ error }));
                    obs.complete();
                });
            });
        })
    );
