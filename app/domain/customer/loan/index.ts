import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';

import ListAssetGroupModel from 'app/models/loan/ListAssetGroupModel';
import ListAssetPictureModel from 'app/models/loan/ListAssetPictureModel';
import { SignType } from 'app/shared/constants';
import LoanItemModel from 'app/models/loan/LoanItem';

export interface ILoanRepository {
    getListLoan: (
        params: SignType,
    ) => Promise<ResponseModel<ResponseDataModel<LoanItemModel[]>>>;
    getListAssetGroup: (data: {
        groupAssetType: string;
        assetType?: string;
    }) => Promise<ResponseModel<ResponseDataModel<ListAssetGroupModel[]>>>;
    getListAssetAsync: (
        assetGroupId: string,
        search?: string,
    ) => Promise<
        ResponseModel<
            ResponseDataModel<{
                [key: string]: {
                    productName: string;
                    id: string;
                    maxLendingMoney: number;
                    minLendingMoney: number;
                }[];
            }>
        >
    >;
    getListAssetPicture: (data: {
        groupAssetType: string;
    }) => Promise<ResponseModel<ResponseDataModel<ListAssetPictureModel[]>>>;
    getLoanFee: (data: {
        ProductId: string;
        PaymentWay: number;
        LoanAmount: number;
        LoanTime: number;
        DayLoan: number;
    }) => Promise<ResponseModel<ResponseDataModel<ListAssetPictureModel[]>>>;
    createLoan: (
        data: FormData,
    ) => Promise<ResponseModel<ResponseDataModel<{ applicationCode: string }>>>;
}
