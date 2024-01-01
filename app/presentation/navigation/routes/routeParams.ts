import { TransactionType } from './../../../shared/constants/index';
import {
    COMPARERESULTObject,
    INFORESULTObject,
} from 'app/models/ekyc/EkycVnptResultsModel';
import { AssetType, ChoosePayments } from 'app/shared/constants';

export type SocialLogin = 'apple' | 'facebook' | 'google-oauth2';
export type PayloadSignupEmail = {
    name: string;
    email: string;
    password: string;
};
export type PayloadSignupSSO = {
    type: SocialLogin;
};

export type ForgotPasswordStackParamList = {
    ForgotPasswordStep1: undefined;
    ForgotPasswordStep2: {
        phoneNumber: string;
        fullName?: string;
        identityNumber?: string;
    };
    ForgotPasswordStep3: {
        phoneNumber: string;
        fullName?: string;
        identityNumber?: string;
    };
    ForgotPasswordStep4: undefined;
    SetPassword: undefined;
    ForgotPasswordHaveEkyc: { phoneNumber: string };
};

// authentication
export type AuthStackParamList = {
    ForgotPasswordStack: undefined;
    LoginScreen: undefined;
    SignUpScreen: undefined;
    News: undefined;
    ContactSupport: undefined;
    WelcomeScreen: undefined;
    OnboardingScreen: {
        dismissScreeOnly?: boolean;
    };
    MapScreen?: {
        location: {
            lat: number;
            lng: number;
        };
    };
    SearchAutocomplete: any;
    CenterSupport: undefined;
    PrivacyAndPolicy: undefined;
    SignupSuccess: undefined;
    SetPassword: {
        phoneNumber: string;
    };
    VerifyOtp: {
        phoneNumber: string;
    };
    SendOtpSignup: {
        phoneNumber: string;
        fullName: string;
        email: string;
        referralCode: string;
        isAgreeTerms: true;
    };
    WebViewScreen: {
        url: string;
    };
    LearnAppScreen: undefined;
};

// main app

export type AppTabParamList = {
    Home: undefined;
    Contract: undefined;
    LoanAmount: undefined;
    Asset: undefined;
    Setting: undefined;
};

export type EkycParamList = {
    EkycOnboarding: undefined;
    SelectDocumentVerification: undefined;
    VerificationEkycResults: {
        infoResult: INFORESULTObject;
        compareResult: COMPARERESULTObject;
        portraitImage: string;
    };
    EkycSuccess: undefined;
};
export type BeneficiaryParamList = {
    BeneficiaryScreen: {
        isUpdate: boolean;
    };
    AddNewBeneficiary: undefined;
    BeneficiaryAccountScreen: {
        id: string;
        nameBank: string;
        numberAccount: string;
        creatorText: string;
        isSetDefault: boolean;
    };
};
export type T99investParamList = {
    T99Invest: undefined;
    T99InvestStep1: undefined;
    T99InvestStep2: undefined;
    T99InvestStep3: undefined;
    T99InvestStep4: undefined;
    T99InvestStep5: undefined;
    T99InvestStep6: undefined;
    T99doneProduct: {
        id: string;
        title: string;
        titleContent: string | React.ReactElement<Text>;
        dataCard: Array<object>;
    };
};
export type T99pawnParamList = {
    T99Pawn: undefined;
    T99PawnStep1: undefined;
    T99PawnStep2: undefined;
    T99PawnStep3: undefined;
    T99PawnStep4: undefined;
    T99PawnStep5: undefined;
    T99PawnStep6: undefined;
    T99doneProduct: {
        id: string;
        title: string;
        titleContent: string | React.ReactElement<Text>;
        dataCard: Array<object>;
    };
};
export type T99golfParamList = {
    T99GolferStep1: undefined;
    T99GolferStep2: undefined;
    T99GolferStep3: undefined;
    T99GolferStep4: undefined;
    T99GolferStep5: undefined;
    T99doneProduct: {
        id: string;
        title: string;
        titleContent: string | React.ReactElement<Text>;
        dataCard: Array<object>;
    };
};

export type DisburParamList = {
    DisbursementStep1: undefined;
    DisbursementStep2: undefined;
    DisbursementStep3: undefined;
    T99doneProduct: {
        id: string;
        title: string;
        titleContent: string | React.ReactElement<Text>;
        dataCard: Array<object>;
    };
    DisbursementHistory: undefined;
    SignUpIncreaseLimit: undefined;
};

