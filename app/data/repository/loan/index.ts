import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import axios, { AxiosInstance } from 'axios';
import { ILoanRepository } from 'app/domain/customer/loan';
import { SignType } from 'app/shared/constants';
import LoanItemModel from 'app/models/loan/LoanItem';
import ListAssetGroupModel from 'app/models/loan/ListAssetGroupModel';
import ListAssetPictureModel from 'app/models/loan/ListAssetPictureModel';
export default class LoanRepository implements ILoanRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    getListLoan = async (
        params: SignType,
    ): Promise<ResponseModel<ResponseDataModel<LoanItemModel[]>>> => {
        const resource = AppResource.Loan.LoanList();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: { signType: params },
            resource,
        });
        return apiGateway.execute().then((res: any) => {
            if (res.data && Array.isArray(res.data)) {
                res.data = res.data.map((el: any) =>
                    LoanItemModel.parseFromJson(el),
                );
            }
            return res;
        });
    };
    getListAssetGroup = async (data: {
        groupAssetType: string;
        assetType?: string;
    }): Promise<ResponseModel<ResponseDataModel<ListAssetGroupModel[]>>> => {
        const resource = AppResource.Common.ListAssetGroup();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: data,
            resource,
        });

        return apiGateway.execute();
    };

    getListAssetAsync = async (
        assetGroupId: string,
        search?: string,
    ): Promise<ResponseModel<ResponseDataModel<{[key: string]: {
                    productName: string;
                    id: string;
                    maxLendingMoney: number;
                    minLendingMoney: number;
                }[]}>>> => {
        const resource = AppResource.Common.ListAssetAsync(assetGroupId);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: { search },
            resource,
        });

        return apiGateway.execute();
    };
    getListAssetPicture = async (data: {
        groupAssetType: string;
    }): Promise<ResponseModel<ResponseDataModel<ListAssetPictureModel[]>>> => {
        const resource = AppResource.Common.ListAssetPicture();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: data,
            resource,
        });

        return apiGateway.execute();
    };

    getLoanFee = async (data: {
        ProductId: string;
        PaymentWay: number;
        LoanAmount: number;
        LoanTime: number;
        DayLoan: number;
    }): Promise<ResponseModel<ResponseDataModel<ListAssetPictureModel[]>>> => {
        const resource = AppResource.Common.LoanFee();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: data,
            resource,
        });

        return apiGateway.execute();
    };

    createLoan = async (
        data: FormData,
    ): Promise<ResponseModel<ResponseDataModel<{ applicationCode: string }>>> => {
        const resource = AppResource.Common.Loan();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return apiGateway.execute();
    };
}
