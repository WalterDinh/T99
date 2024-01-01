import { IAction } from 'app/shared/interfaces/common';
import { changeWalletTypes } from '../../actions/payments';

interface IContainerData {
    actionType: string;
    data: string;
}
const initialState: IContainerData = {
    actionType: '',
    data: 'momo',
};
export default function (state = initialState, action: IAction<any>) {
    if (action.type === changeWalletTypes.success) {
        return {
            ...state,
            actionType: action.type,
            data: action.payload,
        };
    }

    return state;
}