export type AppStackParamList = {
    RequestSuccess: undefined;
    DetailsLoanExtension: undefined;
    RequestChangePayment: undefined;
    RequestFeeWaiver: undefined;
    LoanExtension: undefined;
    RequestDisbursement: undefined;
    BeneficiaryStack: undefined;
    AppTab: undefined;
    AuthStack: undefined;
    AppStack: undefined;
    InformationAccount: undefined;
    InformationVerification: undefined;
    AuthEmailScreen: {
        isSignup?: boolean;
        action?: string;
    };
    EarningInformation: undefined;
    ChangePassword: undefined;
    EkycStack: undefined;
    GolferVerification: undefined;
    DigitalFinance: undefined;
    Notifications: undefined;
    CenterSupport: undefined;
    MapScreen?: {
        location: {
            lat: number;
            lng: number;
        }
    };
    DetailNotifications: {
        id: string;
        title: string;
        titleTime: string;
        titleContent: string;
        typeCategory: string;
        iconType: string;
    };
    DonePassword: {
        id: string;
        title: string;
        titleContent: string | React.ReactElement<Text>;
        titleContent2: string | React.ReactElement<Text>;
    };
    TransactionHistory: undefined;
    PrivacyAndPolicy: undefined;
    SignupSuccess: undefined;
    IncomeInformation: undefined;
    AssetAuthentication: undefined;
    AddIncomeInformation: undefined;
    ConfirmationOfResidence: undefined;
    AddProperty: undefined;
    CalculateProfitStackParamList: undefined;
    ProductCalculateProfitStackParamList: undefined;
    InterestInformation: undefined;
    EstimatedInterestRate: undefined;
    T99investStack: undefined;
    T99pawnStack: undefined;
    T99golferStack: undefined;
    T99doneProduct: undefined;
    DisbursementStack: undefined;
    WebViewScreen: {
        url: string;
    };
    WebViewComponent: undefined;
    ContractPayments: undefined;
    PaySomeoneContract: undefined;
    PaymentMethod: undefined;
    Settlement: { type: ChoosePayments };
    ContractSettlementInformation: undefined;
    SelectMethodPay: undefined;
    OnlinePayment: undefined;
    SuccessPayment: undefined;
    DebtPaymentDue: { type: ChoosePayments };
    DebtPaymentDueDetail: undefined;
    PartialRepayment: undefined;
    PartialRepaymentDetail: undefined;
    InterestFees: { type: ChoosePayments };
    InterestFeeDetail: undefined;
    PayTransfer: undefined;
    InvestmentList: undefined;
    InvestmentDetail: undefined;
    ManageLoanAmount: undefined;
    SignContract: undefined;
    RequestSuccessContract: undefined;
    PayCashStore: undefined;
    SignLoanContract: undefined;
    EkycSuccess: undefined;
    BiometricScreen: undefined;
} & AppTabParamList;

export type CalculateProfitStackParamList = {
    SelectCalculateProfitType: undefined;
    PrivacyAndPolicy: undefined;
    SignupSuccess: undefined;
} & AppTabParamList;

export type AssetStackParamList = {
    Asset: undefined;
} & AppTabParamList;

export type HomeStackParamList = {
    HomeScreen: undefined;
    ProfileScreen: undefined;
    ContractPayments: undefined;
    PaySomeoneContract: undefined;
    PaymentMethod: { TransactionType: TransactionType };
    Settlement: undefined;
    ContractSettlementInformation: {
        contractId: string;
        code: string;
        TransactionType: TransactionType;
    };
    SelectMethodPay: {
        type: ChoosePayments;
        body: {
            contractId: string;
            scheduleId?: string;
            totalPaymentRemainAmount?: number;
        };
    };
    OnlinePayment: undefined;
    SuccessPayment: undefined;
    SearchAutocomplete: any;
    DebtPaymentDue: { TransactionType: TransactionType };
    DebtPaymentDueDetail: {
        contractId: string;
        code: string;
        TransactionType: TransactionType;
    };
    PartialRepayment: { type: ChoosePayments };
    PartialRepaymentDetail: undefined;
    InterestFees: undefined;
    InterestFeeDetail: undefined;
    PayTransfer: undefined;
    PayCashStore: undefined;
} & AppStackParamList;

export type ContractParamList = {
    ContractManagementScreen: undefined;
    BorrowingContract: undefined;
    BorrowingContractDetails: {
        id: string;
        code: string;
        assetType: AssetType;
    };
    InformationQuery: { id: string; code: string; assetType: AssetType };
    Transaction: {
        itemId: string;
        code: string;
        loanAmount: number;
        assetType: AssetType;
    };
    PaymentPlan: { id: string };
    Pdf: { id: string };
    TimePayment: { id: string; title: string };
    HistoryPayment: { id: string };
    SignLoanContract: undefined;
    RequestDisbursement: {
        itemId: string;
        code: string;
        assetType: AssetType;
        loanAmount: number;
    };
    RequestFeeWaiver: {
        itemId: string;
        code: string;
        assetType: AssetType;
        loanAmount: number;
        itemTitleHeader: string;
    };
    RequestSuccess: undefined;
} & AppStackParamList &
    AppTabParamList;

export type InvestmentParamList = {
    InvestmentList: undefined;
    InvestmentDetails: undefined;
    DetailsContract: undefined;
    InformationQuery: undefined;
    Transaction: undefined;
    RequestDisbursement: undefined;
    RequestSuccess: undefined;
    LoanExtension: undefined;
    DetailsLoanExtension: undefined;
    ScreenAccount: undefined;
    RequestFeeWaiver: undefined;
    RequestChangePayment: undefined;
} & AppStackParamList &
    AppTabParamList;

export type LoanAmountParamList = {
    LoanAmount: undefined;
    ManageLoanAmount: undefined;
    SignContract: undefined;
    RequestSuccessContract: undefined;
} & AppStackParamList &
    AppTabParamList;

export type LearnAppParamList = {
    LearnApp: undefined;
} & AppStackParamList &
    AppTabParamList;

export type SettingParamList = {
    Setting: undefined;
} & AppStackParamList &
    AppTabParamList;

export type DrawerParamList = {
    AppTab: undefined;
} & AppStackParamList &
    AppTabParamList;

export type AllRouteParamList = AppStackParamList &
    AuthStackParamList &
    AssetStackParamList &
    LoanAmountParamList &
    ContractParamList &
    SettingParamList;
