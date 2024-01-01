import GeneralRepository from 'app/data/repository/general';
import {GetGeneralPageUseCase} from 'app/domain/general/GetGeneralPageUseCase';
import {getGeneralPageActionTypes, getGeneralPageFailed, getGeneralPageSuccess} from 'app/presentation/redux/actions/general/generalPage';
import {IAction} from 'app/shared/interfaces/common';
import {ofType} from 'redux-observable';
import {catchError, Observable, of} from 'rxjs';
import {exhaustMap} from 'rxjs/operators';

export const getGeneralPageEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType(getGeneralPageActionTypes.start),
        exhaustMap((action: IAction<any>) => {
            return new Observable((obs) => {
                const slug = action.payload as string;
                const usecase = new GetGeneralPageUseCase(slug, new GeneralRepository());
                usecase.execute().then(response => {
                    obs.next(getGeneralPageSuccess(response.data!, {
                        sectionId: slug
                    }));
                    obs.complete();
                });
            });
        }),
        catchError(error => of(getGeneralPageFailed({error})))
    );
