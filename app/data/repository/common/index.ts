import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';
import { ICommonRepository } from 'app/domain/common';
import { BranchesModel } from 'app/models/common/BranchesModel';
import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { TransactionOfficeModel } from 'app/models/common/TransactionOfficeModel';
import SearchTransactionOfficeModel from 'app/models/ListTransaction/SearchTransactionOfficeModel';
import TransactionPointModel from 'app/models/ListTransaction/TransactionPointModel';
import axios, { AxiosInstance } from 'axios';

export default class CommonRepository implements ICommonRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    getProvinces = (): Promise<ResponseModel<OrganizationModel[]>> => {
        const resource = AppResource.Common.GetProvinces();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };
    getDistricts = (
        provinceId: string,
    ): Promise<ResponseModel<OrganizationModel[]>> => {
        const resource = AppResource.Common.GetDistricts(provinceId);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };
    getWards = (
        districtId: string,
    ): Promise<ResponseModel<OrganizationModel[]>> => {
        const resource = AppResource.Common.GetWards(districtId);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };
    uploadAvatar = (data: any) => {
        const resource = AppResource.Common.UploadAvatar();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'PUT',
            body: data,
            resource,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return apiGateway.execute();
    };
    getBranch = (
        id: string | null,
    ): Promise<ResponseModel<BranchesModel[]>> => {
        const resource = AppResource.Common.GetBranch(id);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };
    getT99Office = (
        id: string,
    ): Promise<ResponseModel<TransactionOfficeModel[]>> => {
        const resource = AppResource.Common.GetT99Office(id);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };
    getTransactionPoint = (data: {
        lat: number;
        lng: number;
    }): Promise<ResponseModel<TransactionPointModel>> => {
        const resource = AppResource.Common.transactionPoint();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: data,
            resource,
        });

        return apiGateway.execute();
    };
    getSearchTransactionOffice = (data:
        {key: string}
    ): Promise<ResponseModel<SearchTransactionOfficeModel[]>> => {
        const resource = AppResource.Common.searchTransactionOffice()
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: data,
            resource,
        });

        return apiGateway.execute();
    };
}
