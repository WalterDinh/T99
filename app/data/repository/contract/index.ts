import { getConfig } from 'app/config';
import ApiGateway from 'app/data/gateway/api';
import { AppResource } from 'app/data/gateway/api/resource';

import { IContractRepository } from 'app/domain/customer/contract';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import ContractDetailModel from 'app/models/contract/ContractDetailModel';
import ContractPayingDebtDetailScheduleModel from 'app/models/contract/ContractPayingDebtDetailScheduleModel';
import ContractPayingDebtScheduleModel from 'app/models/contract/ContractPayingDebtScheduleModel';
import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import { ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import ListTransactionModel from 'app/models/ListTransaction/ListTransactionModel';
import axios, { AxiosInstance } from 'axios';
import PaymentContractDetailModel from 'app/models/contract/PaymentContractDetailModel';
import { ParamsGetPaymentContractDetail } from 'app/presentation/modules/Payment/ContractSettlementInformation/ContractSettlementInformation';
export default class ContractRepository implements IContractRepository {
    axiosInstance?: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }
    contractDetail = async (
        contractId: string,
    ): Promise<ResponseModel<ResponseDataModel<ContractDetailModel>>> => {
        const resource = AppResource.Contract.ContractDetail(contractId);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };
    contractPayingDebtSchedule = async (
        contractId: string,
    ): Promise<
        ResponseModel<ResponseDataModel<ContractPayingDebtScheduleModel[]>>
    > => {
        const resource =
            AppResource.Contract.ContractPayingDebtSchedule(contractId);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };

    contractPayingDebtDetailSchedule = async (
        id: string,
    ): Promise<
        ResponseModel<ResponseDataModel<ContractPayingDebtDetailScheduleModel>>
    > => {
        const resource =
            AppResource.Contract.ContractPayingDebtDetailSchedule(id);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };

    getListTransaction = async (
        contractId: string,
    ): Promise<ResponseModel<ResponseDataModel<ListTransactionModel[]>>> => {
        const resource = AppResource.Contract.ListTransaction(contractId);
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            resource,
        });

        return apiGateway.execute();
    };

    getContractBorrowing = async (
        params: ParamsGetContractBorrowing,
    ): Promise<ResponseModel<ResponseDataModel<ContractBorrowingModel[]>>> => {
        const resource = AppResource.Contract.ContractBorrowingList();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: params,
            resource,
        });
        return apiGateway.execute().then((res: any) => {
            if (res.data && Array.isArray(res.data)) {
                res.data = res.data.map((el: any) =>
                    ContractBorrowingModel.parseFromJson(el),
                );
            }
            return res;
        });
    };

    postContractLoanExtension = (data: any) => {
        const resource = AppResource.Contract.ContractLoanExtension();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });
        return apiGateway.execute();
    };

    postContractInterestDuration = (data: any) => {
        const resource = AppResource.Contract.ContractInterestDuration();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });
        return apiGateway.execute();
    };

    postContractChangeRepayment = (data: any) => {
        const resource = AppResource.Contract.ContractChangeRepayment();
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'POST',
            body: data,
            resource,
        });
        return apiGateway.execute();
    };
    getPaymentContractDetail = async (
        params: ParamsGetPaymentContractDetail,
    ): Promise<
        ResponseModel<ResponseDataModel<PaymentContractDetailModel>>
    > => {
        const resource = AppResource.Contract.PaymentContractDetail(
            params.contractId,
        );
        const apiGateway = new ApiGateway({
            configs: getConfig()!,
            axiosInstance: this.axiosInstance ?? axios.create(),
            method: 'GET',
            params: params,
            resource,
        });

        return apiGateway.execute();
    };
}
