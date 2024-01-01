import { IResource } from 'app/shared/interfaces/common/resource';
import { ApiType } from '../../type';
import { getApiController } from '../ResourceController';

const ContractDetail = (id: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/contract/detail-contract/${id}`,
});
const ContractPayingDebtSchedule = (contractId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/contract/paying-debt-schedule-by-contract/${contractId}`,
});

const ContractPayingDebtDetailSchedule = (id: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/contract/paying-debt-schedule-detail/${id}`,
});

const ContractBorrowingList = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}contract`,
});
const ListTransaction = (contractId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}contract/transaction/${contractId}`,
});
const ContractLoanExtension = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}contract/loan-extension`,
});
const ContractInterestDuration = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}contract/interest-and-fee-reduction`,
});
const ContractChangeRepayment = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}contract/change-repayment-schedule`,
});
const PaymentContractDetail = (contractId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/contract/payment-contract/${contractId}`,
});
export default {
    ContractDetail,
    ContractPayingDebtSchedule,
    ContractBorrowingList,
    ContractPayingDebtDetailSchedule,
    ListTransaction,
    ContractLoanExtension,
    ContractChangeRepayment,
    ContractInterestDuration,
    PaymentContractDetail,
}
