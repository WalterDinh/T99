import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import LoginModel from 'app/models/user/LoginModel';
import UserModel from 'app/models/user/UserModel';
import VerificationIncomeModel from 'app/models/Verification/VerificationIncomeModel';

export interface ICustomerRepository {
    loginUser: (params: any) => Promise<ResponseModel<LoginModel>>;
    refreshToken: () => Promise<ResponseModel<LoginModel>>;
    setUser: (user: UserModel) => Promise<ResponseModel<boolean>>;
    removeUser: () => any;
    getEkycStatus: () => Promise<ResponseModel<ResponseDataModel<any>>>;
    getUser: () => Promise<ResponseModel<UserModel>>;
    removeToken: () => Promise<any>;
    logoutUser: () => Promise<ResponseModel<boolean>>;
    getCustomerToken: () => Promise<ResponseModel<string[]>>;
    getSessionCustomerToken: () => ResponseModel<string[]>;
    getProfile: () => Promise<ResponseModel<UserModel>>;
    setCustomerToken: (
        token: string,
        refreshToken?: string,
        tokenType?: string,
    ) => Promise<ResponseModel<any>>;
    forgotPassword: (params: any) => Promise<ResponseModel<any>>;
    changePassword: (params: any) => Promise<ResponseModel<any>>;
    setCustomerKyc: (params: FormData) => Promise<ResponseModel<any>>;
    postVerificationIncome: (
        body: any,
    ) => Promise<ResponseModel<ResponseDataModel<any>>>;
    getVerificationIncome: () => Promise<
        ResponseModel<ResponseDataModel<VerificationIncomeModel[]>>
    >;
    checkEkycByPhone: (params: {
        phoneNumber: string;
    }) => Promise<ResponseModel<ResponseDataModel<any>>>;
    sendOTP: (params: {
        otpType: number;
        phoneNumber: string;
    }) => Promise<ResponseModel<ResponseDataModel<any>>>;
    postVerificationResidence: (
        body: any,
    ) => Promise<ResponseModel<ResponseDataModel<any>>>;
    setDataLogin: (params: any) => void;
}
