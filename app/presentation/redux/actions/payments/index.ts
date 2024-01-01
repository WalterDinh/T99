import { createActionTypes } from '../helper';

export const changeWalletType = 'CHANGE_WALLET';
export const changeWalletTypes = createActionTypes(changeWalletType);

export const changeWalletSuccess = (payload: 'momo' | 'viettelPay' | 'vnpt' | null) => ({
    type: changeWalletTypes.success,
    payload
});
