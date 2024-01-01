import { BranchesModel } from 'app/models/common/BranchesModel';
import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { TransactionOfficeModel } from 'app/models/common/TransactionOfficeModel';
import SearchTransactionOfficeModel from 'app/models/ListTransaction/SearchTransactionOfficeModel';
import TransactionPointModel from 'app/models/ListTransaction/TransactionPointModel';

export interface ICommonRepository {
    getProvinces: () => Promise<ResponseModel<OrganizationModel[]>>;
    uploadAvatar: (files: FormData) => Promise<ResponseModel<any>>;
    getDistricts: (
        provinceId: string,
    ) => Promise<ResponseModel<OrganizationModel[]>>;
    getTransactionPoint: (params: {
        lat: number;
        lng: number;
    }) => Promise<ResponseModel<TransactionPointModel>>;
    getSearchTransactionOffice: ({
        key,
    }: {
        key: string;
    }) => Promise<ResponseModel<SearchTransactionOfficeModel[]>>;
    getWards: (
        districtId: string,
    ) => Promise<ResponseModel<OrganizationModel[]>>;
    getBranch: (
        regionId: string | null,
    ) => Promise<ResponseModel<BranchesModel[]>>;
    getT99Office: (
        branchId: string,
    ) => Promise<ResponseModel<TransactionOfficeModel[]>>;
}
