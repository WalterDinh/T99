import CloseAccountModel from 'app/models/user/CloseAccount';
import ContainerSelectors from 'app/presentation/redux/selectors/container';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';
import {IReducer} from 'app/shared/interfaces/common';
import {AppMode} from 'app/shared/managers/AppManager';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

const useAppMode = () => {
    const appMode: AppMode = useSelector(ContainerSelectors.selectAppMode);
    const closeAccountReducer: IReducer<CloseAccountModel> = useSelector(CustomerSelectors.selectCloseAccountReducer);

    const modesAreAnonymous = useMemo(() => {
        return appMode === 'anonymous';
    }, [appMode]);

    const modesAreNotVerified = useMemo(() => {
        return appMode === 'notVerified';
    }, [appMode]);

    const modesAreNotVerifiedNotClose = useMemo(() => {
        return appMode === 'notVerified' && Boolean(!closeAccountReducer.data?.memberId);
    }, [closeAccountReducer, appMode]);

    const modesAreLogined = useMemo(() => {
        const listAppMode: AppMode[] = ['notVerified', 'verified', 'loggedIn'];
        return listAppMode.includes(appMode);
    }, [appMode]);

    const modesAreClosed = useMemo(() => {
        return Boolean(closeAccountReducer.data?.memberId);
    }, [closeAccountReducer]);

    return {
        modesAreAnonymous,
        modesAreNotVerified,
        modesAreNotVerifiedNotClose,
        modesAreLogined,
        modesAreClosed,
    };
}

export default useAppMode;