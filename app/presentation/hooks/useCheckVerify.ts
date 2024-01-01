import { useSelector } from 'react-redux';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';

export const useCheckVerify: any = () => {
    const verifyUserDataReducer: VerifyUserEkycDataModel = useSelector(
        CustomerSelectors.selectVerifyUserDataReducer,
    ).data;
    const isEkyc = Boolean(verifyUserDataReducer?.isEkyc);

    return { isEkyc: isEkyc };
};
