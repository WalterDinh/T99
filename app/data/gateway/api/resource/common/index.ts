import { ItemContractBorrowingFilter } from 'app/presentation/redux/actions/contractBorrowing/filterBorrowing';
import { IResource } from 'app/shared/interfaces/common/resource';
import { ApiType } from '../../type';
import { getApiController } from '../ResourceController';

const RegisterApp = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/register`,
});

const LoginApp = (): IResource => ({
    Type: ApiType.Connect,
    Path: `${getApiController()}/token`,
});

const RegisterVerificationApp = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/register/verification`,
});
const SendOtpUser = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/user/send-otp`,
});
const CheckOtpUser = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/user/check-otp`,
});
const SetPasswordUser = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/user/set-pass-word`,
});
//app/customer/verification-golfer
const VerificationGolferApp = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}customer/verification-golfer`,
});

const GetProfile = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}customer/detail-aysnc`,
});

const ForgotPassword = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/forgot-password`,
});

const SendOtp = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/send-otp`,
});

const CheckOtp = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/check-otp`,
});
const ChangePassword = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/change-password`,
});

const CustomerKyc = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/customer-kyc`,
});

const GetProvinces = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}organization/provinces`,
});

const GetDistricts = (provinceId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}organization/districts/${provinceId}`,
});

const GetWards = (districtId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}organization/wards/${districtId}`,
});

const GetBranch = (id: string | null): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}organization/branches/${id}`,
});

const GetT99Office = (branchId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}organization/transaction-offices/${branchId}`,
});

const ContractPayingDebtSchedule = (contractId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}/contract/paying-debt-schedule-by-contract/${contractId}`,
});
const ListTransaction = (contractId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}contract/transaction/${contractId}`,
});
const AccountBank = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}account-bank`,
});
const AddAccountBank = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}account-bank`,
});
const EditAccountBank = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}account-bank`,
});
const DeleteAccountBank = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}account-bank`,
});
const BankCategory = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}account-bank/bank-categories`,
});
const VerificationIncomeApp = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}customer/verification-income`,
});
const GetVerificationIncome = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}customer/income`,
});
const PostVerificationResidence = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}customer/verification-residence`,
});
const UploadAvatar = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}user/avatar`,
});

const ListAssetGroup = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}loan/asset-group`,
});
const ListAssetAsync = (assetGroupId: string): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}loan/asset/${assetGroupId}`,
});
const ListAssetPicture = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}data-master`,
});

const LoanFee = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}loan/loan-fee`,
});

const Loan = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}loan`,
});
const transactionPoint = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}transaction-office/transaction-point`,
});
const searchTransactionOffice = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}transaction-office/search-by-key`,
});
const PostRequestDisbursement = (): IResource => ({
    Type: ApiType.Common,
    Path: `${getApiController()}transaction/transaction`,
});

export default {
    LoginApp,
    GetProfile,
    RegisterApp,
    RegisterVerificationApp,
    VerificationGolferApp,
    SendOtpUser,
    CheckOtpUser,
    SetPasswordUser,
    ForgotPassword,
    SendOtp,
    CheckOtp,
    ChangePassword,
    CustomerKyc,
    GetProvinces,
    GetDistricts,
    GetWards,
    ContractPayingDebtSchedule,
    ListTransaction,
    AccountBank,
    AddAccountBank,
    EditAccountBank,
    DeleteAccountBank,
    BankCategory,
    VerificationIncomeApp,
    GetVerificationIncome,
    UploadAvatar,
    ListAssetGroup,
    ListAssetAsync,
    ListAssetPicture,
    LoanFee,
    GetBranch,
    GetT99Office,
    Loan,
    PostVerificationResidence,
    transactionPoint,
    searchTransactionOffice,
    PostRequestDisbursement
};
