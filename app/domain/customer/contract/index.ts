import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import ContractPayingDebtDetailScheduleModel from 'app/models/contract/ContractPayingDebtDetailScheduleModel';
import ContractPayingDebtScheduleModel from 'app/models/contract/ContractPayingDebtScheduleModel';
import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import ListTransactionModel from 'app/models/ListTransaction/ListTransactionModel';
import { BodyContractChangeRepayment, BodyContractLoanExtension, ParamsGetContractBorrowing } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import ContractDetailModel from 'app/models/contract/ContractDetailModel';
import PaymentContractDetailModel from 'app/models/contract/PaymentContractDetailModel';
import { ParamsGetPaymentContractDetail } from 'app/presentation/modules/Payment/ContractSettlementInformation/ContractSettlementInformation';

export interface IContractRepository {
    contractDetail: (
        params: any,
    ) => Promise<ResponseModel<ResponseDataModel<ContractDetailModel>>>;
    contractPayingDebtSchedule: (
        params: string,
    ) => Promise<
        ResponseModel<ResponseDataModel<ContractPayingDebtScheduleModel[]>>
    >;
    getListTransaction: (
        params: string,
    ) => Promise<ResponseModel<ResponseDataModel<ListTransactionModel[]>>>;
    contractPayingDebtDetailSchedule: (
        params: string,
    ) => Promise<
        ResponseModel<ResponseDataModel<ContractPayingDebtDetailScheduleModel>>
    >;
    getContractBorrowing: (
        params: ParamsGetContractBorrowing,
    ) => Promise<ResponseModel<ResponseDataModel<ContractBorrowingModel[]>>>;

    postContractLoanExtension: (
        body: any,
    ) => Promise<ResponseModel<ResponseDataModel<ContractBorrowingModel[]>>>;

    postContractInterestDuration: (
        body: any,
    ) => Promise<ResponseModel<ResponseDataModel<ContractBorrowingModel[]>>>;
    postContractChangeRepayment: (
        body: BodyContractChangeRepayment,
    ) => Promise<ResponseModel<ResponseDataModel<ContractBorrowingModel[]>>>;
    getPaymentContractDetail: (
        params: ParamsGetPaymentContractDetail,
    ) => Promise<ResponseModel<ResponseDataModel<PaymentContractDetailModel>>>;

}